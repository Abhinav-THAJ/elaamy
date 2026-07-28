"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, User, ChevronDown, Menu, X, Phone, Globe, Gift, Camera, BookOpen, Trophy, Mail, Briefcase, Package, Stamp } from "lucide-react";
import { useCart } from "@/components/CartContext";

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const [showMegaMenu, setShowMegaMenu] = useState(false);

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

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/collections`);
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  const topCategories = [
    "All Products", "Wedding Cards", "Photo Frames", "Mementos", "Letter Pads", "Corporate Gifts", "Custom Printing", "Stickers"
  ];

  const subCategories = [
    { name: "Personalized Gifts", image: "https://loremflickr.com/200/200/giftbox" },
    { name: "Wedding Cards", image: "https://loremflickr.com/200/200/wedding,card" },
    { name: "Mementos & Awards", image: "https://loremflickr.com/200/200/trophy" },
    { name: "Photo Gifts", image: "https://loremflickr.com/200/200/polaroid" },
    { name: "Business Stationery", image: "https://loremflickr.com/200/200/stationery" },
    { name: "Packaging", image: "https://loremflickr.com/200/200/cardboard,box" },
    { name: "Corporate Combos", image: "https://loremflickr.com/200/200/diary,pen" },
    { name: "Stickers", image: "https://loremflickr.com/200/200/stickers" },
  ];

  return (
    <header className="w-full z-50 bg-white shadow-sm relative">
      {/* Top Black Banner */}
      <div className="bg-[#1e1e1e] text-white text-[11px] py-1.5 px-4 flex justify-between items-center tracking-wide">
        <div className="flex gap-4">
          <span className="hidden sm:flex items-center gap-2">
            <Phone className="w-3 h-3" /> Need Help? Talk to us 24/7
          </span>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <Link href="#" className="hover:text-white transition-colors">Track order</Link>
          <span className="text-gray-600">|</span>
          <Link href="#" className="hover:text-white transition-colors">Bulk order</Link>
          <span className="text-gray-600">|</span>
          <Link href="#" className="hover:text-white transition-colors text-[#f16334]">Sell on ELAAMY</Link>
        </div>
      </div>

      {/* Main Header Area */}
      <div className="py-4 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between gap-6 lg:gap-10">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <NextImage 
              src="/logo.png" 
              alt="Elaamy Logo" 
              width={140} 
              height={50} 
              className="object-contain w-24 sm:w-28 h-auto" 
              priority
            />
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <form onSubmit={handleSearch} className="w-full flex shadow-sm rounded-md overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in products (e.g., Wedding Cards, Mementos)..."
                className="w-full pl-4 pr-4 py-2 bg-gray-50 border border-gray-200 border-r-0 text-sm focus:outline-none focus:bg-white transition-colors"
              />
              <button type="submit" className="bg-[#e21b22] text-white px-8 py-2 font-medium hover:bg-red-700 transition-colors">
                Search
              </button>
            </form>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-6 text-[13px] text-gray-700 font-medium z-50">
            <Link href="/collections" className="hover:text-[#e21b22] transition-colors">Special Offers</Link>
            
            <div className="relative group cursor-pointer h-full">
              <div className="hover:text-[#e21b22] transition-colors flex items-center gap-1 py-4">
                More <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
              </div>
              <div className="absolute top-[80%] left-0 bg-white shadow-xl border border-gray-100 rounded-lg p-2 min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link href="/about" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-[#e21b22] rounded-md transition-colors">About Us</Link>
                <Link href="/contact" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-[#e21b22] rounded-md transition-colors">Contact</Link>
                <Link href="/collections" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-[#e21b22] rounded-md transition-colors">All Products</Link>
              </div>
            </div>

            <div className="relative group cursor-pointer h-full">
              <div className="hover:text-[#e21b22] transition-colors flex items-center gap-1 py-4">
                <Globe className="w-4 h-4 text-gray-500" /> English <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
              </div>
              <div className="absolute top-[80%] left-0 bg-white shadow-xl border border-gray-100 rounded-lg p-2 min-w-[120px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="px-3 py-2 font-bold text-[#e21b22] bg-red-50 rounded-md">English</div>
                <div className="px-3 py-2 hover:bg-gray-50 text-gray-400 cursor-not-allowed rounded-md">Arabic (Soon)</div>
              </div>
            </div>
            
            <Link href="/checkout" className="flex items-center gap-1.5 cursor-pointer hover:text-[#e21b22] transition-colors">
              <User className="w-5 h-5 text-gray-500" />
              <span>Login</span>
            </Link>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 cursor-pointer hover:text-[#e21b22] transition-colors relative"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-500" />
                <span className="absolute -top-1.5 -right-1.5 bg-[#e21b22] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                  {cartItemCount}
                </span>
              </div>
              <div className="flex flex-col text-left text-xs">
                <span className="text-gray-400">Cart</span>
                <span className="font-bold text-gray-800">₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Navigation (Desktop) */}
      <div className="hidden md:block relative border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <ul className="flex items-center justify-between text-[13px] font-bold text-gray-700">
            {topCategories.map((cat, idx) => (
              <li 
                key={idx}
                className={`cursor-pointer border-b-2 transition-colors ${cat === 'All Products' ? 'border-[#6c2bd9] text-[#6c2bd9]' : 'border-transparent hover:text-[#e21b22] hover:border-[#e21b22]'}`}
                onMouseEnter={() => cat === "All Products" && setShowMegaMenu(true)}
                onMouseLeave={() => cat === "All Products" && setShowMegaMenu(false)}
              >
                {cat === "All Products" ? (
                  <div className="flex items-center gap-1.5 py-3.5 px-2">
                    <Menu className="w-4 h-4" /> {cat}
                  </div>
                ) : (
                  <Link href={`/collections?category=${cat}`} className="block py-3.5 px-2">
                    {cat}
                  </Link>
                )}
                
                {/* Mega Menu Dropdown */}
                {cat === "All Products" && showMegaMenu && (
                  <div className="absolute left-0 top-full w-full bg-white shadow-2xl border-t border-gray-200 z-50 p-8 flex justify-center">
                    <div className="w-full max-w-7xl grid grid-cols-6 gap-6 text-left">
                      {/* Column 1 */}
                      <div>
                        <h4 className="text-[#6c2bd9] font-bold mb-4 pb-1 border-b border-gray-100 text-sm">Best Sellers</h4>
                        <ul className="space-y-2.5 text-gray-600 text-[13px] flex flex-col">
                          <Link href="/collections?category=Wedding" className="hover:text-[#6c2bd9] transition-colors">Wedding Cards</Link>
                          <Link href="/collections?category=Photo" className="hover:text-[#6c2bd9] transition-colors">Acrylic Photo Frames</Link>
                          <Link href="/collections?category=Mementos" className="hover:text-[#6c2bd9] transition-colors">Premium Mementos</Link>
                          <Link href="/collections?category=Stationery" className="hover:text-[#6c2bd9] transition-colors">Custom Letter Pads</Link>
                          <Link href="/collections?category=Stickers" className="hover:text-[#6c2bd9] transition-colors">Stickers &amp; Labels</Link>
                          <Link href="/collections?category=Corporate" className="hover:text-[#6c2bd9] transition-colors">Corporate Gift Sets</Link>
                          <Link href="/collections?category=Stationery" className="hover:text-[#6c2bd9] transition-colors">Custom Folders</Link>
                        </ul>
                      </div>
                      {/* Column 2 */}
                      <div>
                        <h4 className="text-gray-800 font-bold mb-4 pb-1 border-b border-gray-100 text-sm">Browse Category By</h4>
                        <ul className="space-y-2.5 text-gray-600 text-[13px] flex flex-col">
                          <Link href="/collections?category=Wedding" className="hover:text-[#6c2bd9] transition-colors">Wedding Cards</Link>
                          <Link href="/collections?category=Mementos" className="hover:text-[#6c2bd9] transition-colors">Mementos &amp; Awards</Link>
                          <Link href="/collections?category=Photo" className="hover:text-[#6c2bd9] transition-colors">Photo Gifts</Link>
                          <Link href="/collections?category=Stationery" className="hover:text-[#6c2bd9] transition-colors">Business Stationery</Link>
                          <Link href="/collections?category=Stickers" className="hover:text-[#6c2bd9] transition-colors">Stickers</Link>
                          <Link href="/collections?category=Packaging" className="hover:text-[#6c2bd9] transition-colors">Packaging</Link>
                        </ul>
                      </div>
                      {/* Column 3 */}
                      <div>
                        <h4 className="text-gray-800 font-bold mb-4 pb-1 border-b border-gray-100 text-sm">Wedding Cards</h4>
                        <ul className="space-y-2.5 text-gray-600 text-[13px] flex flex-col">
                          <Link href="/collections?category=Wedding" className="hover:text-[#6c2bd9] transition-colors font-medium text-[#6c2bd9]">View All &gt;</Link>
                          <Link href="/collections?category=Wedding" className="hover:text-[#6c2bd9] transition-colors">Premium Wedding Cards</Link>
                          <Link href="/collections?category=Wedding" className="hover:text-[#6c2bd9] transition-colors">Designer Invitations</Link>
                          <Link href="/collections?category=Wedding" className="hover:text-[#6c2bd9] transition-colors">Ring Bound Cards</Link>
                        </ul>
                        <h4 className="text-gray-800 font-bold mt-6 mb-4 pb-1 border-b border-gray-100 text-sm">Photo Gifts</h4>
                        <ul className="space-y-2.5 text-gray-600 text-[13px] flex flex-col">
                          <Link href="/collections?category=Photo" className="hover:text-[#6c2bd9] transition-colors font-medium text-[#6c2bd9]">View All &gt;</Link>
                          <Link href="/collections?category=Photo" className="hover:text-[#6c2bd9] transition-colors">Acrylic Photo Frames</Link>
                          <Link href="/collections?category=Photo" className="hover:text-[#6c2bd9] transition-colors">Custom Canvas Prints</Link>
                        </ul>
                      </div>
                      {/* Column 4 */}
                      <div>
                        <h4 className="text-gray-800 font-bold mb-4 pb-1 border-b border-gray-100 text-sm">Mementos &amp; Awards</h4>
                        <ul className="space-y-2.5 text-gray-600 text-[13px] flex flex-col">
                          <Link href="/collections?category=Mementos" className="hover:text-[#6c2bd9] transition-colors font-medium text-[#6c2bd9]">View All &gt;</Link>
                          <Link href="/collections?category=Mementos" className="hover:text-[#6c2bd9] transition-colors">Premium Mementos</Link>
                          <Link href="/collections?category=Mementos" className="hover:text-[#6c2bd9] transition-colors">Glass Mementos</Link>
                          <Link href="/collections?category=Mementos" className="hover:text-[#6c2bd9] transition-colors">Trophies</Link>
                          <Link href="/collections?category=Mementos" className="hover:text-[#6c2bd9] transition-colors">Wooden Awards</Link>
                        </ul>
                      </div>
                      {/* Column 5 */}
                      <div>
                        <h4 className="text-gray-800 font-bold mb-4 pb-1 border-b border-gray-100 text-sm">Business Stationery</h4>
                        <ul className="space-y-2.5 text-gray-600 text-[13px] flex flex-col">
                          <Link href="/collections?category=Stationery" className="hover:text-[#6c2bd9] transition-colors font-medium text-[#6c2bd9]">View All &gt;</Link>
                          <Link href="/collections?category=Stationery" className="hover:text-[#6c2bd9] transition-colors">Custom Letter Pads</Link>
                          <Link href="/collections?category=Stationery" className="hover:text-[#6c2bd9] transition-colors">Custom Folders</Link>
                          <Link href="/collections?category=Stationery" className="hover:text-[#6c2bd9] transition-colors">Business Cards</Link>
                          <Link href="/collections?category=Stationery" className="hover:text-[#6c2bd9] transition-colors">Letterheads</Link>
                        </ul>
                      </div>
                      {/* Column 6 */}
                      <div>
                        <h4 className="text-gray-800 font-bold mb-4 pb-1 border-b border-gray-100 text-sm">Packaging &amp; Stickers</h4>
                        <ul className="space-y-2.5 text-gray-600 text-[13px] flex flex-col">
                          <Link href="/collections?category=Packaging" className="hover:text-[#6c2bd9] transition-colors font-medium text-[#6c2bd9]">View All &gt;</Link>
                          <Link href="/collections?category=Stickers" className="hover:text-[#6c2bd9] transition-colors">Custom Stickers</Link>
                          <Link href="/collections?category=Stickers" className="hover:text-[#6c2bd9] transition-colors">Product Labels</Link>
                          <Link href="/collections?category=Packaging" className="hover:text-[#6c2bd9] transition-colors">Packaging Boxes</Link>
                          <Link href="/collections?category=Packaging" className="hover:text-[#6c2bd9] transition-colors">Carry Bags</Link>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sub Categories with Photos - Story Style */}
      <div className="hidden md:block py-8 bg-gradient-to-b from-white to-[#fcfafc] border-b border-purple-50">
        <div className="container mx-auto px-4 lg:px-8">
          <ul className="flex items-center justify-center gap-6 lg:gap-10 overflow-x-auto no-scrollbar px-2 pb-2">
            {subCategories.map((sub, idx) => (
              <Link href={`/collections?category=${sub.name}`}
                key={idx} 
                className="group flex flex-col items-center gap-3 cursor-pointer flex-shrink-0"
              >
                {/* Image Container with Gradient Border */}
                <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-orange-400 transition-all duration-500 shadow-[0_4px_12px_rgba(0,0,0,0.05)] group-hover:shadow-[0_8px_20px_rgba(108,43,217,0.2)] hover:-translate-y-1">
                  <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full border-[3px] border-white overflow-hidden relative bg-white">
                    <NextImage 
                      src={sub.image}
                      alt={sub.name}
                      fill
                      sizes="100px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>
                {/* Text */}
                <span className="text-[13px] font-bold text-gray-600 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-purple-600 transition-all duration-300 whitespace-nowrap">
                  {sub.name}
                </span>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl z-50 border-t border-gray-100 max-h-[calc(100vh-100px)] overflow-y-auto">
          <div className="p-4 border-b border-gray-100">
            <form onSubmit={handleSearch} className="w-full flex shadow-sm rounded-md overflow-hidden border border-gray-200">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-4 pr-4 py-3 bg-gray-50 text-sm focus:outline-none focus:bg-white"
              />
              <button type="submit" className="bg-[#e21b22] text-white px-6 font-medium hover:bg-red-700">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
          <ul className="flex flex-col py-2">
            <li className="px-6 py-3 border-b border-gray-50 font-bold text-gray-900">Categories</li>
            {topCategories.map((cat, idx) => (
              <li key={idx}>
                <Link 
                  href={`/collections?category=${cat}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-6 py-3 text-sm text-gray-600 hover:text-[#e21b22] hover:bg-gray-50 transition-colors"
                >
                  {cat}
                </Link>
              </li>
            ))}
            <li className="px-6 py-4 mt-2 border-t border-gray-100 flex items-center justify-between text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2"><User className="w-4 h-4" /> Login / Register</span>
            </li>
          </ul>
        </div>
      )}

      {/* Floating Chat Button */}
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
