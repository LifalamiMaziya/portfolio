import { useRef, useState, useEffect } from "react";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="section-padding" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className={`inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}>
            About Me
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`} style={{ transitionDelay: "0.1s" }}>
            Who I Am & What I Do
          </h2>
          <p className={`text-foreground/70 max-w-2xl mx-auto transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`} style={{ transitionDelay: "0.2s" }}>
            Passionate web developer focused on creating powerful, user-centered digital experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`} style={{ transitionDelay: "0.3s" }}>
            <div className="aspect-square rounded-2xl overflow-hidden bg-primary/10 relative">
              <img 
                src="/assets/images/profile.jpg" 
                alt="Lifalami Maziya" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  // Display a fallback div with initials if image fails to load
                  const target = e.currentTarget.parentElement;
                  if (target) {
                    const fallback = document.createElement('div');
                    fallback.className = 'w-full h-full flex items-center justify-center text-6xl font-bold text-primary';
                    fallback.textContent = 'LM';
                    target.appendChild(fallback);
                  }
                }}
              />
            </div>
          </div>
          
          <div className={`space-y-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`} style={{ transitionDelay: "0.5s" }}>
            <div>
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-foreground/70">
                With over 5 years of experience in web development, I've had the privilege of working on diverse projects across various industries. My journey began with a passion for creating intuitive user interfaces and has evolved into developing comprehensive web solutions that solve real-world problems.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4">My Approach</h3>
              <p className="text-foreground/70">
                I believe in a user-centered approach to development, ensuring that every project is not just visually appealing but also functional and accessible. My development process is collaborative, transparent, and focused on achieving business objectives while delivering an exceptional user experience.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4">Outside of Coding</h3>
              <p className="text-foreground/70">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or enjoying outdoor activities. I'm passionate about continuous learning and regularly participate in tech communities and conferences to stay updated with industry trends.
              </p>
            </div>
            
            <div className="pt-4">
              <a 
                href="#contact" 
                className="inline-flex items-center px-6 py-3 bg-primary text-white dark:bg-secondary dark:text-secondary-foreground rounded-md transition-all hover:bg-primary/90 dark:hover:bg-secondary/80 hover:shadow-lg"
              >
                Get in Touch
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 