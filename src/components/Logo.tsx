
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-1 transition-transform duration-300 hover:scale-105"
    >
      <div className="w-10 h-10 relative">
        <img 
          src="/lovable-uploads/52a095fd-36b5-4d5e-9cfa-6adcca285cb4.png" 
          alt="Maziya Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <span className="font-rajdhani font-bold text-2xl tracking-wide">Maziya</span>
    </Link>
  );
};

export default Logo;
