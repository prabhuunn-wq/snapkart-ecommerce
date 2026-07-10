import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";

const Brands = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

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

  const brands = Array.from(
    new Set(products.filter((p) => p.brand).map((p) => p.brand))
  );

  const filteredProducts = selectedBrand
    ? products.filter((p) => p.brand === selectedBrand)
    : products;

  if (loading) {
    return <p className="text-center text-slate-400 py-20">Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">Shop by Brands</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSelectedBrand(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selectedBrand === null
              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
              : "bg-[#111827] border border-white/10 text-slate-300 hover:border-purple-500/50"
          }`}
        >
          All
        </button>
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedBrand === brand
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                : "bg-[#111827] border border-white/10 text-slate-300 hover:border-purple-500/50"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-slate-400 text-center py-10">
          No products found for this brand.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Brands;