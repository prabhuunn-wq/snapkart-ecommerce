import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      login(response.data);
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0e17]">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center px-16 overflow-hidden">
        {/* glow orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <span className="text-3xl font-extrabold tracking-tight">
            <span className="text-white">Snap</span>
            <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Kart
            </span>
          </span>

          <h2 className="text-4xl font-extrabold text-white mt-8 mb-4 leading-tight">
            Welcome back to <br />
            <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              smarter shopping.
            </span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-sm">
            Sign in to track orders, manage your wishlist, and pick up right
            where you left off.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-linear-to-r from-purple-400 to-blue-400" />
              <span className="text-slate-300 text-sm">
                Free delivery on orders over ₹499
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-linear-to-r from-purple-400 to-blue-400" />
              <span className="text-slate-300 text-sm">
                100% secure payments
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-linear-to-r from-purple-400 to-blue-400" />
              <span className="text-slate-300 text-sm">
                24/7 dedicated support
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-16 relative">
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl lg:hidden" />

        <div className="max-w-sm w-full mx-auto relative z-10">
          <div className="mb-8 lg:hidden text-center">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-white">Snap</span>
              <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Kart
              </span>
            </span>
          </div>

          <div className="bg-[#111827] border border-white/10 rounded-2xl p-8 shadow-xl">
            <h1 className="text-2xl font-bold text-white mb-1">Sign in</h1>
            <p className="text-slate-400 text-sm mb-6">
              Welcome back! Enter your details below
            </p>

            {error && (
              <p className="bg-red-500/10 text-red-400 text-sm p-3 rounded-lg mb-4 border border-red-500/20">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#0a0e17] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#0a0e17] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-purple-600 to-blue-600 text-white py-2.5 rounded-lg hover:opacity-90 transition font-medium text-sm shadow-lg shadow-purple-600/20"
              >
                Sign in
              </button>
            </form>

            <p className="text-center text-sm text-slate-400 mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
