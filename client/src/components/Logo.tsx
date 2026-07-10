import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 whitespace-nowrap">
      <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
        <ShoppingBag size={16} className="text-white" strokeWidth={2.5} />
      </div>

      
     
    </Link>
  );
};

export default Logo;