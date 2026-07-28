"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

export function BestSellers({ products = [] }: { products?: any[] }) {
  if (!products || products.length === 0) return null;

  const displayProducts = products.slice(0, 4).map(p => ({
    id: p.id,
    name: p.name,
    price_html: p.price_html || `<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>${p.price || 0}</bdi></span>`,
    image: p.images?.[0]?.src || "/images/custom-wedding-card.png",
    sale: p.on_sale,
  }));

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8 tracking-wide uppercase">
          Our Best Sellers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <Link href={`/product/${product.id}`} className="block relative aspect-square bg-[#F8F9FA] rounded-lg overflow-hidden mb-4 border border-gray-100">
                {product.sale && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded z-10">
                    Sale
                  </span>
                )}
                <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 hover:shadow-md transition-all z-10" onClick={(e) => e.preventDefault()}>
                  <Heart className="w-4 h-4" />
                </button>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <Link href={`/product/${product.id}`}>
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-pink-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center justify-between mt-2">
                <div 
                  className="text-red-600 font-bold [&_del]:text-gray-400 [&_del]:text-sm [&_del]:line-through [&_del]:font-normal flex gap-2 items-center"
                  dangerouslySetInnerHTML={{ __html: product.price_html }}
                />
                <button className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
