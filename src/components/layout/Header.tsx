"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, User, ChevronDown, Menu, X, Phone, Globe, Gift, Camera, BookOpen, Trophy, Mail, Briefcase, Package, Stamp } from "lucide-react";
import { useCart } from "@/components/CartContext";

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  const topCategories = [
    "All Products", "Wedding Cards", "Photo Frames", "Mementos", "Letter Pads", "Corporate Gifts", "Custom Printing", "Stickers"
  ];

  const subCategories = [
    { name: "Personalized Gifts", icon: Gift },
    { name: "Wedding Cards", icon: Mail },
    { name: "Mementos & Awards", icon: Trophy },
    { name: "Photo Gifts", icon: Camera },
    { name: "Business Stationery", icon: Briefcase },
    { name: "Packaging", icon: Package },
    { name: "Corporate Combos", icon: Package },
    { name: "Stickers", icon: Stamp },
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
          <Link href="/" className="flex-shrink-0 text-pink-600 font-extrabold text-3xl tracking-tight flex items-center gap-1">
            <span className="text-[#f16334] text-4xl">E</span>LAAMY
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
          <div className="hidden md:flex items-center gap-6 text-[13px] text-gray-700 font-medium">
            <Link href="#" className="hover:text-[#e21b22] transition-colors">Special Offers</Link>
            <Link href="#" className="hover:text-[#e21b22] transition-colors flex items-center gap-1">More <ChevronDown className="w-3 h-3" /></Link>
            <Link href="#" className="hover:text-[#e21b22] transition-colors flex items-center gap-1"><Globe className="w-4 h-4 text-gray-500" /> English <ChevronDown className="w-3 h-3" /></Link>
            
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#e21b22] transition-colors">
              <User className="w-5 h-5 text-gray-500" />
              <span>Login</span>
            </div>
            
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
                <span className="font-bold text-gray-800">₹0.00</span>
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
                className={`py-3.5 px-2 cursor-pointer border-b-2 transition-colors ${cat === 'All Products' ? 'border-[#6c2bd9] text-[#6c2bd9]' : 'border-transparent hover:text-[#e21b22] hover:border-[#e21b22]'}`}
                onMouseEnter={() => cat === "All Products" && setShowMegaMenu(true)}
                onMouseLeave={() => cat === "All Products" && setShowMegaMenu(false)}
              >
                {cat === "All Products" ? (
                  <div className="flex items-center gap-1.5">
                    <Menu className="w-4 h-4" /> {cat}
                  </div>
                ) : (
                  cat
                )}
                
                {/* Mega Menu Dropdown */}
                {cat === "All Products" && showMegaMenu && (
                  <div className="absolute left-0 top-full w-full bg-white shadow-2xl border-t border-gray-200 z-50 p-8 flex justify-center">
                    <div className="w-full max-w-7xl grid grid-cols-6 gap-6 text-left">
                      {/* Column 1 */}
                      <div>
                        <h4 className="text-[#6c2bd9] font-bold mb-4 pb-1 border-b border-gray-100 text-sm">Best Sellers</h4>
                        <ul className="space-y-2.5 text-gray-600 text-[13px]">
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Wedding Cards</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Acrylic Photo Frames</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Premium Mementos</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Custom Letter Pads</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Stickers &amp; Labels</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Corporate Gift Sets</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Custom Folders</li>
                        </ul>
                      </div>
                      {/* Column 2 */}
                      <div>
                        <h4 className="text-gray-800 font-bold mb-4 pb-1 border-b border-gray-100 text-sm">Browse Category By</h4>
                        <ul className="space-y-2.5 text-gray-600 text-[13px]">
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Wedding Cards</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Mementos &amp; Awards</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Photo Gifts</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Business Stationery</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Stickers</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Packaging</li>
                        </ul>
                      </div>
                      {/* Column 3 */}
                      <div>
                        <h4 className="text-gray-800 font-bold mb-4 pb-1 border-b border-gray-100 text-sm">Wedding Cards</h4>
                        <ul className="space-y-2.5 text-gray-600 text-[13px]">
                          <li className="hover:text-[#6c2bd9] cursor-pointer font-medium text-[#6c2bd9]">View All &gt;</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Premium Wedding Cards</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Designer Invitations</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Ring Bound Cards</li>
                        </ul>
                        <h4 className="text-gray-800 font-bold mt-6 mb-4 pb-1 border-b border-gray-100 text-sm">Photo Gifts</h4>
                        <ul className="space-y-2.5 text-gray-600 text-[13px]">
                          <li className="hover:text-[#6c2bd9] cursor-pointer font-medium text-[#6c2bd9]">View All &gt;</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Acrylic Photo Frames</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Custom Canvas Prints</li>
                        </ul>
                      </div>
                      {/* Column 4 */}
                      <div>
                        <h4 className="text-gray-800 font-bold mb-4 pb-1 border-b border-gray-100 text-sm">Mementos &amp; Awards</h4>
                        <ul className="space-y-2.5 text-gray-600 text-[13px]">
                          <li className="hover:text-[#6c2bd9] cursor-pointer font-medium text-[#6c2bd9]">View All &gt;</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Premium Mementos</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Glass Mementos</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Trophies</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Wooden Awards</li>
                        </ul>
                      </div>
                      {/* Column 5 */}
                      <div>
                        <h4 className="text-gray-800 font-bold mb-4 pb-1 border-b border-gray-100 text-sm">Business Stationery</h4>
                        <ul className="space-y-2.5 text-gray-600 text-[13px]">
                          <li className="hover:text-[#6c2bd9] cursor-pointer font-medium text-[#6c2bd9]">View All &gt;</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Custom Letter Pads</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Custom Folders</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Business Cards</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Letterheads</li>
                        </ul>
                      </div>
                      {/* Column 6 */}
                      <div>
                        <h4 className="text-gray-800 font-bold mb-4 pb-1 border-b border-gray-100 text-sm">Packaging &amp; Stickers</h4>
                        <ul className="space-y-2.5 text-gray-600 text-[13px]">
                          <li className="hover:text-[#6c2bd9] cursor-pointer font-medium text-[#6c2bd9]">View All &gt;</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Custom Stickers</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Product Labels</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Packaging Boxes</li>
                          <li className="hover:text-[#6c2bd9] cursor-pointer">Carry Bags</li>
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

      {/* Sub Categories with Icons */}
      <div className="hidden md:block py-6 bg-[#fcfcfc] border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <ul className="flex flex-wrap items-center justify-center gap-10 text-[12px] font-semibold text-gray-700">
            {subCategories.map((sub, idx) => (
              <li key={idx} className="flex flex-col items-center gap-2 cursor-pointer hover:text-[#6c2bd9] transition-colors">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 text-[#6c2bd9] hover:scale-110 transition-transform">
                  <sub.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <span>{sub.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <div className="absolute bottom-16 right-0 bg-white p-3 rounded-lg shadow-xl border border-gray-100 w-48 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Need help? <br/><span className="text-[#6c2bd9] font-bold">Talk to us!</span> <br/>Dedicated Customer Care <span className="text-[#f16334]">HERE</span>
        </div>
        <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 hover:scale-105 transition-all">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      </div>

    </header>
  );
}
