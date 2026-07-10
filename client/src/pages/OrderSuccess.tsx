import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
  return (
    <div className="max-w-lg mx-auto px-6 py-24 text-center">
      <CheckCircle size={64} className="text-emerald-400 mx-auto mb-6" />
      <h1 className="text-2xl font-bold text-white mb-3">
        Order Placed Successfully!
      </h1>
      <p className="text-slate-400 mb-8">
        Thank you for shopping with SnapCart. Your order is being processed
        and will be delivered soon.
      </p>

      <div className="flex gap-4 justify-center">
        <Link
          to="/"
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition"
        >
          Continue Shopping
        </Link>
        <Link
          to="/orders"
          className="border border-white/20 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-white/5 transition"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;