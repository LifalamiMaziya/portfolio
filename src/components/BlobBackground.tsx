
import { useEffect, useState } from "react";

const BlobBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Slow down the movement by dividing by a larger number
      setMousePosition({
        x: e.clientX / 100,
        y: e.clientY / 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      <div 
        className="absolute top-[-10%] left-[-10%] w-[900px] h-[900px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] mix-blend-screen opacity-80 animate-blob-1"
        style={{
          background: `linear-gradient(45deg, hsl(var(--blob-color-1)) 0%, hsl(var(--blob-color-2)) 100%)`,
          filter: 'blur(50px) saturate(150%)',
          transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)`,
        }}
      />
      <div 
        className="absolute top-[0%] right-[-10%] w-[850px] h-[850px] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] mix-blend-screen opacity-80 animate-blob-2"
        style={{
          background: `linear-gradient(135deg, hsl(var(--blob-color-2)) 0%, hsl(var(--blob-color-3)) 100%)`,
          filter: 'blur(50px) saturate(150%)',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y * -1}px)`,
          animationDelay: '1s',
        }}
      />
      <div 
        className="absolute bottom-[0%] left-[-5%] w-[800px] h-[800px] rounded-[40%_60%_60%_40%/70%_30%_50%_60%] mix-blend-screen opacity-80 animate-blob-3"
        style={{
          background: `linear-gradient(225deg, hsl(var(--blob-color-3)) 0%, hsl(var(--blob-color-4)) 100%)`,
          filter: 'blur(50px) saturate(150%)',
          transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y}px)`,
          animationDelay: '2s',
        }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-5%] w-[750px] h-[750px] rounded-[60%_40%_40%_60%/40%_60%_40%_60%] mix-blend-screen opacity-80 animate-blob-4"
        style={{
          background: `linear-gradient(315deg, hsl(var(--blob-color-4)) 0%, hsl(var(--blob-color-1)) 100%)`,
          filter: 'blur(50px) saturate(150%)',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          animationDelay: '3s',
        }}
      />
      <div className="absolute inset-0 backdrop-blur-[2px] bg-background/50" />
    </div>
  );
};

export default BlobBackground;
