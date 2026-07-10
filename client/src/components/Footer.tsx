const Footer = () => {
  return (
    <footer className="bg-[#0a0e17] border-t border-white/10 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 sm:py-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
        <div className="col-span-2 sm:col-span-2 lg:col-span-1">
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-white">Snap</span>
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Kart
            </span>
          </span>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Shop smarter, live better. Discover the best products at unbeatable
            prices.
          </p>
          <div className="flex gap-4 mt-4 text-xs text-slate-500">
            <span className="hover:text-purple-400 cursor-pointer transition">
              Facebook
            </span>
            <span className="hover:text-purple-400 cursor-pointer transition">
              Instagram
            </span>
            <span className="hover:text-purple-400 cursor-pointer transition">
              Twitter
            </span>
            <span className="hover:text-purple-400 cursor-pointer transition">
              YouTube
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li className="hover:text-purple-400 cursor-pointer transition">
              Mobiles
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition">
              Electronics
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition">
              Fashion
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition">
              Home & Kitchen
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition">
              Sports & Outdoors
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4">
            Customer Service
          </h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li className="hover:text-purple-400 cursor-pointer transition">
              Help Center
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition">
              Track Order
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition">
              Returns & Exchanges
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition">
              Shipping Policy
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition">
              Contact Us
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li className="hover:text-purple-400 cursor-pointer transition">
              About Us
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition">
              Careers
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition">
              Blog
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition">
              Press
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition">
              Affiliates
            </li>
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-2 lg:col-span-1">
          <h4 className="text-white text-sm font-semibold mb-4">Newsletter</h4>
          <p className="text-slate-500 text-sm mb-3">
            Subscribe to get updates on new arrivals and exclusive offers.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 rounded-lg hover:opacity-90 transition">
              →
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
          <p>© 2026 SnapCart. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-purple-400 cursor-pointer transition">
              Privacy Policy
            </span>
            <span className="hover:text-purple-400 cursor-pointer transition">
              Terms of Service
            </span>
            <span className="hover:text-purple-400 cursor-pointer transition">
              Refund Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;