"use client";

import { useWishlist } from "@/components/WishlistContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/components/CartContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/auth/login?redirect=wishlist");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Loading your wishlist...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-[#e21b22] fill-[#e21b22]" />
          <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Save items you love here and purchase them later when you're ready!
            </p>
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#e21b22] text-white font-medium rounded-full hover:bg-red-700 transition-all"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col group relative">
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors z-10 shadow-sm opacity-0 group-hover:opacity-100"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <Link href={`/product/${item.id}`} className="block relative aspect-square bg-[#F8F9FA] rounded-lg overflow-hidden mb-4">
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>
                
                <Link href={`/product/${item.id}`} className="block flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-[#e21b22] transition-colors">{item.name}</h3>
                  <div className="text-[#e21b22] font-bold">₹{item.price}</div>
                </Link>
                
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({ ...item, quantity: 1, type: "simple" });
                  }}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-[#e21b22] hover:text-white transition-colors text-sm font-medium border border-gray-100 group-hover:border-transparent"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
