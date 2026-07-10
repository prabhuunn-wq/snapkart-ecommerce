import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Search, User, LogOut, Heart, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [bump, setBump] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleBump = () => {
      setBump(true);
      setTimeout(() => setBump(false), 400);
    };
    window.addEventListener("cart-bump", handleBump);
    return () => window.removeEventListener("cart-bump", handleBump);
  }, []);

  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowMobileSearch(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Deals", path: "/deals" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Brands", path: "/brands" },
  ];

  return (
    <nav className="bg-[#0a0e17] border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <button
          onClick={() => setShowMobileMenu((prev) => !prev)}
          className="md:hidden text-slate-400 hover:text-purple-400 transition"
        >
          {showMobileMenu ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="whitespace-nowrap">
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-white">Snap</span>
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Kart
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={
                location.pathname === link.path
                  ? "text-white font-semibold"
                  : "text-slate-400 hover:text-purple-400 transition"
              }
            >
              {link.name}
            </Link>
          ))}

          {user?.role === "delivery" && (
            <Link
              to="/delivery"
              className={
                location.pathname === "/delivery"
                  ? "text-white font-semibold"
                  : "text-slate-400 hover:text-purple-400 transition"
              }
            >
              Deliveries
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className={
                location.pathname.startsWith("/admin")
                  ? "text-white font-semibold"
                  : "text-slate-400 hover:text-purple-400 transition"
              }
            >
              Admin
            </Link>
          )}
        </div>

        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-md relative hidden lg:block"
        >
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            type="search"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111827] border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
        </form>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setShowMobileSearch((prev) => !prev)}
            className="lg:hidden text-slate-400 hover:text-purple-400 transition"
          >
            <Search size={20} />
          </button>

          <Link
            to="/wishlist"
            className="relative text-slate-400 hover:text-purple-400 transition"
          >
            <Heart size={20} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link
            id="navbar-cart-icon"
            to="/cart"
            className={`relative text-slate-400 hover:text-purple-400 transition ${
              bump ? "scale-125" : "scale-100"
            }`}
            style={{ transition: "transform 0.3s ease" }}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-200 hidden sm:inline">
                Hi, {user.name}
              </span>
              <Link
                to="/profile"
                className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold hover:opacity-80 transition"
              >
                {user.name?.charAt(0).toUpperCase()}
              </Link>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-400 transition"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-slate-300 hover:text-purple-400 transition"
            >
              <User size={20} />
              <span className="text-sm font-medium hidden sm:inline">
                Login
              </span>
            </Link>
          )}
        </div>
      </div>

      {showMobileSearch && (
        <div className="lg:hidden px-6 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="search"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full bg-[#111827] border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </form>
        </div>
      )}

      {showMobileMenu && (
        <div className="md:hidden border-t border-white/10 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block text-sm ${
                location.pathname === link.path
                  ? "text-white font-semibold"
                  : "text-slate-400 hover:text-purple-400 transition"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user?.role === "delivery" && (
            <Link
              to="/delivery"
              className={`block text-sm ${
                location.pathname === "/delivery"
                  ? "text-white font-semibold"
                  : "text-slate-400 hover:text-purple-400 transition"
              }`}
            >
              Deliveries
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className={`block text-sm ${
                location.pathname.startsWith("/admin")
                  ? "text-white font-semibold"
                  : "text-slate-400 hover:text-purple-400 transition"
              }`}
            >
              Admin
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;