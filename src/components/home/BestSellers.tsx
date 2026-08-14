"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";

export function BestSellers({ products = [] }: { products?: any[] }) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  if (!products || products.length === 0) return null;

  const displayProducts = products.slice(0, 8).map(p => ({
    id: p.id,
    name: p.name,
    price: parseFloat(p.price || p.regular_price || "0"),
    price_html: p.price_html || `<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>${p.price || 0}</bdi></span>`,
    image: p.images?.[0]?.src || "/images/custom-wedding-card.png",
    sale: p.on_sale,
    rating: parseFloat(p.average_rating || "4.5"),
    sold: p.total_sales || Math.floor(Math.random() * 500 + 50),
  }));

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#e21b22] mb-1">Top Picks</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Our Best Sellers
            </h2>
          </div>
          <Link href="/collections" className="text-sm font-semibold text-gray-500 hover:text-[#e21b22] transition-colors flex items-center gap-1">
            View All <span>›</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer bg-white border border-gray-100 rounded-xl hover:border-pink-200 hover:shadow-lg transition-all duration-300">
              <Link href={`/product/${product.id}`} className="block relative aspect-square bg-[#F8F9FA] rounded-t-xl overflow-hidden">
                {product.sale && (
                  <span className="absolute top-2 left-2 bg-[#e21b22] text-white text-[9px] font-bold px-2 py-0.5 rounded-full z-10">
                    SALE
                  </span>
                )}
                <button
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
                    isInWishlist(product.id.toString()) 
                      ? "bg-pink-500 text-white opacity-100" 
                      : "bg-white text-gray-400 hover:text-pink-500 hover:shadow-md opacity-0 group-hover:opacity-100"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (isInWishlist(product.id.toString())) {
                      removeFromWishlist(product.id.toString());
                    } else {
                      addToWishlist({
                        id: product.id.toString(),
                        name: product.name,
                        price: product.price,
                        image: product.image
                      });
                    }
                  }}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id.toString()) ? "fill-current" : ""}`} />
                </button>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </Link>
              <div className="p-3">
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-[#e21b22] transition-colors min-h-[40px]">
                    {product.name}
                  </h3>
                </Link>
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3 h-3 ${s <= Math.round(product.rating) ? 'fill-yellow-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400">({product.sold})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div
                    className="text-[#e21b22] font-bold text-sm [&_del]:text-gray-400 [&_del]:text-xs [&_del]:line-through [&_del]:font-normal flex gap-1.5 items-center flex-wrap"
                    dangerouslySetInnerHTML={{ __html: product.price_html }}
                  />
                  <button
                    onClick={() => addToCart({
                      id: String(product.id),
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: 1
                    })}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 border border-gray-200 text-gray-500 hover:bg-[#e21b22] hover:text-white hover:border-[#e21b22] transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
