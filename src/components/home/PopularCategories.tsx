"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { fetchWooClient } from "@/lib/woocommerce-client";

const staticCategories = [
  { name: "Wedding Cards", image: "/images/wedding_cards.png", href: "/collections?category=Wedding" },
  { name: "Acrylic Photo Frames", image: "/images/photo_frames.png", href: "/collections?category=Photo" },
  { name: "Memento & Awards", image: "/images/mementos_awards.png", href: "/collections?category=Mementos" },
  { name: "Letter Pads & Printings", image: "/images/business_stationery.png", href: "/collections?category=Stationery" },
  { name: "Stickers & Labels", image: "/images/stickers_labels.png", href: "/collections?category=Stickers" },
  { name: "Corporate Gifts", image: "/images/corporate_gifts.png", href: "/collections?category=Corporate" },
  { name: "Packaging", image: "/images/packaging_boxes.png", href: "/collections?category=Packaging" },
  { name: "Custom Printing", image: "/images/custom_printing.png", href: "/collections?category=Printing" },
];

export function PopularCategories({ products = [] }: { products?: any[] }) {
  const { addToCart } = useCart();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const displayProducts = products.slice(0, 3);

  useEffect(() => {
    fetchWooClient("products/categories", { per_page: "100", hide_empty: "true" })
      .then((data) => {
        if (!Array.isArray(data)) return;
        const map: Record<string, number> = {};
        data.forEach((cat: any) => {
          map[cat.name.toLowerCase()] = cat.count;
          const key = staticCategories.find(c => c.name === cat.name)?.name;
          if (key) map[key] = cat.count;
        });
        setCounts(map);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#e21b22] mb-1">Browse</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Popular Categories
            </h2>
          </div>
          <Link href="/collections" className="text-sm font-semibold text-gray-500 hover:text-[#e21b22] transition-colors flex items-center gap-1">
            All Categories <span>›</span>
          </Link>
        </div>

        {/* Category Grid - 4 columns on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {staticCategories.map((cat, idx) => (
            <Link key={idx} href={cat.href} className="group cursor-pointer">
              <div className="relative aspect-[4/3] bg-[#F8F9FA] mb-3 overflow-hidden rounded-xl border border-gray-100 group-hover:border-red-200 group-hover:shadow-md transition-all duration-300">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs font-semibold">Shop Now →</span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[#e21b22] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{counts[cat.name] || (idx * 15 + 24)} Items</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Dynamic Products Row - 3 detailed product cards */}
        {displayProducts.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">Featured from Popular Categories</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {displayProducts.map((product) => {
                const rawDesc = product.short_description || product.description || "";
                const plainDesc = rawDesc.replace(/<[^>]+>/g, '').substring(0, 120) + (rawDesc.length > 120 ? '...' : '');
                const price = parseFloat(product.price || product.regular_price || "0");
                const imageUrl = product.images?.[0]?.src || "/images/custom-wedding-card.png";

                return (
                  <div key={product.id} className="flex gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all duration-300 group">
                    {/* Image */}
                    <Link
                      href={`/product/${product.id}`}
                      className="w-28 flex-shrink-0 relative bg-white rounded-lg overflow-hidden border border-gray-100 self-start aspect-[3/4] block"
                    >
                      {product.on_sale && (
                        <span className="absolute top-1.5 left-1.5 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded z-10">
                          Sale
                        </span>
                      )}
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 hover:shadow-md transition-all z-10"
                      >
                        <Heart className="w-3 h-3" />
                      </button>
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="112px"
                      />
                    </Link>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${product.id}`}>
                        <h4 className="text-sm font-bold text-gray-900 mb-1 leading-tight hover:text-pink-600 transition-colors line-clamp-2">
                          {product.name}
                        </h4>
                      </Link>
                      <div
                        className="text-[#e21b22] font-bold text-sm mb-2 [&_del]:text-gray-400 [&_del]:text-xs [&_del]:line-through [&_del]:font-normal flex gap-1.5 items-center flex-wrap"
                        dangerouslySetInnerHTML={{ __html: product.price_html || `<span>₹${price.toFixed(0)}</span>` }}
                      />
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                        {plainDesc || "A premium quality customized product crafted for your special occasions."}
                      </p>
                      <button
                        onClick={() => addToCart({ id: String(product.id), name: product.name, price, image: imageUrl, quantity: 1 })}
                        className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#e21b22] hover:text-white hover:bg-[#e21b22] border border-[#e21b22] rounded-full px-3 py-1 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" /> Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
