"use client";

import Link from "next/link";
import Image from "next/image";

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16.11 11.66a5 5 0 1 1-5.02-5.02 5 5 0 0 1 5.02 5.02Z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
);

export function Footer() {
  return (
    <footer className="bg-[#F8F9FA] pt-12 md:pt-16">
      {/* Newsletter Banner */}
      <div className="bg-white py-8 md:py-12 mb-8 md:mb-12 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Join our newsletter</h3>
              <p className="text-gray-500 text-sm max-w-md">Get exclusive offers, original stories, events and more.</p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full sm:w-72 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 text-sm text-black"
              />
              <button className="whitespace-nowrap px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-lg font-semibold text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/logo.png" 
                alt="Elaamy Logo" 
                width={140} 
                height={50} 
                className="object-contain w-32 h-auto"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
              We bring your ideas to life with premium customized gifts, elegant wedding cards, and professional business stationery.
            </p>
            <div className="space-y-3">
              <p className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 font-bold">📞</span>
                +971 50 123 4567
              </p>
              <p className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 font-bold">✉️</span>
                hello@elaamy.com
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4">Shop Categories</h4>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li><Link href="/collections?category=Wedding" className="hover:text-pink-500 transition-colors">Wedding Cards</Link></li>
              <li><Link href="/collections?category=Mementos" className="hover:text-pink-500 transition-colors">Mementos &amp; Awards</Link></li>
              <li><Link href="/collections?category=Corporate" className="hover:text-pink-500 transition-colors">Corporate Gifts</Link></li>
              <li><Link href="/collections?category=Stationery" className="hover:text-pink-500 transition-colors">Business Stationery</Link></li>
              <li><Link href="/collections?category=Packaging" className="hover:text-pink-500 transition-colors">Packaging</Link></li>
              <li><Link href="/collections?category=Stickers" className="hover:text-pink-500 transition-colors">Stickers</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4">Customer Service</h4>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li><Link href="/orders" className="hover:text-pink-500 transition-colors">Track Order</Link></li>
              <li><Link href="/contact" className="hover:text-pink-500 transition-colors">Contact Us</Link></li>
              <li><Link href="/auth/login" className="hover:text-pink-500 transition-colors">My Account</Link></li>
              <li><Link href="/checkout" className="hover:text-pink-500 transition-colors">Checkout</Link></li>
              <li><Link href="/about" className="hover:text-pink-500 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4">For Business</h4>
            <ul className="space-y-2.5 text-xs text-gray-500">
              {["Bulk Orders", "Corporate Gifting", "Become an Affiliate", "Advertise With Us", "Sell on Elaamy", "Partner Program"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-pink-500 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-bold text-gray-900 mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { id: "fb", icon: Facebook, hover: "hover:bg-blue-100 hover:text-blue-600" },
                  { id: "ig", icon: Instagram, hover: "hover:bg-pink-100 hover:text-pink-600" },
                  { id: "tw", icon: Twitter, hover: "hover:bg-sky-100 hover:text-sky-500" },
                  { id: "yt", icon: Youtube, hover: "hover:bg-red-100 hover:text-red-600" }
                ].map((social) => (
                  <button
                    key={social.id}
                    className={`w-9 h-9 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center transition-all ${social.hover}`}
                  >
                    <social.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1A1A1A] py-4">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[11px] text-[#A0A0A0]">
            © Empireae 2026. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <div className="px-3 h-8 bg-black border border-[#333] rounded flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-[10px] text-white">🍎 App Store</span>
            </div>
            <div className="px-3 h-8 bg-black border border-[#333] rounded flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-[10px] text-white">▶ Google Play</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
