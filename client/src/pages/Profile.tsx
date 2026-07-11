import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/profile");
        const addr = response.data.address;
        if (addr) {
          setFullName(addr.fullName || "");
          setAddress(addr.address || "");
          setCity(addr.city || "");
          setPinCode(addr.pinCode || "");
          setPhone(addr.phone || "");
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }
    if (!/^\d{6}$/.test(pinCode)) {
      toast.error("Pin code must be exactly 6 digits");
      return;
    }

    setSaving(true);
    try {
      await api.put("/auth/address", { fullName, address, city, pinCode, phone });
      toast.success("Address saved successfully!");
    } catch (error) {
      toast.error("Failed to save address");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center text-slate-400 py-20">Loading profile...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">My Profile</h1>

      <div className="bg-[#111827] border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Account Details</h2>
        <div className="space-y-2 text-sm mb-4">
          <p className="text-slate-400">
            Name: <span className="text-white">{user?.name}</span>
          </p>
          <p className="text-slate-400">
            Email: <span className="text-white">{user?.email}</span>
          </p>
          <p className="text-slate-400">
            Role: <span className="text-white capitalize">{user?.role}</span>
          </p>
        </div>

        <Link
          to="/orders"
          className="flex items-center justify-between bg-[#0a0e17] border border-white/10 rounded-lg px-4 py-3 hover:border-purple-500/50 transition group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <Package size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Order History</p>
              <p className="text-slate-500 text-xs">
                Track your orders and view status
              </p>
            </div>
          </div>
          <span className="text-slate-500 group-hover:text-purple-400 transition">
            →
          </span>
        </Link>
      </div>

      <div className="bg-[#111827] border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Delivery Address</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-[#0a0e17] border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-purple-500/50"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-[#0a0e17] border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-purple-500/50"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-[#0a0e17] border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-purple-500/50"
              required
            />
            <input
              type="text"
              placeholder="Pin Code"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="w-full bg-[#0a0e17] border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-purple-500/50"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-[#0a0e17] border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-purple-500/50"
            required
          />
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;