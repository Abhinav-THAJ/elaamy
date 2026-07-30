"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    badge: "Premium Quality",
    title: "Exquisite Wedding Invitations",
    subtitle: "Make Your First Impression Unforgettable",
    desc: "Beautifully crafted, custom printed wedding cards that perfectly capture your unique love story and set the tone for your big day.",
    cta: "Shop Invitations",
    href: "/collections?category=Wedding",
    bg: "from-pink-50 via-rose-50 to-purple-50",
    accent: "#e21b22",
    image: "/images/wedding_cards.png",
  },
  {
    id: 2,
    badge: "Bulk Orders Available",
    title: "Luxury Corporate Gifting",
    subtitle: "Impress Clients & Employees",
    desc: "Elevate your brand with premium custom gift sets, branded mementos, and professional awards designed for maximum impact.",
    cta: "Explore Corporate Sets",
    href: "/collections?category=Corporate",
    bg: "from-purple-50 via-indigo-50 to-blue-50",
    accent: "#6c2bd9",
    image: "/images/corporate_gifts.png",
  },
  {
    id: 3,
    badge: "Custom Engraving",
    title: "Personalized Keepsakes",
    subtitle: "Gifts With A Personal Touch",
    desc: "Turn ordinary moments into lifelong memories with our beautifully crafted, customized gifts and engraved specials.",
    cta: "Shop Personalized",
    href: "/collections?category=Personalized",
    bg: "from-orange-50 via-amber-50 to-yellow-50",
    accent: "#f16334",
    image: "/images/personalized_gifts.png",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${slide.bg} transition-all duration-1000`}>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[420px] py-12 md:py-16">
          {/* Content */}
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5"
              style={{ backgroundColor: `${slide.accent}18`, color: slide.accent }}>
              ✨ {slide.badge}
            </div>
            <p className="text-sm font-medium text-gray-500 mb-2">{slide.subtitle}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-4 leading-tight">
              {slide.title}
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
              {slide.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={slide.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                style={{ backgroundColor: slide.accent }}
              >
                {slide.cta} <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-700 rounded-full font-semibold text-sm border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
              >
                View All Products
              </Link>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2 mt-8">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: idx === current ? "24px" : "8px",
                    backgroundColor: idx === current ? slide.accent : "#d1d5db",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: slide.accent }}>
                  ★
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">4.9/5 Rating</div>
                  <div className="text-[10px] text-gray-500">2,000+ Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
