"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, LogOut, Package, MapPin, Loader2, Mail, Info } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<{username: string; email?: string} | null>(null);
  const [address, setAddress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let currentUser: {username: string; email?: string} | null = null;
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
      setUser(currentUser);
    } else {
      router.push("/auth/login");
      return;
    }

    const fetchRealData = async () => {
      try {
        let foundAddress = null;
        let foundShipping = null;

        if (currentUser?.email) {
          // 1. Try to get customer profile
          const custRes = await fetch(`/api/woo?endpoint=customers&email=${encodeURIComponent(currentUser.email)}`);
          if (custRes.ok) {
            const custData = await custRes.json();
            if (Array.isArray(custData) && custData.length > 0) {
              const customer = custData[0];
              if (customer.billing && customer.billing.first_name) {
                foundAddress = customer.billing;
              }
              if (customer.shipping && customer.shipping.first_name) {
                foundShipping = customer.shipping;
              }
            }
          }

          // 2. Fallback to latest order if customer profile is empty
          if (!foundAddress) {
            const ordRes = await fetch(`/api/woo?endpoint=orders&search=${encodeURIComponent(currentUser.email)}&per_page=1`);
            if (ordRes.ok) {
              const ordData = await ordRes.json();
              if (Array.isArray(ordData) && ordData.length > 0) {
                if (ordData[0].billing?.first_name) foundAddress = ordData[0].billing;
                if (ordData[0].shipping?.first_name) foundShipping = ordData[0].shipping;
              }
            }
          }
        }

        // 3. Fallback to local storage if totally empty (guest fallback)
        if (!foundAddress) {
          const storedOrders = localStorage.getItem("elaamy_orders");
          if (storedOrders) {
            const orders = JSON.parse(storedOrders);
            if (orders.length > 0 && orders[0].billing) {
              foundAddress = orders[0].billing;
              foundShipping = orders[0].shipping || orders[0].billing;
            }
          }
        }

        if (foundAddress) setAddress(foundAddress);
        // Using billing as shipping fallback just for display if shipping is missing
      } catch (e) {
        console.error("Failed to fetch address", e);
      } finally {
        setLoading(false);
      }
    };

    fetchRealData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("elaamy_user");
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  if (!user) return null; // Will redirect in useEffect

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 pt-8">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border-2 border-[#D4AF37]">
                <User className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{user.username}</h2>
              {user.email && (
                <p className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1">
                  <Mail className="w-3 h-3" /> {user.email}
                </p>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <nav className="flex flex-col">
                <Link href="/account" className="px-6 py-4 border-b border-gray-50 flex items-center gap-3 text-sm font-semibold text-[#e21b22] bg-red-50">
                  <User className="w-4 h-4" /> Personal Details
                </Link>
                <Link href="/orders" className="px-6 py-4 border-b border-gray-50 flex items-center gap-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  <Package className="w-4 h-4" /> My Orders
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-6 py-4 w-full text-left flex items-center gap-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-[#D4AF37]" /> Account Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Username</label>
                  <p className="text-base text-gray-900 font-medium">{user.username}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                  <p className="text-base text-gray-900 font-medium">{user.email || "Not provided"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" /> Default Addresses
                </h3>
                <button className="text-xs font-semibold text-[#D4AF37] hover:underline">Edit</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Billing Address</h4>
                  {address ? (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {address.first_name} {address.last_name}<br />
                      {address.address_1}<br />
                      {address.address_2 && <>{address.address_2}<br /></>}
                      {address.city}, {address.state} {address.postcode}<br />
                      {address.country}<br />
                      {address.phone}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      No billing address provided yet.<br />
                      Complete a checkout to save your address.
                    </p>
                  )}
                </div>
                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Shipping Address</h4>
                  {address ? (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {address.first_name} {address.last_name}<br />
                      {address.address_1}<br />
                      {address.address_2 && <>{address.address_2}<br /></>}
                      {address.city}, {address.state} {address.postcode}<br />
                      {address.country}<br />
                      {address.phone}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      No shipping address provided yet.<br />
                      Complete a checkout to save your address.
                    </p>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
