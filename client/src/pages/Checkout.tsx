import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import axios from "axios";
import AddressSection from "../components/AddressSection";
import type { Address } from "../types/Address";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"Online" | "COD">("Online");
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const buildOrderItems = () =>
    cartItems.map((item) => ({
      product: item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));

  const buildShippingAddress = () => {
    if (!selectedAddress) return null;
    return {
      fullName: selectedAddress.fullName,
      address: selectedAddress.address,
      city: selectedAddress.city,
      pinCode: selectedAddress.pinCode,
      phone: selectedAddress.phone,
    };
  };

  const handleCODOrder = async () => {
    setPlacing(true);
    try {
      await api.post("/orders", {
        orderItems: buildOrderItems(),
        shippingAddress: buildShippingAddress(),
        totalPrice: cartTotal,
        paymentMethod: "COD",
      });

      clearCart();
      navigate("/order-success");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to place order");
      } else {
        setError("Something went wrong");
      }
      setPlacing(false);
    }
  };

  const handleOnlinePayment = async () => {
    setPlacing(true);
    try {
      const { data: razorpayOrder } = await api.post("/payment/create-order", {
        amount: cartTotal,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "SnapCart",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async (response: any) => {
          try {
            const { data: verifyData } = await api.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyData.success) {
              await api.post("/orders", {
                orderItems: buildOrderItems(),
                shippingAddress: buildShippingAddress(),
                totalPrice: cartTotal,
                paymentMethod: "Online",
              });

              clearCart();
              navigate("/order-success");
            } else {
              setError("Payment verification failed");
            }
          } catch (err) {
            setError("Payment verification failed");
          } finally {
            setPlacing(false);
          }
        },
        prefill: {
          name: selectedAddress?.fullName,
          contact: selectedAddress?.phone,
        },
        theme: {
          color: "#7c3aed",
        },
        modal: {
          ondismiss: () => {
            setPlacing(false);
          },
        },
      };

      const razorpayWindow = new window.Razorpay(options);
      razorpayWindow.open();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to initiate payment");
      } else {
        setError("Something went wrong");
      }
      setPlacing(false);
    }
  };

  const handlePlaceOrder = async () => {
    setError("");

    if (!selectedAddress) {
      setError("Please select or add a shipping address");
      return;
    }

    if (paymentMethod === "COD") {
      await handleCODOrder();
    } else {
      await handleOnlinePayment();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-3">
          Your cart is empty
        </h1>
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
      <h1 className="text-2xl font-bold text-white mb-6">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#111827] border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Shipping Address
            </h2>

            <AddressSection onSelectAddress={setSelectedAddress} />
          </div>

          <div className="bg-[#111827] border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Payment Method
            </h2>

            <div className="space-y-3">
              <label
                className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition ${
                  paymentMethod === "Online"
                    ? "border-purple-500 bg-purple-500/5"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "Online"}
                  onChange={() => setPaymentMethod("Online")}
                  className="accent-purple-500"
                />
                <div>
                  <p className="text-white text-sm font-medium">
                    Online Payment
                  </p>
                  <p className="text-slate-500 text-xs">
                    Pay securely via Card, UPI, or Netbanking
                  </p>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition ${
                  paymentMethod === "COD"
                    ? "border-purple-500 bg-purple-500/5"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="accent-purple-500"
                />
                <div>
                  <p className="text-white text-sm font-medium">
                    Cash on Delivery
                  </p>
                  <p className="text-slate-500 text-xs">
                    Pay when your order arrives
                  </p>
                </div>
              </label>
            </div>

            {error && (
              <p className="bg-red-500/10 text-red-400 text-sm p-3 rounded-lg mt-4 border border-red-500/20">
                {error}
              </p>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {placing
                ? "Processing..."
                : paymentMethod === "COD"
                ? "Place Order"
                : "Pay Now"}
            </button>
          </div>
        </div>

        <div>
          <div className="bg-[#111827] border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-white">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between">
              <span className="text-slate-400 font-medium">Total</span>
              <span className="text-white text-xl font-bold">₹{cartTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;