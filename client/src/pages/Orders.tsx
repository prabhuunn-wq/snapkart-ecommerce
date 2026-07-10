import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import OrderTimeline from "../components/OrderTimeline";

interface OrderItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  orderItems: OrderItem[];
  totalPrice: number;
  status: string;
  createdAt: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/myorders");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId: string) => {
    setCancellingId(orderId);
    try {
      await api.put(`/orders/${orderId}/cancel`);
      toast.success("Order cancelled successfully");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to cancel order");
    } finally {
      setCancellingId(null);
    }
  };

  const statusColor = (status: string) => {
    if (status === "Cancelled") return "bg-red-500/10 text-red-400 border-red-500/20";
    if (status === "Delivered") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (status === "Shipped") return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    return "bg-purple-500/10 text-purple-400 border-purple-500/20";
  };

  if (loading) {
    return <p className="text-center text-slate-400 py-20">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-3">No orders yet</h1>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-[#111827] border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white text-sm font-medium">
                  Order #{order._id.slice(-8)}
                </p>
                <p className="text-slate-500 text-xs mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full border ${statusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <OrderTimeline status={order.status} />

            <div className="space-y-2 mb-4 border-t border-white/10 pt-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">{item.name}</p>
                    <p className="text-slate-500 text-xs">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-3 flex items-center justify-between">
              <span className="text-slate-400 text-sm">Total</span>
              <span className="text-white font-bold">₹{order.totalPrice}</span>
            </div>

            {order.status === "Processing" && (
              <button
                onClick={() => handleCancel(order._id)}
                disabled={cancellingId === order._id}
                className="mt-4 text-sm text-red-400 border border-red-500/20 bg-red-500/5 px-4 py-2 rounded-lg hover:bg-red-500/10 transition disabled:opacity-50"
              >
                {cancellingId === order._id ? "Cancelling..." : "Cancel Order"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;