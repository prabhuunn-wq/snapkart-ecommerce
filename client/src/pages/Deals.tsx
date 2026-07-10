import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import { Zap } from "lucide-react";

const PRODUCTS_PER_PAGE = 12;

const Deals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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

  const getDiscount = (product: Product) =>
    (product._id.charCodeAt(0) % 16) + 10;

  const sortedByDeals = [...products].sort(
    (a, b) => getDiscount(b) - getDiscount(a)
  );

  const discounts = sortedByDeals.map((p) => getDiscount(p));
  const minDiscount = discounts.length > 0 ? Math.min(...discounts) : 0;
  const maxDiscount = discounts.length > 0 ? Math.max(...discounts) : 0;

  const totalPages = Math.ceil(sortedByDeals.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedDeals = sortedByDeals.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  if (loading) {
    return <p className="text-center text-slate-400 py-20">Loading deals...</p>;
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-purple-900/40 via-[#0a0e17] to-blue-900/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-purple-300 text-xs font-medium px-4 py-1.5 rounded-full mb-5">
            <Zap size={14} className="text-amber-400" fill="currentColor" />
            Limited Time Offers
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Mega{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Deals
            </span>
          </h1>
          <p className="text-slate-400 text-base">
            Save up to{" "}
            <span className="text-white font-semibold">{maxDiscount}%</span>{" "}
            across {products.length} products — discounts from{" "}
            <span className="text-white font-semibold">{minDiscount}%</span>{" "}
            to{" "}
            <span className="text-white font-semibold">{maxDiscount}%</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {sortedByDeals.length === 0 ? (
          <p className="text-slate-400 text-center py-10">No deals available.</p>
        ) : (
          <>
            <p className="text-slate-500 text-sm mb-4">
              Showing {startIndex + 1}-
              {Math.min(startIndex + PRODUCTS_PER_PAGE, sortedByDeals.length)} of{" "}
              {sortedByDeals.length} deals
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedDeals.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg bg-[#111827] border border-white/10 text-slate-300 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:border-purple-500/50 transition"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                        currentPage === page
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                          : "bg-[#111827] border border-white/10 text-slate-300 hover:border-purple-500/50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg bg-[#111827] border border-white/10 text-slate-300 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:border-purple-500/50 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Deals;