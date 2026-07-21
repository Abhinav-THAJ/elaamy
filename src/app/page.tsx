"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/home/Hero";
import { TrustSection } from "@/components/home/TrustSection";
import { ShopByOccasion } from "@/components/home/ShopByOccasion";
import { ShopByRecipient } from "@/components/home/ShopByRecipient";
import { BestSellers } from "@/components/home/BestSellers";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { GiftHampers } from "@/components/home/GiftHampers";
import { CorporateGifts } from "@/components/home/CorporateGifts";
import { WhyElaamy } from "@/components/home/WhyElaamy";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { fetchWooClient } from "@/lib/woocommerce-client";

export default function Home() {
  const [wooProducts, setWooProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchWooClient("products", { per_page: "8" })
      .then((data) => {
        if (Array.isArray(data)) setWooProducts(data);
      })
      .catch(() => setWooProducts([]));
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Hero />
      <ShopByOccasion products={wooProducts} />
      <TrustSection />
      <BestSellers products={wooProducts} />
      <ShopByRecipient />
      <FeaturedCollection />
      <GiftHampers products={wooProducts} />
      <CorporateGifts />
      <WhyElaamy />
      <Features />
      <HowItWorks />
    </div>
  );
}
