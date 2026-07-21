"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    title: "Wide Variety of Custom Printing For Every Event",
    desc: "Discover a comprehensive selection of modern custom designs, from elegant wedding invitations to innovative corporate mementos. Find exactly what you need to make your event special.",
  },
  {
    title: "Premium Personalized Gifts for Every Occasion",
    desc: "Explore high-quality acrylic frames and photo gifts designed to capture your memories perfectly. We provide the most reliable printing quality for your personalized presents.",
  },
  {
    title: "Find The Most Stunning Designs For Everyone",
    desc: "Whether you are shopping for a couple's special day or creating corporate awards for your team, we offer the best custom printing solutions.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-20 pb-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-4xl font-serif text-gray-900 text-center mb-16">
          How Does It Work?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col"
            >
              <h4 className="text-lg font-serif font-bold text-gray-900 mb-4">{step.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">{step.desc}</p>
              <div className="mt-auto">
                <Link href="#" className="inline-block px-6 py-2 border border-gray-200 rounded-md text-sm text-gray-600 font-medium hover:border-gray-900 transition-colors">
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
