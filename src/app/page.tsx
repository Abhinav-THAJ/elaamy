"use client";

import { useEffect, useState } from "react";
import { BestSellers } from "@/components/home/BestSellers";
import { PopularCategories } from "@/components/home/PopularCategories";
import { WhyElaamy } from "@/components/home/WhyElaamy";
import { RecentlyViewed } from "@/components/home/RecentlyViewed";
import { InterestedProducts } from "@/components/home/InterestedProducts";
import { GiftHampers } from "@/components/home/GiftHampers";
import { CategoryCircles } from "@/components/home/CategoryCircles";
import { PartnersSection } from "@/components/home/PartnersSection";
import { StatsSection } from "@/components/home/StatsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { fetchWooClient } from "@/lib/woocommerce-client";

export default function Home() {
  const [wooProducts, setWooProducts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch enough products so we can distribute them without repeating
    fetchWooClient("products", { per_page: "24", status: "publish" })
      .then((data) => {
        if (Array.isArray(data)) setWooProducts(data);
      })
      .catch(() => setWooProducts([]));
  }, []);

  // Split products into non-overlapping chunks
  const bestSellerProducts = wooProducts.slice(0, 8);     // 8 products for best sellers
  const recentlyAddedProducts = wooProducts.slice(8, 16); // 8 recently added
  const popularCatProducts = wooProducts.slice(0, 3);     // 3 for popular categories detailed view
  const interestedProducts = wooProducts.slice(16, 24);   // 8 interested products

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <HeroSection />

      {/* Category Circles — story-style quick browse */}
      <CategoryCircles />

      {/* Best Sellers */}
      <BestSellers products={bestSellerProducts} />

      {/* Recently Added Products */}
      <GiftHampers products={recentlyAddedProducts} />

      {/* Popular Categories with detailed product view */}
      <PopularCategories products={popularCatProducts} />

      {/* Why Elaamy / Features */}
      <WhyElaamy />

      {/* Stats - Total Work & Customers */}
      <StatsSection />

      {/* You might be interested in */}
      <InterestedProducts products={interestedProducts} />

      {/* Our Partners */}
      <PartnersSection />

      {/* Recently Viewed (from localStorage) */}
      <RecentlyViewed products={[]} />
    </div>
  );
}
