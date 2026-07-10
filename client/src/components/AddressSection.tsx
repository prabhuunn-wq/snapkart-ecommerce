import { useState, useEffect } from "react";
import api from "../services/api";
import axios from "axios";
import type { Address } from "../types/Address";

interface AddressSectionProps {
  onSelectAddress: (address: Address) => void;
}

const AddressSection = ({ onSelectAddress }: AddressSectionProps) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phone, setPhone] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const fetchAddresses = async () => {
    try {
      const response = await api.get("/addresses");
      const data: Address[] = response.data;
      setAddresses(data);

      const defaultAddr = data.find((a) => a.isDefault) || data[0];
      if (defaultAddr) {
        setSelectedId(defaultAddr._id);
        onSelectAddress(defaultAddr);
      }
    } catch (err) {
      console.error("Failed to fetch addresses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const resetForm = () => {
    setFullName("");
    setAddress("");
    setCity("");
    setPinCode("");
    setPhone("");
    setIsDefault(false);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  const handleSelect = (addr: Address) => {
    setSelectedId(addr._id);
    onSelectAddress(addr);
  };

  const handleEditClick = (addr: Address) => {
    setFullName(addr.fullName);
    setAddress(addr.address);
    setCity(addr.city);
    setPinCode(addr.pinCode);
    setPhone(addr.phone);
    setIsDefault(addr.isDefault);
    setEditingId(addr._id);
    setShowForm(true);
  };

  const handleAddClick = () => {
    resetForm();
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/addresses/${id}`);
      setAddresses((prev) => prev.filter((a) => a._id !== id));

      if (selectedId === id) {
        const remaining = addresses.filter((a) => a._id !== id);
        const nextDefault = remaining.find((a) => a.isDefault) || remaining[0];
        if (nextDefault) {
          setSelectedId(nextDefault._id);
          onSelectAddress(nextDefault);
        }
      }
    } catch (err) {
      console.error("Failed to delete address", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    if (!/^\d{6}$/.test(pinCode)) {
      setError("Pin code must be exactly 6 digits");
      return;
    }

    try {
      const payload = { fullName, address, city, pinCode, phone, isDefault };

      if (editingId) {
        const response = await api.put(`/addresses/${editingId}`, payload);
        setAddresses((prev) =>
          prev.map((a) => (a._id === editingId ? response.data : a)),
        );
        handleSelect(response.data);
      } else {
        const response = await api.post("/addresses", payload);
        setAddresses((prev) => [...prev, response.data]);
        handleSelect(response.data);
      }

      resetForm();
      fetchAddresses();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to save address");
      } else {
        setError("Something went wrong");
      }
    }
  };

  if (loading) {
    return <p className="text-slate-400 text-sm">Loading addresses...</p>;
  }

  return (
    <div>
      {addresses.length > 0 && !showForm && (
        <div className="space-y-3 mb-4">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              onClick={() => handleSelect(addr)}
              className={`p-4 rounded-lg border cursor-pointer transition ${
                selectedId === addr._id
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-white/10 bg-[#0a0e17] hover:border-white/20"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-medium text-sm">
                      {addr.fullName}
                    </p>
                    {addr.isDefault && (
                      <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm">
                    {addr.address}, {addr.city} - {addr.pinCode}
                  </p>
                  <p className="text-slate-400 text-sm">{addr.phone}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(addr);
                    }}
                    className="text-blue-400 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(addr._id);
                    }}
                    className="text-red-400 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!showForm && (
        <button
          type="button"
          onClick={handleAddClick}
          className="text-purple-400 text-sm font-medium hover:underline mb-4"
        >
          + Add new address
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          {error && (
            <p className="bg-red-500/10 text-red-400 text-sm p-3 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full bg-[#0a0e17] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full bg-[#0a0e17] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full bg-[#0a0e17] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Pin Code"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              maxLength={6}
              required
              className="w-full bg-[#0a0e17] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
            required
            className="w-full bg-[#0a0e17] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="rounded"
            />
            Set as default address
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition"
            >
              {editingId ? "Update Address" : "Save Address"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="text-slate-400 text-sm hover:text-white transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddressSection;
