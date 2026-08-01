"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function RecentlyViewed({ products: _propsProducts = [] }: { products?: any[] }) {
  const [viewedProducts, setViewedProducts] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recently_viewed") || "[]");
      setViewedProducts(stored);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // If no recently viewed products, show an empty state message
  if (!viewedProducts || viewedProducts.length === 0) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Recently viewed products
          </h2>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 text-center text-gray-500 text-sm">
            You haven't viewed any products yet.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Recently viewed products
        </h2>

        <div className="relative group">
          {/* Using a flex container for horizontal scrolling if there are many products, matching the 5-item layout */}
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
            {viewedProducts.map((product, idx) => (
              <div key={product.id} className="min-w-[200px] w-[220px] flex-shrink-0 snap-start bg-white border border-gray-100 rounded shadow-sm hover:shadow-md transition-shadow group/card relative flex flex-col">
                
                {/* Image Section */}
                <Link href={`/product/${product.id}`} className="block relative aspect-square bg-[#f8f9fa] p-4 overflow-hidden rounded-t">
                  {/* Fake tags like the image to match styling */}
                  {idx % 2 === 0 && (
                    <span className="absolute top-0 left-0 bg-purple-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br z-10 flex items-center gap-1">
                      <span className="text-orange-400">⚡</span> 4 Hrs Delivery
                    </span>
                  )}
                  {idx % 3 === 0 && (
                    <span className="absolute top-2 right-2 text-purple-700 text-[10px] font-bold z-10">
                      NEW
                    </span>
                  )}
                  <Image
                    src={product.images?.[0]?.src || "/images/custom-wedding-card.png"}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover/card:scale-105 transition-transform"
                  />
                </Link>

                {/* Content Section */}
                <div className="p-4 flex-1 flex items-center justify-center border-t border-gray-50">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-center text-[12px] font-bold text-gray-700 hover:text-pink-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow (Visible on hover as a slider hint) */}
          {viewedProducts.length >= 5 && (
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
