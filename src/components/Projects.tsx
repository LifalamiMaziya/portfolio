
import { useState, useRef, useEffect } from "react";

const projects = [
  {
    id: 1,
    title: "Mpumalanga Tourism Portal",
    description: "A comprehensive tourism portal showcasing Mpumalanga's attractions, activities, and accommodation options. Features interactive maps and booking integrations.",
    image: "/lovable-uploads/299dacbe-b255-4d0c-bb44-28f67d37df70.png",
    technologies: ["React", "Node.js", "MongoDB", "Mapbox API"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 2,
    title: "AgriConnect Platform",
    description: "A digital marketplace connecting farmers with buyers, featuring inventory management, real-time market prices, and logistics tracking.",
    image: "/lovable-uploads/41274f22-c22c-466c-942d-d9f7e3395c02.png",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 3,
    title: "Ndebele Medical Center",
    description: "A comprehensive healthcare management system for a medical facility, featuring appointment scheduling, patient records, and telehealth capabilities.",
    image: "/lovable-uploads/aabeb587-a95a-4a26-bef2-25ad93622b5c.png",
    technologies: ["React", "Firebase", "Tailwind CSS", "Stripe API"],
    demoLink: "#",
    codeLink: "#"
  }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`bg-card rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:translate-y-[-8px] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-foreground/70 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <a 
            href={project.demoLink} 
            className="px-4 py-2 bg-primary text-white rounded-md text-sm transition-all hover:bg-primary/90"
          >
            View Project
          </a>
          <a 
            href={project.codeLink} 
            className="px-4 py-2 border border-primary text-primary rounded-md text-sm transition-all hover:bg-primary/10"
          >
            Source Code
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
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
    <section id="projects" className="section-padding" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className={`inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}>
            My Portfolio
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`} style={{ transitionDelay: "0.1s" }}>
            Selected Projects
          </h2>
          <p className={`text-foreground/70 max-w-2xl mx-auto transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`} style={{ transitionDelay: "0.2s" }}>
            Explore a selection of my recent work. Each project showcases my passion for creating elegant and functional digital solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
