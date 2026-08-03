"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchWooClient } from "@/lib/woocommerce-client";

const STATIC_CATEGORIES = [
  { name: "Personalized Gifts", slug: "Personalized", image: "/images/personalized_gifts.png" },
  { name: "Wedding Cards",      slug: "Wedding",      image: "/images/wedding_cards.png" },
  { name: "Mementos & Awards",  slug: "Mementos",     image: "/images/mementos_awards.png" },
  { name: "Photo Gifts",        slug: "Photo",        image: "/images/photo_frames.png" },
  { name: "Business Stationery",slug: "Stationery",   image: "/images/business_stationery.png" },
  { name: "Packaging",          slug: "Packaging",    image: "/images/packaging_boxes.png" },
  { name: "Corporate Combos",   slug: "Corporate",    image: "/images/corporate_gifts.png" },
  { name: "Stickers",           slug: "sticker",      image: "/images/stickers_labels.png" },
  { name: "Custom Printing",    slug: "Printing",     image: "/images/custom_printing.png" },
  { name: "Gift Hampers",       slug: "Hampers",      image: "/images/gift_hampers.png" },
  { name: "Trophies & Awards",  slug: "Trophies",     image: "/images/mementos_awards.png" },
  { name: "Calendars",          slug: "Calendar",     image: "/images/calendars.png" },
];

export function CategoryCircles() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchWooClient("products/categories", { per_page: "100", hide_empty: "true" })
      .then((data) => {
        if (!Array.isArray(data)) return;
        const map: Record<string, number> = {};
        data.forEach((cat: any) => {
          map[cat.name.toLowerCase()] = cat.count;
          map[cat.slug.toLowerCase()] = cat.count;
        });
        setCounts(map);
      })
      .catch(() => {});
  }, []);

  const getCount = (cat: typeof STATIC_CATEGORIES[0]) => {
    return (
      counts[cat.name.toLowerCase()] ??
      counts[cat.slug.toLowerCase()] ??
      null
    );
  };

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: dir === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-4 bg-white border-b border-gray-100 sticky top-[69px] md:top-[115px] z-40 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Section Label */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Browse by Category</p>
          <div className="flex gap-1.5">
            <button
              onClick={() => scroll("left")}
              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#e21b22] hover:border-[#e21b22] transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#e21b22] hover:border-[#e21b22] transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Circles Row */}
        <div
          ref={scrollRef}
          className="flex items-start gap-5 sm:gap-7 overflow-x-auto scrollbar-hide pb-2"
        >
          {STATIC_CATEGORIES.map((cat, idx) => {
            const count = getCount(cat);
            return (
              <Link
                key={idx}
                href={`/collections?category=${cat.slug}`}
                className="group flex flex-col items-center gap-2.5 flex-shrink-0 cursor-pointer"
              >
                {/* Circle with gradient border */}
                <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-orange-400 transition-all duration-500 shadow-sm group-hover:shadow-[0_6px_20px_rgba(108,43,217,0.25)] group-hover:-translate-y-1">
                  <div className="w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] rounded-full border-[3px] border-white overflow-hidden relative bg-white">
                    <NextImage
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="76px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                  {/* Item count badge */}
                  {count !== null && count > 0 && (
                    <span className="absolute -bottom-0.5 -right-0.5 bg-[#e21b22] text-white text-[8px] font-bold px-1.5 py-[2px] rounded-full min-w-[18px] text-center leading-tight shadow-sm">
                      {count}
                    </span>
                  )}
                </div>

                {/* Label */}
                <span className="text-[11px] sm:text-[12px] font-semibold text-gray-600 group-hover:text-[#6c2bd9] transition-colors text-center w-[72px] sm:w-[80px] leading-tight line-clamp-2">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
