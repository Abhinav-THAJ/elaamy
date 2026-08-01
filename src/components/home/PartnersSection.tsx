"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const partners = [
  { name: "Navbharat Times", logo: "https://placehold.co/160x60/f5f5f5/555555?text=Navbharat+Times" },
  { name: "Fortis Hospitals", logo: "https://placehold.co/160x60/f5f5f5/555555?text=Fortis+Hospitals" },
  { name: "Saint-Gobain", logo: "https://placehold.co/160x60/f5f5f5/555555?text=SAINT-GOBAIN" },
  { name: "Mercedes-Benz", logo: "https://placehold.co/160x60/f5f5f5/555555?text=Mercedes-Benz" },
  { name: "Cognizant", logo: "https://placehold.co/160x60/f5f5f5/555555?text=COGNIZANT" },
  { name: "GK TMT", logo: "https://placehold.co/160x60/f5f5f5/555555?text=GK+TMT" },
  { name: "Chandigarh University", logo: "https://placehold.co/160x60/f5f5f5/555555?text=Chandigarh+Uni" },
  { name: "SBI Bank", logo: "https://placehold.co/160x60/f5f5f5/555555?text=SBI+Bank" },
  { name: "Credix", logo: "https://placehold.co/160x60/f5f5f5/555555?text=Credix" },
  { name: "Hyatt Hotels", logo: "https://placehold.co/160x60/f5f5f5/555555?text=HYATT" },
  { name: "Godrej", logo: "https://placehold.co/160x60/f5f5f5/555555?text=Godrej" },
  { name: "Tata Motors", logo: "https://placehold.co/160x60/f5f5f5/555555?text=Tata+Motors" },
];

export function PartnersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: dir === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-14 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Trusted By</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Our Partners & Clients
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Proudly serving top companies and organizations across India & UAE
          </p>
        </div>

        {/* Partner Logo Scroll */}
        <div className="relative group">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-[#e21b22] hover:border-[#e21b22] transition-colors z-10 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={scrollRef}
            className="flex items-center gap-8 overflow-x-auto scrollbar-hide pb-2"
          >
            {partners.map((partner, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 flex items-center justify-center w-36 h-16 bg-white rounded-xl border border-gray-100 hover:border-pink-300 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-[120px] max-h-[44px] object-contain"
                />
              </div>
            ))}
            <div className="flex-shrink-0 flex items-center justify-center w-36 h-16 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100 hover:shadow-md transition-all cursor-pointer">
              <p className="text-xs font-semibold text-gray-500 text-center px-2">& many more...</p>
            </div>
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-[#e21b22] hover:border-[#e21b22] transition-colors z-10 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
