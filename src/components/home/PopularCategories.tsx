"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";

export function PopularCategories({ products = [] }: { products?: any[] }) {
  const categories = [
    { name: "Wedding Cards", image: "/images/custom-wedding-card.png" },
    { name: "Acrylic Photo Frames", image: "/images/custom_frames.png" },
    { name: "Memento & Awards", image: "/images/custom-wedding-card.png" },
    { name: "Letter Pads & Printings", image: "/images/custom-wedding-card.png" },
  ];

  // Only take up to 3 products to display in the row
  const displayProducts = products.slice(0, 3);

  return (
    <section className="py-10 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Popular Categories
        </h2>

        {/* 4 Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((cat, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative aspect-[4/3] bg-[#F8F9FA] mb-3 overflow-hidden rounded-md">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-center font-bold text-gray-800 text-sm">{cat.name}</h3>
            </div>
          ))}
        </div>

        {/* Dynamic 3 Detailed Products Row from WooCommerce */}
        {displayProducts.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {displayProducts.map((product) => {
              // Extract description text (strip HTML tags if necessary, or just render HTML)
              // WooCommerce descriptions are usually HTML. We can extract plain text or render it safely.
              const rawDesc = product.short_description || product.description || "";
              const plainDesc = rawDesc.replace(/<[^>]+>/g, '').substring(0, 150) + (rawDesc.length > 150 ? '...' : '');

              return (
                <div key={product.id} className="flex gap-5 border border-transparent p-2">
                  {/* Image Side */}
                  <Link href={`/product/${product.id}`} className="w-[120px] sm:w-[140px] flex-shrink-0 relative bg-[#f1f3f9] rounded-lg overflow-hidden border border-gray-100 self-start group cursor-pointer aspect-[3/4]">
                    {product.on_sale && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-10">
                        Sale
                      </span>
                    )}
                    <button 
                      onClick={(e) => e.preventDefault()}
                      className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 hover:shadow-md transition-all z-10"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                    <Image 
                      src={product.images?.[0]?.src || "/images/custom-wedding-card.png"} 
                      alt={product.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform" 
                    />
                  </Link>
                  
                  {/* Content Side */}
                  <div className="flex-1 pt-1">
                    <Link href={`/product/${product.id}`}>
                      <h4 className="text-[13px] font-bold text-gray-900 mb-1 leading-tight hover:text-pink-600 transition-colors line-clamp-2">
                        {product.name}
                      </h4>
                    </Link>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div 
                        className="text-red-600 font-bold text-[15px] [&_del]:text-gray-400 [&_del]:text-xs [&_del]:line-through [&_del]:font-normal flex gap-2 items-center"
                        dangerouslySetInnerHTML={{ __html: product.price_html || `<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>${product.price || 0}</bdi></span>` }}
                      />
                    </div>
                    
                    <p className="text-[11px] text-gray-600 leading-[1.6] line-clamp-4 text-justify" title={plainDesc}>
                      {plainDesc || "A premium quality customized product, meticulously crafted for your special occasions. Enhance your gifting experience with Elaamy."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
