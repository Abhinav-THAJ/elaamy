"use client";

import { useCart } from "@/components/CartContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle, CreditCard, Landmark, Truck, ShieldCheck, Tag } from "lucide-react";

const PAYMENT_METHODS = [
  { id: "razorpay", label: "Pay with Razorpay", desc: "Credit / Debit Card, UPI, Net Banking", icon: CreditCard, available: true },
];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [checkoutError, setCheckoutError] = useState("");

  const discount = couponApplied ? Math.round(cartTotal * 0.1) : 0;
  const finalTotal = cartTotal - discount;
  const shipping = finalTotal >= 500 ? 0 : 50;
  const grandTotal = finalTotal + shipping;

  const handleCoupon = () => {
    if (coupon.toUpperCase() === "ELAAMY10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
      setCouponApplied(false);
    }
  };

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const orderData = {
      payment_method: paymentMethod,
      payment_method_title: PAYMENT_METHODS.find(m => m.id === paymentMethod)?.label || paymentMethod,
      set_paid: true,
      billing: {
        first_name: formData.get("firstName") as string,
        last_name: formData.get("lastName") as string,
        address_1: formData.get("address") as string,
        address_2: formData.get("apartment") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        postcode: formData.get("zip") as string,
        country: "IN",
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
      },
      shipping: {
        first_name: formData.get("firstName") as string,
        last_name: formData.get("lastName") as string,
        address_1: formData.get("address") as string,
        address_2: formData.get("apartment") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        postcode: formData.get("zip") as string,
        country: "IN",
      },
      line_items: cart.map(item => ({
        product_id: parseInt(item.id),
        quantity: item.quantity
      })),
      coupon_lines: couponApplied ? [{ code: coupon }] : [],
    };

    try {
      // 1. Create Razorpay order
      const rzpRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: grandTotal })
      });
      const rzpOrder = await rzpRes.json();

      if (!rzpOrder.id) throw new Error(rzpOrder.error || "Failed to create Razorpay order");

      // 2. Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        name: "Empire",
        description: "Order Payment",
        order_id: rzpOrder.id,
        handler: async function (response: any) {
          try {
            // Payment successful, now create WooCommerce order
            const res = await fetch("/api/woo?endpoint=orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...orderData,
                meta_data: [
                  { key: "razorpay_payment_id", value: response.razorpay_payment_id },
                  { key: "razorpay_order_id", value: response.razorpay_order_id },
                  { key: "razorpay_signature", value: response.razorpay_signature }
                ]
              })
            });

            const data = await res.json();

            if (res.ok && data.id) {
              const savedOrders = JSON.parse(localStorage.getItem("elaamy_orders") || "[]");
              savedOrders.unshift({
                id: String(data.id),
                date_created: new Date().toISOString(),
                status: "processing",
                total: grandTotal.toFixed(2),
                line_items: cart.map(item => ({
                  id: Math.random(),
                  name: item.name,
                  quantity: item.quantity,
                  total: (item.price * item.quantity).toFixed(2),
                  image: item.image
                })),
                billing: orderData.billing,
              });
              localStorage.setItem("elaamy_orders", JSON.stringify(savedOrders.slice(0, 20)));
              setOrderNumber(String(data.id));
              setOrderPlaced(true);
              clearCart();
            } else {
              throw new Error(data.message || "Failed to create order in WooCommerce");
            }
          } catch (err: any) {
            console.error(err);
            setCheckoutError(err.message || "An error occurred creating your order. Please contact support.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: `${orderData.billing.first_name} ${orderData.billing.last_name}`,
          email: orderData.billing.email,
          contact: orderData.billing.phone
        },
        theme: {
          color: "#e21b22"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setCheckoutError(response.error.description || "Payment failed. Please try again.");
        setLoading(false);
      });
      rzp.open();

    } catch (err: any) {
      console.error(err);
      setCheckoutError(err.message || "An error occurred during checkout. Please try again.");
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center py-12 px-4">
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm text-center max-w-md w-full border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-1">
            Thank you for your purchase.
          </p>
          <div className="bg-gray-50 rounded-xl px-4 py-3 my-5 border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Order Number</p>
            <p className="text-lg font-bold text-gray-900">#{orderNumber}</p>
          </div>
          <p className="text-sm text-gray-500 mb-8">
            You will receive a confirmation shortly. Track your order in your account.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/orders" className="flex-1 py-3 border-2 border-gray-900 text-gray-900 rounded-xl font-semibold text-sm hover:bg-gray-900 hover:text-white transition-all text-center">
              Track Order
            </Link>
            <Link href="/" className="flex-1 py-3 bg-[#e21b22] text-white rounded-xl font-semibold text-sm hover:bg-red-700 transition-colors text-center">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8">Add items to your cart before checking out.</p>
          <Link href="/collections" className="inline-block px-8 py-3 bg-[#e21b22] text-white rounded-xl font-semibold hover:bg-red-700 transition-colors">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <nav className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-gray-600">Products</Link>
            <span>/</span>
            <span className="text-gray-600">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="w-full lg:w-3/5">
            <form onSubmit={handleCheckout} className="space-y-6">
              {checkoutError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
                  {checkoutError}
                </div>
              )}
              {/* Contact Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name *</label>
                    <input type="text" name="firstName" required className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-pink-100 focus:border-pink-300 focus:outline-none transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name *</label>
                    <input type="text" name="lastName" required className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-pink-100 focus:border-pink-300 focus:outline-none transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                    <input type="email" name="email" required className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-pink-100 focus:border-pink-300 focus:outline-none transition-all" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                    <input type="tel" name="phone" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-pink-100 focus:border-pink-300 focus:outline-none transition-all" placeholder="+91 98765 43210" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Street Address *</label>
                    <input type="text" name="address" required className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-pink-100 focus:border-pink-300 focus:outline-none transition-all mb-2" placeholder="House number and street name" />
                    <input type="text" name="apartment" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-pink-100 focus:border-pink-300 focus:outline-none transition-all" placeholder="Apartment, suite, unit (optional)" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">City *</label>
                      <input type="text" name="city" required className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-pink-100 focus:border-pink-300 focus:outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">State *</label>
                      <input type="text" name="state" required className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-pink-100 focus:border-pink-300 focus:outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">PIN Code *</label>
                      <input type="text" name="zip" required className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-pink-100 focus:border-pink-300 focus:outline-none transition-all" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Payment Method</h2>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => {
                    const Icon = method.icon;
                    return (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          !method.available ? "opacity-50 cursor-not-allowed" :
                          paymentMethod === method.id ? "border-[#e21b22] bg-red-50" : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={() => method.available && setPaymentMethod(method.id)}
                          disabled={!method.available}
                          className="text-[#e21b22] focus:ring-[#e21b22]"
                        />
                        <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-gray-900">{method.label}</span>
                            {!method.available && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Coming Soon</span>}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{method.desc}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#e21b22] text-white rounded-2xl font-bold text-base hover:bg-red-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Place Order · ₹{grandTotal.toFixed(0)}
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Secured by 256-bit SSL encryption
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24 space-y-5">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.price.toFixed(0)}</p>
                    </div>
                    <div className="font-bold text-sm text-gray-900 flex-shrink-0">₹{(item.price * item.quantity).toFixed(0)}</div>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="border-t border-gray-100 pt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => { setCoupon(e.target.value.toUpperCase()); setCouponError(""); }}
                    placeholder="Enter code (ELAAMY10)"
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-100"
                  />
                  <button
                    type="button"
                    onClick={handleCoupon}
                    className="px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && <p className="text-xs text-green-600 mt-1.5 font-semibold">✓ 10% discount applied!</p>}
                {couponError && <p className="text-xs text-red-500 mt-1.5">{couponError}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal ({cart.reduce((t, i) => t + i.quantity, 0)} items)</span>
                  <span>₹{cartTotal.toFixed(0)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm text-green-600 font-medium">
                    <span>Discount (ELAAMY10)</span>
                    <span>-₹{discount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-green-600 bg-green-50 rounded-lg px-3 py-1.5">
                    🎉 You're eligible for free shipping!
                  </p>
                )}
                <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-100 pt-3">
                  <span>Total</span>
                  <span>₹{grandTotal.toFixed(0)}</span>
                </div>
              </div>

              {/* Trust */}
              <div className="border-t border-gray-100 pt-4 flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Secure Checkout
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-blue-500" />
                  Fast Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
