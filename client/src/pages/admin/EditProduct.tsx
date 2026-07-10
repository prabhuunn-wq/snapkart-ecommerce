import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        const product = response.data;
        setName(product.name);
        setDescription(product.description);
        setPrice(String(product.price));
        setCategory(product.category);
        setBrand(product.brand);
        setStock(String(product.stock));
        setImage(product.image);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api.put(`/products/${id}`, {
        name,
        description,
        price: Number(price),
        category,
        brand,
        stock: Number(stock),
        image,
      });
      navigate("/admin");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to update product");
      } else {
        setError("Something went wrong");
      }
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-white">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-lg mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-slate-700 bg-slate-900 p-2 rounded text-white"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-slate-700 bg-slate-900 p-2 rounded text-white"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-slate-700 bg-slate-900 p-2 rounded text-white"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-slate-700 bg-slate-900 p-2 rounded text-white"
            required
          />
          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border border-slate-700 bg-slate-900 p-2 rounded text-white"
            required
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border border-slate-700 bg-slate-900 p-2 rounded text-white"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border border-slate-700 bg-slate-900 p-2 rounded text-white"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded hover:opacity-90"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
