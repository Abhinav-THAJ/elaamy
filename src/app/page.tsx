"use client";

import { useEffect, useState } from "react";
import { BestSellers } from "@/components/home/BestSellers";
import { PopularCategories } from "@/components/home/PopularCategories";
import { WhyElaamy } from "@/components/home/WhyElaamy";
import { RecentlyViewed } from "@/components/home/RecentlyViewed";
import { InterestedProducts } from "@/components/home/InterestedProducts";
import { GiftHampers } from "@/components/home/GiftHampers";
import { fetchWooClient } from "@/lib/woocommerce-client";

export default function Home() {
  const [wooProducts, setWooProducts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch enough products so we can distribute them without repeating
    // BestSellers needs 4, PopularCategories needs 3, RecentlyViewed needs 5, Interested needs 4, GiftHampers needs 4. Total = 20.
    fetchWooClient("products", { per_page: "20" }) 
      .then((data) => {
        if (Array.isArray(data)) setWooProducts(data);
      })
      .catch(() => setWooProducts([]));
  }, []);

  // Split products into non-overlapping chunks
  const bestSellerProducts = wooProducts.slice(0, 4); // 4 products
  const popularCatProducts = wooProducts.slice(4, 7); // 3 products
  const recentlyViewedProducts = wooProducts.slice(7, 12); // 5 products
  const interestedProducts = wooProducts.slice(12, 16); // 4 products
  const recentlyAddedProducts = wooProducts.slice(16, 20); // 4 products

  return (
    <div className="bg-white min-h-screen">
      {/* 
        The top navigation, sub-categories, and mega menu are handled in the layout Header.
        Following the UI image, the page content starts directly with Best Sellers.
      */}
      <BestSellers products={bestSellerProducts} />
      
      <GiftHampers products={recentlyAddedProducts} />
      
      <PopularCategories products={popularCatProducts} />
      
      <WhyElaamy />
      
      {/* Recently Viewed Carousel (5 cards layout) */}
      <RecentlyViewed products={recentlyViewedProducts} />
      
      {/* Interested Products Carousel (4 cards layout) */}
      <InterestedProducts products={interestedProducts} />
    </div>
  );
}
