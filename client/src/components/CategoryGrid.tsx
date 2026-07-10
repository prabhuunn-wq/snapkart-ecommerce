import { Link } from "react-router-dom";
import { Smartphone, Laptop, Shirt, Sofa, Watch, Trophy } from "lucide-react";

const categories = [
  { name: "Mobiles & Accessories", count: "1200+ Products", icon: Smartphone, color: "text-blue-400" },
  { name: "Electronics", count: "950+ Products", icon: Laptop, color: "text-purple-400" },
  { name: "Fashion", count: "1800+ Products", icon: Shirt, color: "text-pink-400" },
  { name: "Home & Kitchen", count: "1100+ Products", icon: Sofa, color: "text-amber-400" },
  { name: "Watches", count: "630+ Products", icon: Watch, color: "text-emerald-400" },
  { name: "Sports & Outdoors", count: "850+ Products", icon: Trophy, color: "text-red-400" },
];

const CategoryGrid = () => {
  return (
    <section className="bg-[#0a0e17] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Shop by Categories</h2>
          <Link to="/categories" className="text-sm text-purple-400 hover:text-purple-300 transition">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/categories?category=${encodeURIComponent(cat.name)}`}
                className="bg-[#111827] border border-white/10 rounded-xl p-5 hover:border-purple-500/50 transition cursor-pointer block"
              >
                <Icon size={28} className={cat.color} />
                <h3 className="text-white text-sm font-medium mt-3">
                  {cat.name}
                </h3>
                <p className="text-slate-500 text-xs mt-1">{cat.count}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;