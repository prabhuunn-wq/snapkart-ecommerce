import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-3">
          Your cart is empty
        </h1>
        <p className="text-slate-400 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="bg-[#111827] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm sm:text-base truncate">
                  {item.name}
                </h3>
                <p className="text-slate-400 text-sm mt-1">₹{item.price}</p>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="sm:hidden text-slate-500 hover:text-red-400 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
              <div className="flex items-center gap-3 bg-[#0a0e17] border border-white/10 rounded-lg px-3 py-1.5">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="text-slate-400 hover:text-white transition"
                >
                  <Minus size={16} />
                </button>
                <span className="text-white text-sm w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="text-slate-400 hover:text-white transition"
                >
                  <Plus size={16} />
                </button>
              </div>

              <p className="text-white font-semibold sm:w-20 text-right">
                ₹{item.price * item.quantity}
              </p>

              <button
                onClick={() => removeFromCart(item._id)}
                className="hidden sm:block text-slate-500 hover:text-red-400 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[#111827] border border-white/10 rounded-xl p-6 flex items-center justify-between">
        <span className="text-slate-400">Total Amount</span>
        <span className="text-2xl font-bold text-white">₹{cartTotal}</span>
      </div>

      <Link
        to="/checkout"
        className="block w-full mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition text-center"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default Cart;