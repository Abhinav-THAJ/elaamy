"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function FeaturedCollection() {
  return (
    <section className="bg-white py-20 border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FDF3F8] to-[#F3EBFE] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 relative z-10 text-center md:text-left">
            <h3 className="text-pink-400 font-medium uppercase tracking-widest text-xs mb-4">
              Featured Collection
            </h3>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
              The Exclusive <br /> Wedding Series
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
              Discover our most exquisite custom printing and personalized gifts crafted for your special occasions. Featuring premium designs designed to make your events memorable.
            </p>
            <Link 
              href="/collection/artisan"
              className="inline-block px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-md text-sm font-semibold hover:shadow-lg transition-shadow"
            >
              Shop Collection
            </Link>
          </div>
          <div className="w-full md:w-1/2 relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/custom-wedding-card.png"
              alt="Featured Collection"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
