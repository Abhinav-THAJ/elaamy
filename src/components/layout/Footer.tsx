"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#F8F9FA] pt-12 md:pt-16">
      {/* Newsletter Banner */}
      <div className="bg-white py-8 md:py-12 mb-8 md:mb-12 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Join our newsletter for ₹100 off</h3>
              <p className="text-sm text-gray-500">Register now to get latest updates on promotions &amp; coupons.</p>
              <p className="text-sm text-gray-400">Don&apos;t worry, we won&apos;t spam!</p>
            </div>
            <form className="flex w-full sm:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:w-56 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100"
              />
              <button className="px-5 py-2.5 bg-gradient-to-r from-pink-400 to-purple-500 text-white text-sm font-medium rounded-lg hover:shadow-md transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl pb-10 md:pb-14">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Contact */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-sm font-bold text-gray-900 mb-4">Need Help?</h4>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
              We&apos;re here to help you with all your custom printing needs.
            </p>
            <p className="text-lg font-bold text-[#f16334] mb-1">+91 9656262613</p>
            <p className="text-[10px] text-gray-400 mb-3">Mon–Sun: 9:00 AM – 6:00 PM</p>
            <p className="text-xs text-gray-500">Email: elaamy@gmail.com</p>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4">Help &amp; Info</h4>
            <ul className="space-y-2.5 text-xs text-gray-500">
              {["Your Orders", "Returns & Replacements", "Shipping Policy", "Refund Policy", "Privacy Policy", "Terms & Conditions", "Help Center"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-gray-900 hover:text-pink-500 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-gray-500">
              {["About Us", "Careers", "Investor Relations", "Customer Reviews", "Social Responsibility", "Store Locations", "Blog"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-pink-500 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
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
                {["FB", "IG", "TW", "YT"].map((social) => (
                  <button
                    key={social}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-pink-100 hover:text-pink-500 text-gray-600 text-xs font-bold flex items-center justify-center transition-colors"
                  >
                    {social}
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
            © Elaamy 2024. All rights reserved.
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
