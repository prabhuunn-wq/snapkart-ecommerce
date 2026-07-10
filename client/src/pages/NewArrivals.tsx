import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import { Sparkles } from "lucide-react";

interface ProductWithDate extends Product {
  createdAt: string;
}

const NewArrivals = () => {
  const [products, setProducts] = useState<ProductWithDate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortedByNewest = [...products].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const now = new Date().getTime();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const oneMonth = 30 * 24 * 60 * 60 * 1000;

  const thisWeek = sortedByNewest.filter(
    (p) => now - new Date(p.createdAt).getTime() <= oneWeek
  );
  const thisMonth = sortedByNewest.filter((p) => {
    const diff = now - new Date(p.createdAt).getTime();
    return diff > oneWeek && diff <= oneMonth;
  });
  const older = sortedByNewest.filter(
    (p) => now - new Date(p.createdAt).getTime() > oneMonth
  );

  if (loading) {
    return <p className="text-center text-slate-400 py-20">Loading...</p>;
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-emerald-900/40 via-[#0a0e17] to-emerald-900/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-emerald-300 text-xs font-medium px-4 py-1.5 rounded-full mb-5">
            <Sparkles size={14} className="text-emerald-400" />
            Fresh Off the Shelf
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            New{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Arrivals
            </span>
          </h1>
          <p className="text-slate-400 text-base">
            {products.length} products added recently
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        {thisWeek.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-white">This Week</h2>
              <span className="bg-emerald-500/10 text-emerald-400 text-xs font-medium px-3 py-1 rounded-full border border-emerald-500/20">
                {thisWeek.length} new
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {thisWeek.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}

        {thisMonth.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-white">This Month</h2>
              <span className="bg-slate-700/50 text-slate-400 text-xs font-medium px-3 py-1 rounded-full border border-white/10">
                {thisMonth.length} products
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {thisMonth.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}

        {older.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-white">Older</h2>
              <span className="bg-slate-700/50 text-slate-400 text-xs font-medium px-3 py-1 rounded-full border border-white/10">
                {older.length} products
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {older.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}

        {sortedByNewest.length === 0 && (
          <p className="text-slate-400 text-center py-10">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;