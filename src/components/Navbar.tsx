
import { useState, useEffect } from "react";
import Logo from "./Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "Projects", "Skills", "About", "Contact"].map((item, idx) => (
              <a 
                key={idx} 
                href={`#${item.toLowerCase()}`}
                className="text-foreground/80 hover:text-foreground py-2 link-underline transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="flex flex-col justify-between w-7 h-5 md:hidden focus:outline-none z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span 
              className={`w-full h-0.5 bg-foreground transition-all duration-300 ${
                isMenuOpen ? "transform rotate-45 translate-y-2" : ""
              }`}
            />
            <span 
              className={`w-full h-0.5 bg-foreground transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span 
              className={`w-full h-0.5 bg-foreground transition-all duration-300 ${
                isMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>

          {/* Mobile Menu */}
          <div 
            className={`fixed inset-0 bg-background/90 backdrop-blur-lg flex flex-col items-center justify-center z-40 transition-transform duration-500 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:hidden`}
          >
            <div className="flex flex-col items-center space-y-8">
              {["Home", "Projects", "Skills", "About", "Contact"].map((item, idx) => (
                <a 
                  key={idx} 
                  href={`#${item.toLowerCase()}`}
                  className="text-2xl font-medium text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.body.style.overflow = "auto";
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
