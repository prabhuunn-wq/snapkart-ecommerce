import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="max-w-lg mx-auto px-6 py-24 text-center">
      <h1 className="text-7xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
        404
      </h1>
      <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
      <p className="text-slate-400 mb-8">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition"
      >
        <Home size={18} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;