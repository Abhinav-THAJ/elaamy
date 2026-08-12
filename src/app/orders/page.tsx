"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle, ShoppingBag } from "lucide-react";

type OrderStatus = "pending" | "processing" | "on-hold" | "completed" | "cancelled" | "refunded";

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; icon: any }> = {
  "pending": { label: "Pending", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", icon: Clock },
  "processing": { label: "Processing", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: Package },
  "on-hold": { label: "On Hold", color: "text-orange-700", bg: "bg-orange-50 border-orange-200", icon: Clock },
  "completed": { label: "Delivered", color: "text-green-700", bg: "bg-green-50 border-green-200", icon: CheckCircle },
  "cancelled": { label: "Cancelled", color: "text-red-700", bg: "bg-red-50 border-red-200", icon: XCircle },
  "refunded": { label: "Refunded", color: "text-gray-700", bg: "bg-gray-50 border-gray-200", icon: XCircle },
};



export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      let currentUser = null;
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try { 
          currentUser = JSON.parse(storedUser);
          setUser(currentUser); 
        } catch {}
      } else {
        // Compatibility with older local storage
        const elaamyUser = localStorage.getItem("elaamy_user");
        if (elaamyUser) {
          try { 
            currentUser = JSON.parse(elaamyUser);
            setUser(currentUser); 
          } catch {}
        }
      }

      let loadedOrders: any[] = [];
      
      // Load orders from localStorage (stored during checkout) as fallback for guest
      const storedOrders = localStorage.getItem("elaamy_orders");
      if (storedOrders) {
        try { loadedOrders = JSON.parse(storedOrders); } catch {}
      }

      // If user is logged in and has an email, fetch their real orders from WooCommerce
      if (currentUser && currentUser.email) {
        try {
          const res = await fetch(`/api/woo?endpoint=orders&search=${encodeURIComponent(currentUser.email)}`);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              // Ensure we only show orders that belong to this email
              const realOrders = data.filter(o => o.billing?.email === currentUser.email);
              if (realOrders.length > 0) {
                loadedOrders = realOrders;
              }
            }
          }
        } catch (e) {
          console.error("Failed to fetch real orders", e);
        }
      }

      setOrders(loadedOrders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-gray-400 animate-pulse">Loading your orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
              {user && <p className="text-sm text-gray-500 mt-1">{user.email}</p>}
            </div>
            <Link href="/collections" className="text-sm font-semibold text-[#e21b22] hover:underline flex items-center gap-1">
              Continue Shopping <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-4xl pt-8">
        {!user && orders.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 text-sm text-amber-800">
            <strong>Note:</strong> You are viewing orders stored on this device. <Link href="/auth/login" className="text-[#e21b22] font-semibold hover:underline ml-1">Login</Link> to sync and view your full order history across devices.
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center shadow-sm border border-gray-100">
            <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-500 mb-6">You haven't placed any orders yet. Start shopping!</p>
            <Link href="/collections" className="inline-block px-8 py-3 bg-[#e21b22] text-white rounded-xl font-semibold hover:bg-red-700 transition-colors">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = (order.status || "pending") as OrderStatus;
              const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
              const StatusIcon = config.icon;
              const date = new Date(order.date_created);
              const isExpanded = expandedOrder === String(order.id);

              return (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Order Header */}
                  <button
                    onClick={() => setExpandedOrder(isExpanded ? null : String(order.id))}
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                        <Package className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-900">Order #{order.id}</span>
                          <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${config.bg} ${config.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {config.label}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                          {" · "}
                          {order.line_items?.length || 0} item{(order.line_items?.length || 0) !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-gray-900">₹{parseFloat(order.total || "0").toFixed(0)}</div>
                        <div className="text-xs text-gray-400">Total</div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </div>
                  </button>

                  {/* Order Items (Expanded) */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 px-5 pb-5">
                      {/* Order Progress */}
                      <div className="py-4 mb-4">
                        <div className="flex items-center justify-between relative">
                          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0" />
                          <div
                            className="absolute top-4 left-0 h-0.5 bg-[#e21b22] -z-0 transition-all"
                            style={{
                              width: status === "completed" ? "100%"
                                : status === "processing" ? "66%"
                                : status === "pending" ? "33%"
                                : "0%"
                            }}
                          />
                          {[
                            { label: "Order Placed", icon: CheckCircle, done: true },
                            { label: "Processing", icon: Package, done: status === "processing" || status === "completed" },
                            { label: "Shipped", icon: Truck, done: status === "completed" },
                            { label: "Delivered", icon: CheckCircle, done: status === "completed" },
                          ].map((step, i) => (
                            <div key={i} className="flex flex-col items-center gap-1 z-10">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white transition-all ${step.done ? "border-[#e21b22] text-[#e21b22]" : "border-gray-200 text-gray-300"}`}>
                                <step.icon className="w-4 h-4" />
                              </div>
                              <span className={`text-[10px] font-semibold whitespace-nowrap ${step.done ? "text-[#e21b22]" : "text-gray-400"}`}>
                                {step.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Line Items */}
                      <div className="space-y-3">
                        {(order.line_items || []).map((item: any) => (
                          <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                            {item.image && (typeof item.image === 'string' || item.image.src) ? (
                              <img src={typeof item.image === 'string' ? item.image : item.image.src} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-gray-100" />
                            ) : (
                              <div className="w-14 h-14 bg-gray-200 rounded-lg flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm text-gray-900 line-clamp-1">{item.name}</div>
                              <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                            </div>
                            <div className="font-bold text-sm text-gray-900 flex-shrink-0">₹{parseFloat(item.total || "0").toFixed(0)}</div>
                          </div>
                        ))}
                      </div>

                      {/* Order Total */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                        <div className="text-sm text-gray-500">
                          Order Total
                        </div>
                        <div className="font-bold text-lg text-gray-900">₹{parseFloat(order.total || "0").toFixed(0)}</div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 mt-4">
                        {status === "completed" && (
                          <button className="flex-1 py-2.5 border border-[#e21b22] text-[#e21b22] rounded-xl text-sm font-semibold hover:bg-red-50 transition-colors">
                            Reorder
                          </button>
                        )}
                        {(status === "pending" || status === "processing") && (
                          <button className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
                            Cancel Order
                          </button>
                        )}
                        <button className="flex-1 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors">
                          Need Help?
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
