import { Link } from "react-router-dom";
import { useRef } from "react";
import type { Product } from "../types/Product";
import { Star, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const liked = isInWishlist(product._id);
  const outOfStock = product.stock === 0;
  const imageRef = useRef<HTMLImageElement>(null);

  const discountPercent = (product._id.charCodeAt(0) % 16) + 10;
  const originalPrice = Math.round(
    product.price / (1 - discountPercent / 100)
  );

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    toast.success(liked ? "Removed from wishlist" : "Added to wishlist!");
  };

  const flyToCart = () => {
    const imageEl = imageRef.current;
    const cartIcon = document.getElementById("navbar-cart-icon");
    if (!imageEl || !cartIcon) return;

    const imageRect = imageEl.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const clone = imageEl.cloneNode(true) as HTMLImageElement;
    clone.style.position = "fixed";
    clone.style.left = `${imageRect.left}px`;
    clone.style.top = `${imageRect.top}px`;
    clone.style.width = `${imageRect.width}px`;
    clone.style.height = `${imageRect.height}px`;
    clone.style.borderRadius = "8px";
    clone.style.zIndex = "9999";
    clone.style.transition = "all 0.7s cubic-bezier(0.55, 0, 0.1, 1)";
    clone.style.pointerEvents = "none";
    document.body.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.left = `${cartRect.left + cartRect.width / 2 - 10}px`;
      clone.style.top = `${cartRect.top + cartRect.height / 2 - 10}px`;
      clone.style.width = "20px";
      clone.style.height = "20px";
      clone.style.opacity = "0.4";
    });

    setTimeout(() => {
      document.body.removeChild(clone);
      window.dispatchEvent(new Event("cart-bump"));
    }, 700);
  };

  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 transition group">
      <Link to={`/products/${product._id}`}>
        <div className="relative">
          {!outOfStock && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
              -{discountPercent}%
            </span>
          )}

          <button
            onClick={handleWishlistClick}
            className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm p-1.5 rounded-full hover:bg-black/60 transition z-10"
          >
            <Heart
              size={16}
              className={liked ? "text-red-500 fill-red-500" : "text-white"}
            />
          </button>

          <img
            ref={imageRef}
            src={product.image}
            alt={product.name}
            className={`w-full h-40 object-cover group-hover:scale-105 transition duration-300 ${
              outOfStock ? "opacity-40 grayscale" : ""
            }`}
          />

          {outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="px-4 pt-4">
          <h3 className="font-medium text-white text-sm truncate">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mt-1.5">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-xs text-slate-400">{product.rating.toFixed(1)}</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-white">
              ₹{product.price}
            </span>
            {!outOfStock && (
              <span className="text-xs text-slate-500 line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4 pt-3">
        <button
          onClick={() => {
            if (outOfStock) return;
            addToCart(product);
            flyToCart();
            toast.success(`${product.name} added to cart!`);
          }}
          disabled={outOfStock}
          className={`w-full py-2 rounded-lg text-sm font-medium transition ${
            outOfStock
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90"
          }`}
        >
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;