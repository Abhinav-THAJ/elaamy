"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function GiftHampers({ products = [] }: { products?: any[] }) {
  if (!products || products.length === 0) return null;

  const displayHampers = products.slice(0, 4).map(p => ({
    id: p.id,
    name: p.name,
    price_html: p.price_html || `<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>${p.price || 0}</bdi></span>`,
    image: p.images?.[0]?.src || "/images/custom-wedding-card.png",
  }));

  return (
    <section className="bg-[#F8F9FA] py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12">
          <div className="max-w-lg">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">
              Recently added Products
            </h2>
            <p className="text-gray-500 text-sm">
              Check out our newest arrivals in custom printing and personalized gifts.
            </p>
          </div>
          <Link href="/hampers" className="hidden md:inline-flex px-6 py-2 border border-gray-200 rounded-md text-sm text-gray-600 font-medium hover:border-pink-400 hover:text-pink-500 transition-colors bg-white mt-6 md:mt-0">
            View All Bundles
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayHampers.map((hamper, i) => (
            <motion.div
              key={hamper.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white rounded-xl p-4 border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-[#F8F9FA]">
                <Image
                  src={hamper.image}
                  alt={hamper.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm mb-2 group-hover:text-pink-500 transition-colors">
                {hamper.name}
              </h3>
              <div 
                className="text-gray-900 font-bold"
                dangerouslySetInnerHTML={{ __html: hamper.price_html }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
