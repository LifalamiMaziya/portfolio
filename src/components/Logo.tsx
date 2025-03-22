
import { Link } from "react-router-dom";
import { memo } from "react";

const Logo = () => {
  return <Link to="/" className="flex items-center gap-1 transition-transform duration-300 hover:scale-105">
      <div className="w-10 h-10 relative">
        <img 
          alt="Maziya Logo" 
          className="w-full h-full object-contain" 
          src="/lovable-uploads/76229fb7-e19f-416a-a6f7-d80213e2ba6e.png" 
          width="40"
          height="40"
          loading="eager"
        />
      </div>
      <span className="font-rajdhani font-bold text-2xl tracking-wide">Maziya</span>
    </Link>;
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Logo);
