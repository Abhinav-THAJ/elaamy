"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const smartAccessories = [
  { id: 1, title: "Wireless Chargers", desc: "Fast and sleek charging pads.", image: "/images/custom-wedding-card.png" },
  { id: 2, title: "Phone Gimbals", desc: "Stabilize your smartphone videos.", image: "/images/custom-wedding-card.png" },
  { id: 3, title: "Smart Tags", desc: "Never lose your belongings again.", image: "/images/custom-wedding-card.png" },
];

export function PhotoGifts() {
  return (
    <section className="bg-white py-20 border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-gray-900 mb-4">
            Smart Accessories
          </h2>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Upgrade your devices with premium accessories. From chargers to gimbals, we have everything you need to enhance your digital life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {smartAccessories.map((gift, i) => (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-[#F8F9FA]">
                <Image
                  src={gift.image}
                  alt={gift.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2 group-hover:text-pink-500 transition-colors">
                {gift.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{gift.desc}</p>
              <Link href="#" className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition-colors">
                Explore Now &rarr;
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
