"use client";

import { Truck, Award, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Enjoy our out-of-the-world shipping on everything that ships within 24 hours.",
  },
  {
    icon: Award,
    title: "100% Money Back Guarantee",
    description: "Don't like product? Don't worry about that you will have money back.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "We are here for you whenever you feel needed.",
  },
];

export function Features() {
  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className="flex flex-col items-center md:items-start pt-8 md:pt-0 md:px-8 first:pt-0 first:px-0 last:px-0">
                <div className="mb-4 text-gray-700">
                  <Icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h4 className="text-lg font-serif text-gray-900 font-semibold mb-2">{feat.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
