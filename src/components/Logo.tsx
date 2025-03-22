import { Link } from "react-router-dom";
const Logo = () => {
  return <Link to="/" className="flex items-center gap-1 transition-transform duration-300 hover:scale-105">
      <div className="w-10 h-10 relative">
        <img alt="Maziya Logo" className="w-full h-full object-contain" src="/lovable-uploads/76229fb7-e19f-416a-a6f7-d80213e2ba6e.png" />
      </div>
      <span className="font-rajdhani font-bold text-2xl tracking-wide">Maziya</span>
    </Link>;
};
export default Logo;