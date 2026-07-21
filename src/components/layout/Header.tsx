"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, Heart, User, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/collections", label: "Collections" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-[#f16334] text-white text-xs font-bold py-2 text-center px-4">
        FREE delivery &amp; 40% Discount for next 3 orders!
      </div>

      {/* Top Bar - hidden on mobile */}
      <div className="hidden md:flex bg-[#2A2A2A] text-[#B0B0B0] text-xs py-2 px-6 justify-between items-center">
        <div>Track Order | About Us | Contact | FAQ</div>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-1 hover:text-white transition-colors">
            English <ChevronDown className="w-3 h-3" />
          </button>
          <div className="w-px h-3 bg-[#444]" />
          <button className="flex items-center gap-1 hover:text-white transition-colors">
            ₹ INR <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Nav */}
      <div className={cn(
        "px-4 md:px-6 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-white/90 backdrop-blur-sm py-4"
      )}>
        <div className="container mx-auto flex items-center justify-between gap-4">

          {/* Logo / Brand */}
          <Link href="/" className="text-pink-500 font-bold text-xl flex-shrink-0">
            Elaamy
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-gray-800">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-pink-500 transition-colors whitespace-nowrap">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Search + Actions */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products here"
                className="pl-9 pr-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 w-44 lg:w-56 shadow-sm"
              />
            </form>
            <button className="w-9 h-9 rounded-full bg-purple-500 text-white flex items-center justify-center hover:bg-purple-600 transition-colors shadow-sm">
              <User className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white text-gray-700 flex items-center justify-center border border-gray-100 hover:text-pink-500 transition-colors shadow-sm">
              <ShoppingCart className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white text-gray-700 flex items-center justify-center border border-gray-100 hover:text-pink-500 transition-colors shadow-sm">
              <Heart className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right: search icon + cart + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="w-9 h-9 rounded-full bg-gray-50 text-gray-700 flex items-center justify-center border border-gray-100"
            >
              <Search className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white text-gray-700 flex items-center justify-center border border-gray-100 hover:text-pink-500 transition-colors">
              <ShoppingCart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center border border-pink-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden px-1 pb-3 pt-2">
            <form onSubmit={handleSearch} className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products here"
                autoFocus
                className="w-full pl-9 pr-4 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100"
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-800 font-semibold text-base hover:text-pink-500 transition-colors py-1 border-b border-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-pink-500">
                <User className="w-4 h-4" /> Account
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-pink-500">
                <Heart className="w-4 h-4" /> Wishlist
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
