"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ShoppingBag, Heart, SlidersHorizontal, X, ChevronDown, ChevronUp, Star } from "lucide-react";
import { fetchWooClient } from "@/lib/woocommerce-client";
import { useCart } from "@/components/CartContext";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: 0 },
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 – ₹2,500", min: 1000, max: 2500 },
  { label: "₹2,500 – ₹5,000", min: 2500, max: 5000 },
  { label: "Above ₹5,000", min: 5000, max: 0 },
];

const SORT_OPTIONS = [
  { label: "Newest First", value: "date" },
  { label: "Price: Low to High", value: "price" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
  { label: "Most Popular", value: "popularity" },
];

export default function CollectionsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchQuery = searchParams.get("search");
  const tagParam = searchParams.get("tag");

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0); // index into PRICE_RANGES
  const [expandedSections, setExpandedSections] = useState({ price: true, categories: true });
  const { addToCart } = useCart();

  // Filtered and sorted products
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    setLoading(true);

    const fetchCollections = async () => {
      try {
        const categoriesData = await fetchWooClient("products/categories", { per_page: "100" });
        const cats = Array.isArray(categoriesData) ? categoriesData : [];
        setCategories(cats.filter((c: any) => c.name !== "Uncategorized"));

        const params: Record<string, string> = { per_page: "60", status: "publish" };
        
        if (searchQuery) params.search = searchQuery;
        if (tagParam) params.tag = tagParam;

        // Sorting
        if (sortBy === "price") { params.orderby = "price"; params.order = "asc"; }
        else if (sortBy === "price-desc") { params.orderby = "price"; params.order = "desc"; }
        else if (sortBy === "rating") { params.orderby = "rating"; params.order = "desc"; }
        else if (sortBy === "popularity") { params.orderby = "popularity"; params.order = "desc"; }
        else { params.orderby = "date"; params.order = "desc"; }

        if (categoryParam) {
          const matchedCat = cats.find((c: any) =>
            String(c.id) === categoryParam ||
            c.name.toLowerCase().includes(categoryParam.toLowerCase()) ||
            c.slug.toLowerCase().includes(categoryParam.toLowerCase())
          );
          if (matchedCat) {
            params.category = String(matchedCat.id);
          } else if (!searchQuery) {
            params.search = categoryParam;
          }
        }

        const productsData = await fetchWooClient("products", params);
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (error) {
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [categoryParam, searchQuery, tagParam, sortBy]);

  // Client-side price filter
  const priceRange = PRICE_RANGES[selectedPriceRange];
  const filteredProducts = products.filter(p => {
    if (priceRange.min === 0 && priceRange.max === 0) return true;
    const price = parseFloat(p.price || p.regular_price || "0");
    if (priceRange.max === 0) return price >= priceRange.min;
    return price >= priceRange.min && price <= priceRange.max;
  });

  const activeFilters = [];
  if (categoryParam) activeFilters.push({ label: categoryParam, clear: () => router.push(`/collections${searchQuery ? `?search=${searchQuery}` : ''}`) });
  if (searchQuery) activeFilters.push({ label: `"${searchQuery}"`, clear: () => router.push(`/collections`) });
  if (tagParam) activeFilters.push({ label: `#${tagParam}`, clear: () => router.push(`/collections${categoryParam ? `?category=${categoryParam}` : ''}`) });
  if (selectedPriceRange > 0) activeFilters.push({ label: priceRange.label, clear: () => setSelectedPriceRange(0) });

  const Sidebar = () => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-6">
      {/* Categories */}
      <div>
        <button
          className="flex items-center justify-between w-full text-sm font-bold text-gray-900 mb-3 hover:text-[#e21b22] transition-colors"
          onClick={() => setExpandedSections(s => ({ ...s, categories: !s.categories }))}
        >
          <span>Categories</span>
          {expandedSections.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {expandedSections.categories && (
          <ul className="space-y-1">
            <li>
              <Link
                href="/collections"
                className={`flex items-center justify-between py-1.5 px-2 rounded-lg text-sm transition-colors ${!categoryParam ? "text-[#e21b22] bg-red-50 font-semibold" : "text-gray-600 hover:text-[#e21b22] hover:bg-gray-50"}`}
              >
                <span>All Products</span>
              </Link>
            </li>
            {categories.map((cat: any) => (
              <li key={cat.id}>
                <Link
                  href={`/collections?category=${cat.id}`}
                  className={`flex items-center justify-between py-1.5 px-2 rounded-lg text-sm transition-colors ${categoryParam === String(cat.id) ? "text-[#e21b22] bg-red-50 font-semibold" : "text-gray-600 hover:text-[#e21b22] hover:bg-gray-50"}`}
                >
                  <span>{cat.name}</span>
                  {cat.count > 0 && (
                    <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full min-w-[20px] text-center">{cat.count}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-gray-100" />

      {/* Price Filter */}
      <div>
        <button
          className="flex items-center justify-between w-full text-sm font-bold text-gray-900 mb-3 hover:text-[#e21b22] transition-colors"
          onClick={() => setExpandedSections(s => ({ ...s, price: !s.price }))}
        >
          <span>Price Range</span>
          {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {expandedSections.price && (
          <div className="space-y-1">
            {PRICE_RANGES.map((range, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPriceRange(idx)}
                className={`flex items-center gap-2 w-full py-1.5 px-2 rounded-lg text-sm transition-colors text-left ${selectedPriceRange === idx ? "text-[#e21b22] bg-red-50 font-semibold" : "text-gray-600 hover:text-[#e21b22] hover:bg-gray-50"}`}
              >
                <span className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-colors ${selectedPriceRange === idx ? "border-[#e21b22] bg-[#e21b22]" : "border-gray-300"}`} />
                {range.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-100" />

      {/* Popular Tags */}
      <div>
        <p className="text-sm font-bold text-gray-900 mb-3">Browse by Tags</p>
        <div className="flex flex-wrap gap-2">
          {["Wedding", "Birthday", "Corporate", "Photo", "Custom", "Bulk", "Premium", "Gift"].map(tag => (
            <button
              key={tag}
              onClick={() => router.push(`/collections?tag=${tag}`)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${tagParam === tag ? "bg-pink-50 text-pink-600 border-pink-200" : "bg-gray-50 text-gray-500 border-gray-100 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200"}`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {searchQuery
              ? `Search: "${searchQuery}"`
              : tagParam
              ? `Tag: #${tagParam}`
              : categoryParam
              ? categories.find((c: any) => String(c.id) === categoryParam)?.name || categoryParam
              : "All Products"}
          </h1>
          {/* Active Filter Chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {activeFilters.map((f, i) => (
                <span key={i} className="flex items-center gap-1 px-3 py-1 bg-pink-50 text-pink-600 text-xs font-semibold rounded-full border border-pink-200">
                  {f.label}
                  <button onClick={f.clear} className="hover:text-pink-800">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={() => { setSelectedPriceRange(0); router.push('/collections'); }}
                className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl pt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                {/* Mobile Filter Toggle */}
                <button
                  className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#e21b22] transition-colors"
                  onClick={() => setShowMobileFilter(true)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilters.length > 0 && (
                    <span className="bg-[#e21b22] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {activeFilters.length}
                    </span>
                  )}
                </button>
                <span className="text-sm text-gray-500">
                  {loading ? "Loading..." : `${filteredProducts.length} products`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-500 hidden sm:block">Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-pink-100 bg-white"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {[1,2,3,4,5,6,7,8].map((i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 animate-pulse">
                    <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product: any) => {
                  const price = parseFloat(product.price || product.regular_price || "0");
                  const image = product.images?.[0]?.src || "/images/custom-wedding-card.png";
                  const isWishlisted = wishlist.has(String(product.id));
                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-xl border border-gray-100 hover:border-pink-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      <Link href={`/product/${product.id}`} className="block relative aspect-square bg-[#F8F9FA] overflow-hidden">
                        {product.on_sale && (
                          <span className="absolute top-2 left-2 bg-[#e21b22] text-white text-[9px] font-bold px-2 py-0.5 rounded-full z-10">SALE</span>
                        )}
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(String(product.id)); }}
                          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-sm z-10 transition-all ${isWishlisted ? "bg-pink-500 text-white" : "bg-white text-gray-400 hover:text-pink-500 opacity-0 group-hover:opacity-100"}`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-white" : ""}`} />
                        </button>
                        <Image
                          src={image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </Link>
                      <div className="p-3">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-pink-500 transition-colors min-h-[40px]">
                            {product.name}
                          </h3>
                        </Link>
                        {/* Rating */}
                        {parseFloat(product.average_rating) > 0 && (
                          <div className="flex items-center gap-1 mb-2">
                            <div className="flex text-yellow-400">
                              {[1,2,3,4,5].map(s => (
                                <Star key={s} className={`w-3 h-3 ${s <= Math.round(parseFloat(product.average_rating)) ? 'fill-yellow-400' : 'text-gray-200'}`} />
                              ))}
                            </div>
                            <span className="text-[10px] text-gray-400">({product.rating_count || 0})</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-1">
                          <div
                            className="font-bold text-sm text-gray-900 [&_del]:text-gray-400 [&_del]:text-xs [&_del]:line-through [&_del]:font-normal flex gap-1 items-center flex-wrap"
                            dangerouslySetInnerHTML={{ __html: product.price_html || `<span>₹${price.toFixed(0)}</span>` }}
                          />
                          <button
                            onClick={() => addToCart({ id: String(product.id), name: product.name, price, image, quantity: 1 })}
                            className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-[#e21b22] hover:text-white hover:border-[#e21b22] transition-colors bg-gray-50"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
                <div className="text-5xl mb-4">{products.length === 0 ? "⏳" : "🔍"}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {products.length === 0 ? "Coming Soon!" : "No products found"}
                </h3>
                <p className="text-gray-500 mb-6">
                  {products.length === 0 
                    ? "We are currently curating the best items for this category. Check back soon!" 
                    : "Try adjusting your filters or search term."}
                </p>
                {products.length > 0 && (
                  <Link href="/collections" className="inline-block px-6 py-2.5 bg-[#e21b22] text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                    Clear All Filters
                  </Link>
                )}
                {products.length === 0 && (
                  <Link href="/collections" className="inline-block px-6 py-2.5 bg-[#e21b22] text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                    Browse Other Collections
                  </Link>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilter && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setShowMobileFilter(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white">
              <h3 className="font-bold text-gray-900">Filters</h3>
              <button onClick={() => setShowMobileFilter(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <Sidebar />
            </div>
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => setShowMobileFilter(false)}
                className="w-full py-3 bg-[#e21b22] text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
