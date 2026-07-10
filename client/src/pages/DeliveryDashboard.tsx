import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

interface OrderItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  orderItems: OrderItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    pinCode: string;
    phone: string;
  };
  totalPrice: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchAssignedOrders = async () => {
    try {
      const response = await api.get("/orders/assigned");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch assigned orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedOrders();
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      toast.success(`Order marked as ${newStatus}`);
      fetchAssignedOrders();
    } catch (error) {
      toast.error("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColor = (status: string) => {
    if (status === "Cancelled") return "bg-red-500/10 text-red-400 border-red-500/20";
    if (status === "Delivered") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (status === "Shipped") return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    return "bg-purple-500/10 text-purple-400 border-purple-500/20";
  };

  if (loading) {
    return <p className="text-center text-slate-400 py-20">Loading assigned orders...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-1">Delivery Dashboard</h1>
      <p className="text-slate-400 text-sm mb-8">
        {orders.length} orders assigned to you
      </p>

      {orders.length === 0 ? (
        <p className="text-slate-400 text-center py-10">
          No orders assigned yet.
        </p>
      ) : (
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
                    {new Date(order.createdAt).toLocaleDateString()} •{" "}
                    {order.paymentMethod}
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

              <div className="bg-[#0a0e17] border border-white/10 rounded-lg p-4 mb-4">
                <p className="text-white text-sm font-medium mb-1">
                  {order.shippingAddress.fullName}
                </p>
                <p className="text-slate-400 text-xs">
                  {order.shippingAddress.address}, {order.shippingAddress.city} -{" "}
                  {order.shippingAddress.pinCode}
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Phone: {order.shippingAddress.phone}
                </p>
              </div>

              <div className="space-y-2 mb-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-white text-sm">{item.name}</p>
                      <p className="text-slate-500 text-xs">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-3 flex items-center justify-between mb-4">
                <span className="text-slate-400 text-sm">Total</span>
                <span className="text-white font-bold">₹{order.totalPrice}</span>
              </div>

              {order.status === "Processing" && (
                <button
                  onClick={() => handleStatusUpdate(order._id, "Shipped")}
                  disabled={updatingId === order._id}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
                >
                  {updatingId === order._id ? "Updating..." : "Mark as Shipped"}
                </button>
              )}

              {order.status === "Shipped" && (
                <button
                  onClick={() => handleStatusUpdate(order._id, "Delivered")}
                  disabled={updatingId === order._id}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
                >
                  {updatingId === order._id ? "Updating..." : "Mark as Delivered"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryDashboard;