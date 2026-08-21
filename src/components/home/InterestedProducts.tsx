"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useCart } from "@/components/CartContext";

export function InterestedProducts({ products = [] }: { products?: any[] }) {
  const { addToCart } = useCart();

  const scrollRef = useRef<HTMLDivElement>(null);

  if (!products || products.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: dir === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#e21b22] mb-1">Curated For You</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              You Might Be Interested In
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-[#e21b22] hover:border-[#e21b22] transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-[#e21b22] hover:border-[#e21b22] transition-colors shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        >
          {products.map((product, idx) => {
            const price = parseFloat(product.price || product.regular_price || "0");
            const imageUrl = product.images?.[0]?.src || "/images/custom-wedding-card.png";
            return (
              <div
                key={product.id}
                className="min-w-[200px] sm:min-w-[220px] w-[220px] flex-shrink-0 bg-white border border-gray-100 rounded-xl hover:border-pink-200 hover:shadow-lg transition-all duration-300 group overflow-hidden"
              >
                {/* Image */}
                <Link href={`/product/${product.id}`} className="block relative aspect-square bg-[#F8F9FA] overflow-hidden">
                  {product.on_sale && (
                    <span className="absolute top-2 left-2 bg-[#e21b22] text-white text-[9px] font-bold px-2 py-0.5 rounded-full z-10">SALE</span>
                  )}
                  {idx % 3 === 0 && (
                    <span className="absolute top-2 right-2 bg-purple-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10">NEW</span>
                  )}

                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="220px"
                  />
                </Link>

                {/* Content */}
                <div className="p-3">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[#e21b22] transition-colors line-clamp-2 mb-1 min-h-[40px]">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <div
                      className="text-[#e21b22] font-bold text-sm [&_del]:text-gray-400 [&_del]:text-xs [&_del]:line-through [&_del]:font-normal flex gap-1 items-center"
                      dangerouslySetInnerHTML={{ __html: product.price_html || `<span>₹${price.toFixed(0)}</span>` }}
                    />
                    <button
                      onClick={() => addToCart({ id: String(product.id), name: product.name, price, image: imageUrl, quantity: 1 })}
                      className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-50 border border-gray-200 text-gray-500 hover:bg-[#e21b22] hover:text-white hover:border-[#e21b22] transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
