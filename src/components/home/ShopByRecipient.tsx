"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ShopByRecipient() {
  return (
    <section className="bg-white py-12 relative overflow-hidden">
      {/* Decorative floral elements */}
      <div className="absolute left-0 bottom-0 w-32 h-32 opacity-40 hidden md:block">
        <Image src="/images/floral_decor.png" alt="floral" fill className="object-cover rounded-tl-full" />
      </div>
      <div className="absolute right-0 top-0 w-32 h-32 opacity-40 hidden md:block">
        <Image src="/images/floral_decor.png" alt="floral" fill className="object-cover rounded-tr-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative z-10 max-w-6xl mx-auto">
          {/* For Him Banner */}
          <Link href="/category/for-him">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#99201C] to-[#E2564C] flex h-44 sm:h-56 group shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="p-5 sm:p-8 flex flex-col justify-center text-white z-10 w-2/3">
                <h3 className="text-xl sm:text-3xl font-serif font-bold mb-1 sm:mb-2">Wedding Collections</h3>
                <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-6">Beautiful designs for your special day</p>
                <div>
                  <p className="text-xs text-white/70">From</p>
                  <p className="text-base sm:text-xl font-bold">₹10.50</p>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 h-full w-1/2">
                <Image 
                  src="/images/custom-wedding-card.png"
                  alt="Wedding Collections"
                  fill
                  className="object-cover object-left mask-image-linear-left group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </Link>

          {/* For Her Banner */}
          <Link href="/category/for-her">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#F7A026] to-[#FCD457] flex h-44 sm:h-56 group shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="p-5 sm:p-8 flex flex-col justify-center text-[#4A2D00] z-10 w-2/3">
                <h3 className="text-xl sm:text-3xl font-serif font-bold mb-1 sm:mb-2">Custom Frames</h3>
                <p className="text-[#4A2D00]/80 text-xs sm:text-sm mb-3 sm:mb-6">Preserve your memories in style</p>
                <div>
                  <p className="text-xs text-[#4A2D00]/70">From</p>
                  <p className="text-base sm:text-xl font-bold">₹25.00</p>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 h-full w-1/2">
                <Image 
                  src="/images/custom_frames.png"
                  alt="Custom Frames"
                  fill
                  className="object-cover object-left mask-image-linear-left group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
