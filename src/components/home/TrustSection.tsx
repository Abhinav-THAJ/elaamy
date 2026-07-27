"use client";

import Image from "next/image";

export function TrustSection() {
  const logos = [
    { name: "Navbharat", src: "https://placehold.co/150x50/eeeeee/333333?text=Navbharat" },
    { name: "Fortis Hospitals", src: "https://placehold.co/150x50/eeeeee/333333?text=Fortis" },
    { name: "SAINT-GOBAIN", src: "https://placehold.co/150x50/eeeeee/333333?text=SAINT-GOBAIN" },
    { name: "Mercedes", src: "https://placehold.co/150x50/eeeeee/333333?text=Mercedes" },
    { name: "COGNIZANT", src: "https://placehold.co/150x50/eeeeee/333333?text=COGNIZANT" },
    { name: "GK TMT", src: "https://placehold.co/150x50/eeeeee/333333?text=GK+TMT" },
    { name: "CHANDIGARH UNIVERSITY", src: "https://placehold.co/150x50/eeeeee/333333?text=Chandigarh+Uni" },
    { name: "SBI", src: "https://placehold.co/150x50/eeeeee/333333?text=SBI" },
    { name: "Credix", src: "https://placehold.co/150x50/eeeeee/333333?text=Credix" },
    { name: "HYATT", src: "https://placehold.co/150x50/eeeeee/333333?text=HYATT" },
    { name: "Godrej", src: "https://placehold.co/150x50/eeeeee/333333?text=Godrej" },
  ];

  return (
    <section className="bg-gradient-to-r from-[#eaf4f4] to-[#f4f7f6] py-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center">
          {logos.map((logo, idx) => (
            <div key={idx} className="relative w-28 h-12 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
              <Image src={logo.src} alt={logo.name} fill className="object-contain" />
            </div>
          ))}
          <div className="text-gray-600 font-bold italic text-sm text-center">
            and many more...
          </div>
        </div>
      </div>
    </section>
  );
}
