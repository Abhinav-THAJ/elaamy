"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, User, ChevronDown, Menu, X, Globe, Tag, LogIn, Package, Sparkles, Heart } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import { fetchWooClient } from "@/lib/woocommerce-client";

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [tagSearch, setTagSearch] = useState("");
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const tagRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<{username: string} | null>(null);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  // Fetch categories for nav — live from WooCommerce, no static fallback
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  useEffect(() => {
    fetchWooClient("products/categories", { per_page: "50", hide_empty: "false", orderby: "name", order: "asc" })
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data.filter((c: any) => c.name !== "Uncategorized"));
        }
      })
      .catch(() => {})
      .finally(() => setCategoriesLoading(false));
  }, []);

  // Sync the search query state with the URL when it changes on client-side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get("search");
      if (query) {
        setSearchQuery(query);
      } else {
        setSearchQuery("");
      }
    }
  }, []);

  // Detect scroll for sticky header styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close tag dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tagRef.current && !tagRef.current.contains(e.target as Node)) {
        setShowTagDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/collections`);
    }
    setMobileMenuOpen(false);
    setShowTagDropdown(false);
  };

  const handleTagSearch = (tag: string) => {
    router.push(`/collections?tag=${encodeURIComponent(tag)}`);
    setShowTagDropdown(false);
    setTagSearch("");
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  const popularTags = [
    "Wedding", "Birthday", "Anniversary", "Corporate", "Photo", "Custom", "Gift", "Personalized",
    "Bulk Order", "Premium", "Sticker", "Memento", "Trophy", "Award", "Invitation"
  ];

  const filteredTags = tagSearch
    ? popularTags.filter(t => t.toLowerCase().includes(tagSearch.toLowerCase()))
    : popularTags;

  // Category skeleton loader items
  const SKELETON_COUNT = 6;



  return (
    <header className={`w-full z-50 bg-white sticky top-0 transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}>
      {/* Main Header Area */}
      <div className="py-1.5 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <NextImage 
              src="/logo.png" 
              alt="Elaamy Logo" 
              width={140} 
              height={50} 
              className="object-contain w-20 sm:w-28 h-auto" 
              priority
            />
          </Link>

          {/* Search Bar with Tag Dropdown */}
          <div className="hidden md:flex flex-1 max-w-2xl relative" ref={tagRef}>
            <form onSubmit={handleSearch} className="w-full flex shadow-sm rounded-md overflow-visible border border-gray-200 relative">
              {/* Tag Search Button */}
              <button
                type="button"
                onClick={() => setShowTagDropdown(!showTagDropdown)}
                className="bg-gray-50 border-r border-gray-200 px-3 py-2 flex items-center gap-1.5 text-xs text-gray-500 font-medium hover:bg-gray-100 transition-colors flex-shrink-0 whitespace-nowrap"
              >
                <Tag className="w-3.5 h-3.5 text-[#e21b22]" />
                <span>Tags</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products (e.g. Wedding Cards, Mementos)..."
                className="w-full pl-4 pr-4 py-2 bg-white text-sm focus:outline-none transition-colors"
              />
              <button type="submit" className="bg-[#e21b22] text-white px-6 py-2 font-medium hover:bg-red-700 transition-colors flex-shrink-0">
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Tag dropdown */}
            {showTagDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4">
                <div className="mb-3">
                  <input
                    type="text"
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    placeholder="Filter tags..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-100"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-medium">Popular Tags</p>
                <div className="flex flex-wrap gap-2">
                  {filteredTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagSearch(tag)}
                      className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium hover:bg-pink-50 hover:text-pink-600 border border-gray-100 hover:border-pink-200 transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-5 text-[13px] text-gray-700 font-medium z-50">

            <Link href={user ? "/account" : "/auth/login"} className="flex items-center gap-2 hover:text-[#e21b22] transition-colors relative">
              <User className="w-6 h-6 text-gray-500" />
              <div className="flex flex-col text-left text-xs">
                <span className="text-gray-400">Welcome</span>
                <span className="font-bold text-gray-800">{user ? user.username : 'Login / Signin'}</span>
              </div>
            </Link>

            {/* Customize Card — minimal bordered button */}
            <Link
              href="/customize-card"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D4AF37] text-[#C4A484] text-xs font-semibold hover:bg-[#D4AF37] hover:text-white transition-all whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Customize Card
            </Link>

            <Link href="/wishlist" className="flex items-center gap-2 hover:text-[#e21b22] transition-colors relative">
              <div className="relative">
                <Heart className="w-6 h-6 text-gray-500" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <div className="flex flex-col text-left text-xs">
                <span className="text-gray-400">Your</span>
                <span className="font-bold text-gray-800">Wishlist</span>
              </div>
            </Link>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 cursor-pointer hover:text-[#e21b22] transition-colors relative"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-500" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#e21b22] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col text-left text-xs">
                <span className="text-gray-400">Cart</span>
                <span className="font-bold text-gray-800">₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(0)}</span>
              </div>
            </button>
          </div>

          {/* Mobile: Cart + Menu */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/wishlist" className="relative">
              <Heart className="w-6 h-6 text-gray-700" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button onClick={() => setIsCartOpen(true)} className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e21b22] text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 p-1"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation (Desktop) */}
      <div className="hidden md:block border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <ul className="flex items-center gap-1 text-[13px] font-semibold text-gray-700 overflow-x-auto">
            {/* All Products with Mega Menu */}
            <li
              className="cursor-pointer flex-shrink-0"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <div className="flex items-center gap-1.5 py-2 px-3 hover:text-[#6c2bd9] border-b-2 border-[#6c2bd9] text-[#6c2bd9]">
                <Menu className="w-3.5 h-3.5" />
                All Products
                <ChevronDown className="w-3 h-3" />
              </div>

              {/* Mega Menu */}
              {showMegaMenu && (
                <div className="absolute left-0 top-full w-full bg-white shadow-2xl border-t border-gray-200 z-50 p-8">
                  <div className="container mx-auto max-w-7xl grid grid-cols-4 gap-8 text-left">
                    <div>
                      <h4 className="text-[#6c2bd9] font-bold mb-4 pb-1 border-b border-gray-100 text-sm">Best Sellers</h4>
                      <ul className="space-y-2.5 text-gray-600 text-[13px] flex flex-col">
                        <Link href="/collections?category=Wedding" className="hover:text-[#6c2bd9] transition-colors">Wedding Cards</Link>
                        <Link href="/collections?category=Photo" className="hover:text-[#6c2bd9] transition-colors">Acrylic Photo Frames</Link>
                        <Link href="/collections?category=Mementos" className="hover:text-[#6c2bd9] transition-colors">Premium Mementos</Link>
                        <Link href="/collections?category=Stationery" className="hover:text-[#6c2bd9] transition-colors">Custom Letter Pads</Link>
                        <Link href="/collections?category=Stickers" className="hover:text-[#6c2bd9] transition-colors">Stickers & Labels</Link>
                        <Link href="/collections?category=Corporate" className="hover:text-[#6c2bd9] transition-colors">Corporate Gift Sets</Link>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-bold mb-4 pb-1 border-b border-gray-100 text-sm">Browse by Category</h4>
                      <ul className="space-y-2.5 text-gray-600 text-[13px] flex flex-col">
                        {categories.slice(0, 6).map(cat => (
                          <Link key={cat.id} href={`/collections?category=${cat.id}`} className="hover:text-[#6c2bd9] transition-colors flex items-center justify-between gap-2">
                            <span>{cat.name}</span>
                          </Link>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-bold mb-4 pb-1 border-b border-gray-100 text-sm">Wedding & Photo</h4>
                      <ul className="space-y-2.5 text-gray-600 text-[13px] flex flex-col">
                        <Link href="/collections?category=Wedding" className="hover:text-[#6c2bd9] transition-colors font-medium text-[#6c2bd9]">View All Wedding &gt;</Link>
                        <Link href="/collections?category=Wedding" className="hover:text-[#6c2bd9] transition-colors">Premium Wedding Cards</Link>
                        <Link href="/collections?category=Wedding" className="hover:text-[#6c2bd9] transition-colors">Designer Invitations</Link>
                        <Link href="/collections?category=Wedding" className="hover:text-[#6c2bd9] transition-colors">Ring Bound Cards</Link>
                      </ul>
                      <h4 className="text-gray-800 font-bold mt-5 mb-3 pb-1 border-b border-gray-100 text-sm">Photo Gifts</h4>
                      <ul className="space-y-2.5 text-gray-600 text-[13px] flex flex-col">
                        <Link href="/collections?category=Photo" className="hover:text-[#6c2bd9] transition-colors font-medium text-[#6c2bd9]">View All Photo &gt;</Link>
                        <Link href="/collections?category=Photo" className="hover:text-[#6c2bd9] transition-colors">Acrylic Photo Frames</Link>
                        <Link href="/collections?category=Photo" className="hover:text-[#6c2bd9] transition-colors">Custom Canvas Prints</Link>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-bold mb-4 pb-1 border-b border-gray-100 text-sm">Browse by Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.slice(0, 12).map(tag => (
                          <button
                            key={tag}
                            onClick={() => handleTagSearch(tag)}
                            className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium hover:bg-purple-50 hover:text-[#6c2bd9] border border-gray-100 hover:border-purple-200 transition-colors"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* Dynamic Category Links — live from WooCommerce */}
            {categoriesLoading ? (
              // Skeleton loaders while fetching
              Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <li key={i} className="flex-shrink-0">
                  <div className="h-4 w-20 bg-gray-100 rounded animate-pulse mx-3 my-3" />
                </li>
              ))
            ) : (
              categories.slice(0, 7).map((cat: any) => (
                <li key={cat.id} className="flex-shrink-0">
                  <Link
                    href={`/collections?category=${cat.slug}`}
                    className="flex items-center gap-1.5 py-2 px-3 border-b-2 border-transparent hover:text-[#e21b22] hover:border-[#e21b22] transition-colors whitespace-nowrap"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Sub-categories moved to home page as a dedicated section */}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl z-50 border-t border-gray-100 max-h-[80vh] overflow-y-auto">
          <div className="p-4 border-b border-gray-100">
            <form onSubmit={handleSearch} className="w-full flex shadow-sm rounded-md overflow-hidden border border-gray-200">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-4 pr-4 py-3 bg-gray-50 text-sm focus:outline-none focus:bg-white"
              />
              <button type="submit" className="bg-[#e21b22] text-white px-5 font-medium hover:bg-red-700">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Tag cloud for mobile */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-xs text-gray-400 uppercase font-semibold mb-2">Browse by Tags</p>
            <div className="flex flex-wrap gap-2">
              {popularTags.slice(0, 10).map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagSearch(tag)}
                  className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium hover:bg-pink-50 hover:text-pink-600 border border-gray-100"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          <ul className="flex flex-col py-2">
            {/* Customize Card CTA */}
            <li className="px-4 pt-3 pb-2">
              <Link
                href="/customize-card"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-[#D4AF37] text-[#C4A484] text-sm font-semibold hover:bg-[#D4AF37] hover:text-white transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Customize Your Wedding Card
              </Link>
            </li>
            <li className="px-6 py-2.5 text-xs text-gray-400 uppercase font-semibold tracking-wider">Categories</li>
            <li>
              <Link 
                href="/collections" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-6 py-3 text-sm text-gray-700 font-semibold hover:text-[#e21b22] hover:bg-gray-50 transition-colors"
              >
                <span>All Products</span>
              </Link>
            </li>
            {categoriesLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="px-6 py-3">
                  <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                </li>
              ))
            ) : (
              categories.map((cat: any) => (
                <li key={cat.id}>
                  <Link
                    href={`/collections?category=${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-6 py-3 text-sm text-gray-600 hover:text-[#e21b22] hover:bg-gray-50 transition-colors"
                  >
                    <span>{cat.name}</span>
                    {cat.count > 0 && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{cat.count}</span>}
                  </Link>
                </li>
              ))
            )}
            <li className="px-4 py-3 mt-2 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  href={user ? "/account" : "/auth/login"} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-lg text-gray-600 hover:text-[#e21b22] hover:bg-red-50 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="text-xs font-medium">{user ? user.username : 'Login'}</span>
                </Link>

                <Link 
                  href="/checkout" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-lg text-gray-600 hover:text-[#e21b22] hover:bg-red-50 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-xs font-medium">Checkout</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      )}

      {/* Floating WhatsApp Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <div className="absolute bottom-16 right-0 bg-white p-3 rounded-lg shadow-xl border border-gray-100 w-48 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Need help? <br/><span className="text-[#25D366] font-bold">Chat with us!</span> <br/>Dedicated Customer Care <span className="text-[#f16334]">HERE</span>
        </div>
        <a 
          href="https://wa.me/971501234567" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#20bd5a] hover:scale-105 transition-all cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
          </svg>
        </a>
      </div>

    </header>
  );
}
