
import { useEffect, useState, useRef, memo } from "react";

const BlobBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const mousePosRef = useRef({ x: 0, y: 0 });
  const throttleTimeRef = useRef(100); // Throttle rate in ms

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: e.clientX / 100,
        y: e.clientY / 100
      };
    };

    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        if (deltaTime > throttleTimeRef.current) {
          setMousePosition(mousePosRef.current);
          previousTimeRef.current = time;
          
          // Dynamically adjust throttle rate based on performance
          const fps = 1000 / deltaTime;
          throttleTimeRef.current = fps < 30 ? 150 : 100; // Increase throttle if FPS drops
        }
      } else {
        previousTimeRef.current = time;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    // Passive event listener for better scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      <div 
        className="absolute top-[-10%] left-[-10%] w-[900px] h-[900px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] mix-blend-screen opacity-80 will-change-transform"
        style={{
          background: `linear-gradient(45deg, hsl(var(--blob-color-1)) 0%, hsl(var(--blob-color-2)) 100%)`,
          filter: 'blur(50px) saturate(150%)',
          transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)`,
        }}
      />
      <div 
        className="absolute top-[0%] right-[-10%] w-[850px] h-[850px] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] mix-blend-screen opacity-80 will-change-transform"
        style={{
          background: `linear-gradient(135deg, hsl(var(--blob-color-2)) 0%, hsl(var(--blob-color-3)) 100%)`,
          filter: 'blur(50px) saturate(150%)',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y * -1}px)`,
          animationDelay: '1s',
        }}
      />
      <div 
        className="absolute bottom-[0%] left-[-5%] w-[800px] h-[800px] rounded-[40%_60%_60%_40%/70%_30%_50%_60%] mix-blend-screen opacity-80 will-change-transform"
        style={{
          background: `linear-gradient(225deg, hsl(var(--blob-color-3)) 0%, hsl(var(--blob-color-4)) 100%)`,
          filter: 'blur(50px) saturate(150%)',
          transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y}px)`,
          animationDelay: '2s',
        }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-5%] w-[750px] h-[750px] rounded-[60%_40%_40%_60%/40%_60%_40%_60%] mix-blend-screen opacity-80 will-change-transform"
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

// Memoize component to prevent unnecessary re-renders
export default memo(BlobBackground);
