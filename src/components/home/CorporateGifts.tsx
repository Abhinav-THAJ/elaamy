"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Briefcase } from "lucide-react";

export function CorporateGifts() {
  return (
    <section className="bg-white py-14 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group"
          >
            <Image
              src="/images/corporate_gifts.png"
              alt="Bulk Printing"
              fill
              className="object-cover w-full h-full"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <Briefcase className="w-3 h-3" />
              <span>Bulk Orders</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 mb-4 sm:mb-6 leading-tight">
              Bulk Printing &amp; <br /> Custom Orders
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
              Equip your events and impress guests with our curated custom printing. We offer bulk discounts, personalized designs, and dedicated support for events of all sizes.
            </p>
            
            <Link 
              href="/corporate" 
              className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Request Bulk Pricing
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
