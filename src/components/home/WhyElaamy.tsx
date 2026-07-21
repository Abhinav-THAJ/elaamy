"use client";

import { motion } from "framer-motion";
import { Heart, ShieldCheck, Sparkles, Clock } from "lucide-react";

const reasons = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    desc: "Every item in our collection is handpicked for its superior craftsmanship and aesthetic appeal.",
  },
  {
    icon: Heart,
    title: "Thoughtful Curation",
    desc: "We don't just sell products; we curate the best tech and gadgets to simplify your daily life.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    desc: "Shop with confidence with our secure payment gateways and trusted delivery partners.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    desc: "We understand you need your gadgets fast. We ensure your items reach you in record time.",
  },
];

export function WhyElaamy() {
  return (
    <section className="bg-[#FDF3F8] py-20 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-gray-900 mb-4">
            Why Choose Elaamy?
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            We go beyond ordinary retail to provide a luxurious, memorable experience from browsing to unboxing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow border border-pink-50"
              >
                <div className="w-14 h-14 mx-auto bg-pink-50 text-pink-500 flex items-center justify-center rounded-full mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
