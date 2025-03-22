
import { useRef, useEffect, useState, ReactNode } from 'react';

interface ScrollObserverProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  delayMs?: number;
  animateOnce?: boolean;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right';
}

const ScrollObserver = ({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '0px',
  delayMs = 0,
  animateOnce = true,
  animateFrom = 'bottom',
}: ScrollObserverProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animateFrom) {
        case 'bottom': return 'opacity-0 translate-y-8';
        case 'top': return 'opacity-0 -translate-y-8';
        case 'left': return 'opacity-0 -translate-x-8';
        case 'right': return 'opacity-0 translate-x-8';
        default: return 'opacity-0';
      }
    }
    return 'opacity-100 translate-x-0 translate-y-0';
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => {
            setIsVisible(true);
          }, delayMs);
          
          if (animateOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!entry.isIntersecting && !animateOnce) {
          setIsVisible(false);
        }
      },
      { 
        threshold, 
        rootMargin 
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, animateOnce, delayMs]);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ${getAnimationClass()}`}
    >
      {children}
    </div>
  );
};

export default ScrollObserver;
