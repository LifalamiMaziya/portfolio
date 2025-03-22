
import { memo } from "react";
import { Link } from "react-router-dom";
import ScrollObserver from "./ScrollObserver";

const projects = [
  {
    id: 1,
    slug: "mpumalanga-tourism",
    title: "Mpumalanga Tourism Portal",
    description: "A comprehensive tourism portal showcasing Mpumalanga's attractions, activities, and accommodation options. Features interactive maps and booking integrations.",
    image: "/lovable-uploads/299dacbe-b255-4d0c-bb44-28f67d37df70.png",
    technologies: ["React", "Node.js", "MongoDB", "Mapbox API"],
    demoLink: "https://example.com/mpumalanga-demo",
    codeLink: "https://github.com/maziya/mpumalanga-tourism"
  },
  {
    id: 2,
    slug: "agriconnect",
    title: "AgriConnect Platform",
    description: "A digital marketplace connecting farmers with buyers, featuring inventory management, real-time market prices, and logistics tracking.",
    image: "/lovable-uploads/41274f22-c22c-466c-942d-d9f7e3395c02.png",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
    demoLink: "https://example.com/agriconnect-demo",
    codeLink: "https://github.com/maziya/agriconnect"
  },
  {
    id: 3,
    slug: "ndebele-medical",
    title: "Ndebele Medical Center",
    description: "A comprehensive healthcare management system for a medical facility, featuring appointment scheduling, patient records, and telehealth capabilities.",
    image: "/lovable-uploads/aabeb587-a95a-4a26-bef2-25ad93622b5c.png",
    technologies: ["React", "Firebase", "Tailwind CSS", "Stripe API"],
    demoLink: "https://example.com/ndebele-demo",
    codeLink: "https://github.com/maziya/ndebele-medical"
  }
];

const ProjectCard = memo(({ project, index }: { project: typeof projects[0], index: number }) => {
  return (
    <ScrollObserver
      delayMs={index * 100}
      animateFrom="bottom"
      className="h-full"
    >
      <div className="bg-card rounded-xl overflow-hidden shadow-lg h-full transition-transform duration-500 hover:shadow-xl hover:translate-y-[-8px]">
        <Link to={`/project/${project.slug}`} className="h-64 overflow-hidden block">
          <img 
            src={project.image} 
            alt={project.title} 
            loading={index <= 1 ? "eager" : "lazy"}
            className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
          />
        </Link>
        <div className="p-6">
          <Link to={`/project/${project.slug}`}>
            <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">{project.title}</h3>
          </Link>
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
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-white rounded-md text-sm transition-all hover:bg-primary/90"
            >
              View Demo
            </a>
            <a 
              href={project.codeLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 border border-primary text-primary rounded-md text-sm transition-all hover:bg-primary/10"
            >
              Source Code
            </a>
            <Link 
              to={`/project/${project.slug}`}
              className="px-4 py-2 border border-primary text-primary rounded-md text-sm transition-all hover:bg-primary/10 ml-auto"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </ScrollObserver>
  );
});

const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-6">
        <ScrollObserver>
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
              My Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Selected Projects
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Explore a selection of my recent work. Each project showcases my passion for creating elegant and functional digital solutions.
            </p>
          </div>
        </ScrollObserver>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Projects);
