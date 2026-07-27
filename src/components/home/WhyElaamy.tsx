"use client";

import { Settings, Gift, RotateCcw, Truck } from "lucide-react";

export function WhyElaamy() {
  const features = [
    {
      icon: Settings,
      title: "100% Customization",
      desc: "Customize every detail of your personalized gifts.",
    },
    {
      icon: Gift,
      title: "Personalized Gifting One-Stop Shop",
      desc: "We have a custom printed product for everyone!",
    },
    {
      icon: RotateCcw,
      title: "Free Returns",
      desc: "No-questions-asked return policy for your peace of mind.",
    },
    {
      icon: Truck,
      title: "Fast & Reliable Delivery",
      desc: "Lightning-fast delivery nationwide—get your custom prints shipped at the earliest!",
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
          Why Buy Custom Wedding Cards &amp; Personalized Gifts From Elaamy?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gray-50 rounded-full group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-[12px] text-gray-500 leading-relaxed px-2">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
