"use client";

import { useCart } from "@/components/CartContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate placing an order
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-sm text-center max-w-md w-full mx-4">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <h1 className="text-3xl font-serif text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-500 mb-8">
            Thank you for your purchase. We have received your order and will begin processing it shortly.
          </p>
          <Link 
            href="/"
            className="inline-block w-full py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link 
            href="/collections"
            className="inline-block px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <h1 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Checkout Form */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleCheckout} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Billing & Shipping Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-100 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-100 focus:outline-none" />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-100 focus:outline-none" />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-100 focus:outline-none mb-2" placeholder="House number and street name" />
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-100 focus:outline-none" placeholder="Apartment, suite, unit, etc. (optional)" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-100 focus:outline-none" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-100 focus:outline-none" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-100 focus:outline-none" />
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-t border-gray-100 pt-8">Payment Method</h2>
              <div className="space-y-3 mb-8">
                <label className="flex items-center gap-3 p-4 border border-pink-200 bg-pink-50 rounded-lg cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="text-pink-500 focus:ring-pink-500" />
                  <span className="font-medium text-gray-900">Cash on Delivery (COD)</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg opacity-50 cursor-not-allowed">
                  <input type="radio" name="payment" disabled className="text-pink-500 focus:ring-pink-500" />
                  <span className="font-medium text-gray-900">Credit Card (Coming Soon)</span>
                </label>
              </div>
              
              <button 
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all"
              >
                Place Order (₹{cartTotal.toFixed(2)})
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 sticky top-32">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <div className="font-bold text-gray-900 text-sm mt-1">₹{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-100 pt-3 mt-3">
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
