"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";

const DUMMY_PRODUCTS = [
  { id: 1, name: "Kont – 2 Ring – Medium – Blue – DW1265", price_html: '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>6.00</bdi></span>', image: "/images/custom-wedding-card.png" },
  { id: 2, name: "Knot – 2 Ring – Majanta Small – DW1239", price_html: '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>5.50</bdi></span>', image: "/images/custom-wedding-card.png" },
  { id: 3, name: "Spot – Golden – Blue – DW1044", price_html: '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>12.00</bdi></span>', image: "/images/custom-wedding-card.png" },
  { id: 4, name: "Acrylic Photo Frame", price_html: '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>45.00</bdi></span>', image: "/images/custom-wedding-card.png" },
  { id: 5, name: "Premium Memento Award", price_html: '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>15.50</bdi></span>', image: "/images/custom-wedding-card.png" },
  { id: 6, name: "Custom Printed Letter Pad", price_html: '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>35.00</bdi></span>', image: "/images/custom-wedding-card.png" },
  { id: 7, name: "Kont - Folder - Medium - Violet", price_html: '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>10.50</bdi></span>', image: "/images/custom-wedding-card.png" },
  { id: 8, name: "Spot - Ruby - Green - DW1077", price_html: '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>12.00</bdi></span>', image: "/images/custom-wedding-card.png" },
];

const categories = ["Photo Frame", "Acrylic Photo Frames", "Letter Pad", "Memento and award", "Sticker", "Wedding Card"];

export function ShopByOccasion({ products = [] }: { products?: any[] }) {
  const displayProducts = products.length > 0 ? products.slice(0, 8).map(p => ({
    id: p.id,
    name: p.name,
    price_html: p.price_html || `<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>${p.price || 0}</bdi></span>`,
    image: p.images?.[0]?.src || "/images/custom-wedding-card.png",
  })) : DUMMY_PRODUCTS;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-gray-900 mb-8">
            Popular Categories
          </h2>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            {categories.map((cat, i) => (
              <button 
                key={cat} 
                className={`pb-2 border-b-2 transition-colors ${i === 0 ? 'border-purple-400 text-gray-900 font-medium' : 'border-transparent hover:text-gray-900 hover:border-gray-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div key={product.id} className="group bg-white p-3 rounded-lg border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300">
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative aspect-square w-full bg-[#F8F9FA] rounded-md overflow-hidden mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3 truncate group-hover:text-pink-500 transition-colors">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div 
                  className="font-semibold text-gray-900"
                  dangerouslySetInnerHTML={{ __html: product.price_html }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
