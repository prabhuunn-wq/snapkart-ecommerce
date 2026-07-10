import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, Headphones } from "lucide-react";
import heroImage from "../assets/hero-headphones.png";

const Hero = () => {
  return (
    <section className="bg-[#0a0e17] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block bg-white/5 border border-white/10 text-purple-300 text-xs font-medium px-3 py-1 rounded-full mb-5">
            Welcome to SnapCart
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Shop Smarter,
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Live Better.
            </span>
          </h1>

          <p className="text-slate-400 text-base mb-8 max-w-md">
            Discover the latest products at unbeatable prices and enjoy a
            seamless shopping experience.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              to="/products"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link
              to="/categories"
              className="border border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/5 transition"
            >
              Explore Categories
            </Link>
          </div>

          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-2">
              <Truck size={22} className="text-purple-400" />
              <div>
                <p className="text-white text-sm font-medium">Free Delivery</p>
                <p className="text-slate-500 text-xs">On orders over ₹499</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={22} className="text-purple-400" />
              <div>
                <p className="text-white text-sm font-medium">Secure Payment</p>
                <p className="text-slate-500 text-xs">100% secure & safe</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Headphones size={22} className="text-purple-400" />
              <div>
                <p className="text-white text-sm font-medium">24/7 Support</p>
                <p className="text-slate-500 text-xs">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src={heroImage}
            alt="Wireless headphones"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
