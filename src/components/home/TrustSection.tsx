"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { id: 1, name: "Packaged Sold", value: "30,000+" },
  { id: 2, name: "Happy Clients", value: "15,000+" },
  { id: 3, name: "Years Serving", value: "12+" },
];

export function TrustSection() {
  return (
    <section className="bg-white py-16 relative overflow-hidden">
      {/* Decorative branches (left and right) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 opacity-50 pointer-events-none hidden lg:block">
        <Image src="/images/floral_decor.png" alt="decoration" fill className="object-cover rounded-full" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 opacity-50 pointer-events-none hidden lg:block">
        <Image src="/images/floral_decor.png" alt="decoration" fill className="object-cover rounded-full" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center p-8 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-3xl font-serif text-blue-800 font-semibold mb-2">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {stat.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
