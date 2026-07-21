"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center bg-gradient-to-br from-[#FDF3F8] via-white to-[#F3EBFE] pt-28 md:pt-36 pb-12 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2
                className="text-pink-400 text-4xl sm:text-5xl md:text-6xl mb-3"
                style={{ fontFamily: "var(--font-script), cursive" }}
              >
                Custom Printing
              </h2>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-gray-900 leading-none mb-5 tracking-tight">
                &amp; Personalized <br /> Gifts.
              </h1>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                Discover a wide variety of wedding cards, acrylic photo frames, mementos, and custom printing services with premium quality.
              </p>

              {/* Search Box */}
              <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] max-w-xl mx-auto lg:mx-0">
                <h3 className="text-gray-800 font-semibold mb-3 text-sm sm:text-base">Find your desired products</h3>
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative w-full">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search wedding cards, frames..."
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-lg focus:ring-2 focus:ring-pink-100 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex-shrink-0 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-medium rounded-lg py-3 px-6 hover:shadow-lg hover:shadow-pink-200 transition-all duration-300"
                  >
                    Search
                  </button>
                </form>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Wedding Cards", "Photo Frames", "Mementos", "Bulk Orders"].map((tag) => (
                    <Link
                      key={tag}
                      href={`/collections?search=${encodeURIComponent(tag)}`}
                      className="text-xs text-gray-500 bg-gray-100 hover:bg-pink-100 hover:text-pink-600 px-3 py-1 rounded-full transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg"
            >
              <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-pink-200">
                <Image
                  src="/images/hero_banner.png"
                  alt="Custom Printing & Personalized Gifts"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
