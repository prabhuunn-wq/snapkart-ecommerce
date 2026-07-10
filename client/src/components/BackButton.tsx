import { useNavigate, useLocation } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hiddenPaths = ["/", "/login", "/register"];
  if (hiddenPaths.includes(location.pathname)) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-4">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-300 text-sm px-4 py-2 rounded-full transition hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:border-transparent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Back to page
      </button>
    </div>
  );
};

export default BackButton;
