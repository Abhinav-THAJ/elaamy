"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function InterestedProducts({ products = [] }: { products?: any[] }) {
  if (!products || products.length === 0) return null;

  // You might be interested in shows larger cards, roughly 4 per row
  return (
    <section className="py-6 bg-white pb-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          You might be interested in
        </h2>

        <div className="relative group">
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
            {products.map((product, idx) => (
              <div key={product.id} className="min-w-[250px] w-[280px] flex-shrink-0 snap-start bg-white border border-gray-100 rounded shadow-sm hover:shadow-md transition-shadow group/card relative flex flex-col">
                
                {/* Image Section */}
                <Link href={`/product/${product.id}`} className="block relative aspect-[4/3] bg-[#f8f9fa] overflow-hidden rounded-t">
                  {/* Fake tags matching the design */}
                  {idx % 2 === 0 && (
                    <span className="absolute top-0 left-0 bg-purple-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br z-10 flex items-center gap-1">
                      <span className="text-orange-400">⚡</span> 4 Hrs Delivery
                    </span>
                  )}
                  {idx % 3 === 0 && (
                    <span className="absolute top-0 right-0 bg-purple-700 text-white text-[10px] px-2 py-0.5 rounded-bl z-10 font-bold">
                      NEW
                    </span>
                  )}
                  <Image
                    src={product.images?.[0]?.src || "/images/custom-wedding-card.png"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover/card:scale-105 transition-transform"
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
          
          {products.length >= 4 && (
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
