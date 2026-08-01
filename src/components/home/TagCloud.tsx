"use client";

import Link from "next/link";

const tags = [
  "Wedding", "Birthday", "Anniversary", "Corporate", "Photo", "Custom", "Gift", "Personalized",
  "Bulk Order", "Premium", "Sticker", "Memento", "Trophy", "Award", "Invitation", "Printing", "Packaging"
];

export function TagCloud() {
  return (
    <section className="py-8 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="mb-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#e21b22] mb-1">Discover</p>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Browse by Popular Tags
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/collections?tag=${encodeURIComponent(tag)}`}
              className="px-4 py-2 bg-gray-50 text-gray-600 rounded-full text-sm font-medium hover:bg-red-50 hover:text-[#e21b22] border border-gray-100 hover:border-red-200 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
