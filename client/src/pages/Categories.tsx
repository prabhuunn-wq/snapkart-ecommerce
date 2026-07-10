import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";

const PRODUCTS_PER_PAGE = 12;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryFromUrl
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setCurrentPage(1);
  }, [categoryFromUrl]);

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

  const categories = Array.from(new Set(products.map((p) => p.category)));

  let filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  if (minPrice !== "") {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= Number(minPrice)
    );
  }
  if (maxPrice !== "") {
    filteredProducts = filteredProducts.filter(
      (p) => p.price <= Number(maxPrice)
    );
  }

  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const handleCategoryClick = (cat: string | null) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePriceChange = () => {
    setCurrentPage(1);
  };

  const clearPriceFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  if (loading) {
    return <p className="text-center text-slate-400 py-20">Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">Shop by Categories</h1>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === null
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                : "bg-[#111827] border border-white/10 text-slate-300 hover:border-purple-500/50"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                  : "bg-[#111827] border border-white/10 text-slate-300 hover:border-purple-500/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-[#111827] border border-white/10 text-slate-300 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="default">Sort: Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="text-slate-400 text-sm">Price Range:</span>
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          onBlur={handlePriceChange}
          className="w-24 bg-[#111827] border border-white/10 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <span className="text-slate-500">-</span>
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onBlur={handlePriceChange}
          className="w-24 bg-[#111827] border border-white/10 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {(minPrice !== "" || maxPrice !== "") && (
          <button
            onClick={clearPriceFilter}
            className="text-purple-400 text-sm hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-slate-400 text-center py-10">
          No products found matching your filters.
        </p>
      ) : (
        <>
          <p className="text-slate-500 text-sm mb-4">
            Showing {startIndex + 1}-
            {Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
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

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
  );
};

export default Categories;