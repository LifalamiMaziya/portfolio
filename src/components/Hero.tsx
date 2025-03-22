
import { useState, useEffect } from "react";

const titles = ["Developer", "Problem Solver", "UI/UX Designer", "Full-Stack Engineer"];

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingDelay, setTypingDelay] = useState(150);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    
    const typeEffect = () => {
      if (!isDeleting && displayedTitle === currentTitle) {
        // Pause at the end of typing
        setTimeout(() => setIsDeleting(true), 1500);
        return;
      }
      
      if (isDeleting && displayedTitle === "") {
        // Move to next title
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
        setTypingDelay(150);
        return;
      }
      
      const delta = isDeleting ? 100 : typingDelay;
      
      setTimeout(() => {
        setDisplayedTitle(prev => 
          isDeleting 
            ? prev.substring(0, prev.length - 1)
            : currentTitle.substring(0, prev.length + 1)
        );
      }, delta);
    };
    
    const timer = setTimeout(typeEffect, typingDelay);
    return () => clearTimeout(timer);
  }, [displayedTitle, isDeleting, titleIndex, typingDelay]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 max-w-2xl">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
              Hi there, I'm Maziya
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Lifalami Maziya
            </h1>
            <div className="h-12 mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-primary animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <span className="relative">
                  {displayedTitle}
                  <span className="absolute right-[-4px] top-0 h-full w-[2px] bg-primary animate-pulse"></span>
                </span>
              </h2>
            </div>
            <p className="text-lg text-foreground/80 mb-8 max-w-xl animate-fade-in" style={{ animationDelay: "0.3s" }}>
              I design and develop elegant, efficient web applications and digital solutions. Let's turn your vision into reality and create exceptional digital experiences.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <a 
                href="#projects" 
                className="px-6 py-3 bg-primary text-white rounded-md transition-all hover:translate-y-[-3px] hover:shadow-lg"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 border-2 border-primary text-primary rounded-md transition-all hover:bg-primary hover:text-white hover:translate-y-[-3px] hover:shadow-lg"
              >
                Contact Me
              </a>
            </div>
          </div>
          <div className="flex-1 max-w-md flex justify-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent animate-pulse"></div>
              <img 
                src="/lovable-uploads/1d840d5d-31eb-418c-8d58-ff2472547c34.png" 
                alt="Lifalami Maziya" 
                className="relative w-full h-full object-cover rounded-full shadow-xl border-4 border-white/20 backdrop-blur-sm transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
