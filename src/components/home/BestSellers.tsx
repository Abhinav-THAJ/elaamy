"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DUMMY_PRODUCTS = [
  { id: 1, name: "Kont – 2 Ring – Medium – Blue – DW1265", price_html: '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>6.00</bdi></span>', image: "/images/custom-wedding-card.png", rating: 4.8 },
  { id: 2, name: "Knot – 2 Ring – Majanta Small – DW1239", price_html: '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>5.50</bdi></span>', image: "/images/custom-wedding-card.png", rating: 4.9 },
  { id: 3, name: "Spot – Golden – Blue – DW1044", price_html: '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>12.00</bdi></span>', image: "/images/custom-wedding-card.png", rating: 5.0 },
  { id: 4, name: "Acrylic Photo Frame", price_html: '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>45.00</bdi></span>', image: "/images/custom-wedding-card.png", rating: 4.7 },
  { id: 5, name: "Premium Memento Award", price_html: '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>15.50</bdi></span>', image: "/images/custom-wedding-card.png", rating: 4.9 },
];

export function BestSellers({ products = [] }: { products?: any[] }) {
  const displayProducts = products.length > 0 ? products.map(p => ({
    id: p.id,
    name: p.name,
    price_html: p.price_html || `<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>${p.price || 0}</bdi></span>`,
    image: p.images?.[0]?.src || "/images/custom-wedding-card.png",
    rating: parseFloat(p.average_rating || "5.0")
  })) : DUMMY_PRODUCTS;

  return (
    <section className="bg-[#F8F9FA] py-20">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif text-gray-900 mb-4">
              Our Best Selling Products
            </h2>
            <p className="text-gray-500 text-sm max-w-lg">
              Explore our top-selling custom wedding cards, frames, and gifts.
            </p>
          </motion.div>
          <Link href="/shop" className="hidden md:inline-flex px-6 py-2 border border-gray-200 rounded-md text-sm text-gray-600 font-medium hover:border-pink-400 hover:text-pink-500 transition-colors">
            View All
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-12"
          >
            {displayProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="group bg-white p-3 rounded-lg border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-square w-full bg-[#F8F9FA] rounded-md overflow-hidden mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    
                    {/* Hover Actions */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                      <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-pink-500 hover:bg-white transition-colors shadow-sm">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-purple-500 hover:bg-white transition-colors shadow-sm">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 translate-y-16 group-hover:translate-y-0 transition-transform duration-300">
                      <button className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-2 rounded flex items-center justify-center gap-2 hover:shadow-lg transition-all text-sm font-medium">
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  
                  <Link href={`/product/${product.id}`} className="block">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 truncate group-hover:text-pink-500 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <div 
                      className="font-bold text-gray-900"
                      dangerouslySetInnerHTML={{ __html: product.price_html }}
                    />
                    <div className="flex items-center gap-1 text-xs text-yellow-500">
                      <Star className="w-3 h-3 fill-yellow-500" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

// Temporary Star icon since it wasn't imported from lucide
function Star(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
