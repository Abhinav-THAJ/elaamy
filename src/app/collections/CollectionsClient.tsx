"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShoppingBag, Heart } from "lucide-react";
import { fetchWooClient } from "@/lib/woocommerce-client";

export default function CollectionsClient() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = { per_page: "50" };
    if (categoryId) params.category = categoryId;
    if (searchQuery) params.search = searchQuery;

    Promise.all([
      fetchWooClient("products", params),
      fetchWooClient("products/categories", { per_page: "100" }),
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(Array.isArray(productsData) ? productsData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setCategories([]);
        setLoading(false);
      });
  }, [categoryId, searchQuery]);

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-12">
          {searchQuery ? `Search Results for "${searchQuery}"` : "Collections"}
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-32">
              <h3 className="text-lg font-serif font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">Categories</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/collections" className={`block py-1 hover:text-pink-500 transition-colors ${!categoryId ? "text-pink-500 font-semibold" : "text-gray-600"}`}>
                    All Products
                  </Link>
                </li>
                {categories.filter((cat: any) => cat.name !== "Uncategorized").map((cat: any) => (
                  <li key={cat.id}>
                    <Link href={`/collections?category=${cat.id}`} className={`block py-1 hover:text-pink-500 transition-colors flex items-center justify-between ${categoryId === String(cat.id) ? "text-pink-500 font-semibold" : "text-gray-600"}`}>
                      <span>{cat.name}</span>
                      <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{cat.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className="w-full lg:w-3/4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <p className="text-sm text-gray-500">
                {loading ? "Loading..." : searchQuery ? `Showing ${products.length} results for "${searchQuery}"` : `Showing ${products.length} products`}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 animate-pulse">
                    <div className="w-full aspect-square bg-gray-200 rounded-xl mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: any) => {
                  const price = parseFloat(product.price || product.regular_price || "0");
                  const image = product.images?.[0]?.src || "/images/custom-wedding-card.png";
                  return (
                    <div key={product.id} className="group bg-white p-4 rounded-2xl border border-gray-100 hover:border-pink-200 hover:shadow-xl transition-all duration-300">
                      <Link href={`/product/${product.id}`} className="block">
                        <div className="relative aspect-square w-full bg-[#F8F9FA] rounded-xl overflow-hidden mb-4">
                          <Image src={image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-800 mb-2 truncate group-hover:text-pink-500 transition-colors">{product.name}</h3>
                      </Link>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:text-pink-500 hover:border-pink-500 transition-colors bg-white">
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                          <button className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:text-pink-500 hover:border-pink-500 transition-colors bg-white">
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="font-bold text-gray-900 text-lg" dangerouslySetInnerHTML={{ __html: product.price_html || `<span>₹${price.toFixed(2)}</span>` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
                <p className="text-gray-500 text-lg">No products found.</p>
                <Link href="/collections" className="inline-block mt-6 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">Clear Filters</Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
