import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import { Star, Minus, Plus } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setSelectedImage(0);
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);

        const allProducts = await api.get("/products");
        const related = allProducts.data.filter(
          (p: Product) =>
            p.category === response.data.category && p._id !== response.data._id
        );
        setRelatedProducts(related.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  if (loading) {
    return <p className="text-center text-slate-400 py-20">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center text-slate-400 py-20">Product not found.</p>;
  }

  const galleryImages = Array(5).fill(product.image);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link to="/" className="text-purple-400 text-sm hover:underline">
        ← Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <div>
          <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden mb-3">
            <img
              src={galleryImages[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="grid grid-cols-5 gap-2">
            {galleryImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`bg-[#111827] border rounded-lg overflow-hidden transition ${
                  selectedImage === index
                    ? "border-purple-500"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-16 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>

          <div className="flex items-center gap-1 mb-4">
            <Star size={16} className="text-amber-400 fill-amber-400" />
            <span className="text-sm text-slate-400">
              {product.rating.toFixed(1)} rating
            </span>
          </div>

          <p className="text-3xl font-bold text-white mb-4">₹{product.price}</p>

          <p className="text-slate-400 leading-relaxed mb-6">
            {product.description}
          </p>

          <p className="text-sm text-slate-500 mb-6">
            Category: <span className="text-slate-300">{product.category}</span>
            {"  •  "}
            Stock: <span className="text-slate-300">{product.stock}</span>
          </p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-white text-sm">Quantity</span>
            <div className="flex items-center gap-3 bg-[#111827] border border-white/10 rounded-lg px-3 py-1.5">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-slate-400 hover:text-white transition"
              >
                <Minus size={16} />
              </button>
              <span className="text-white text-sm w-4 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-slate-400 hover:text-white transition"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-white mb-6">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;