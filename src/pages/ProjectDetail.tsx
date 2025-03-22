
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BlobBackground from "../components/BlobBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    slug: "mpumalanga-tourism",
    title: "Mpumalanga Tourism Portal",
    description: "A comprehensive tourism portal showcasing Mpumalanga's attractions, activities, and accommodation options. Features interactive maps and booking integrations.",
    fullDescription: `
      The Mpumalanga Tourism Portal was developed to promote tourism in the Mpumalanga province of South Africa. 
      This project aimed to create a centralized platform where tourists could discover local attractions, book accommodations, and plan their trips effectively.
      
      The portal features an interactive map integrating the Mapbox API that allows users to explore points of interest throughout the province. 
      Users can filter attractions by category (nature reserves, cultural sites, adventure activities) and save favorites to their itinerary.
      
      The booking system integrates with local businesses to provide real-time availability and secure payment processing.
      The backend is built on Node.js with MongoDB for flexible data storage, which has proven effective for managing diverse tourism data.
      
      This project has contributed to a 30% increase in online bookings for local tourism businesses since its launch.
    `,
    image: "/lovable-uploads/299dacbe-b255-4d0c-bb44-28f67d37df70.png",
    additionalImages: [
      "/lovable-uploads/299dacbe-b255-4d0c-bb44-28f67d37df70.png"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Mapbox API"],
    challenges: "Integrating multiple booking systems from different service providers presented significant challenges. We solved this by creating a standardized API adapter pattern.",
    results: "Increased tourism bookings by 30% within the first 6 months after launch. Improved user engagement with average session duration increasing from 2 to 5 minutes.",
    demoLink: "https://example.com/mpumalanga-demo",
    codeLink: "https://github.com/maziya/mpumalanga-tourism",
    year: "2023",
    client: "Mpumalanga Tourism Board"
  },
  {
    id: 2,
    slug: "agriconnect",
    title: "AgriConnect Platform",
    description: "A digital marketplace connecting farmers with buyers, featuring inventory management, real-time market prices, and logistics tracking.",
    fullDescription: `
      AgriConnect is a digital marketplace that bridges the gap between small-scale farmers and buyers across South Africa.
      
      Prior to this platform, small-scale farmers struggled to find reliable markets for their produce, often relying on intermediaries who reduced their profit margins.
      
      The platform features a sophisticated inventory management system that helps farmers track their produce from planting to market. 
      Real-time market price data, sourced from major agricultural markets, ensures fair pricing and transparency.
      
      A logistics tracking system connects farmers with affordable transportation providers, solving one of the biggest challenges for rural farmers.
      
      The application uses Vue.js for the frontend, providing a responsive and intuitive user interface accessible from both desktop and mobile devices.
      Express and PostgreSQL power the backend, ensuring reliable data management for transactions and user accounts.
    `,
    image: "/lovable-uploads/41274f22-c22c-466c-942d-d9f7e3395c02.png",
    additionalImages: [
      "/lovable-uploads/41274f22-c22c-466c-942d-d9f7e3395c02.png"
    ],
    technologies: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
    challenges: "Building trust between farmers and buyers was crucial. We implemented a comprehensive review and verification system to address this challenge.",
    results: "Connected over 500 small-scale farmers to new markets. Increased average farmer income by 25% through better pricing and reduced dependency on intermediaries.",
    demoLink: "https://example.com/agriconnect-demo",
    codeLink: "https://github.com/maziya/agriconnect",
    year: "2022",
    client: "Department of Agriculture"
  },
  {
    id: 3,
    slug: "ndebele-medical",
    title: "Ndebele Medical Center",
    description: "A comprehensive healthcare management system for a medical facility, featuring appointment scheduling, patient records, and telehealth capabilities.",
    fullDescription: `
      The Ndebele Medical Center application was developed for a growing healthcare facility in Limpopo, South Africa.
      
      This comprehensive healthcare management system modernized the facility's operations, transitioning from paper-based to digital record-keeping.
      
      Key features include a patient portal for appointment scheduling, secure electronic medical records, automated billing integration with medical aid providers, and telehealth capabilities for remote consultations.
      
      The application is built using React for a responsive and accessible frontend, with Firebase providing real-time database capabilities, authentication, and secure storage for patient records.
      
      Stripe API integration handles payment processing for self-paying patients, while WebRTC powers the telehealth consultation features.
      
      The system was designed with POPIA (Protection of Personal Information Act) compliance as a priority, implementing end-to-end encryption for sensitive patient data.
    `,
    image: "/lovable-uploads/aabeb587-a95a-4a26-bef2-25ad93622b5c.png",
    additionalImages: [
      "/lovable-uploads/aabeb587-a95a-4a26-bef2-25ad93622b5c.png"
    ],
    technologies: ["React", "Firebase", "Tailwind CSS", "Stripe API"],
    challenges: "Ensuring the security and privacy of patient data while maintaining high system performance and accessibility.",
    results: "Reduced administrative workload by 40%, decreased appointment no-shows by 60% through automated reminders, and enabled rural patients to access specialist consultations remotely.",
    demoLink: "https://example.com/ndebele-demo",
    codeLink: "https://github.com/maziya/ndebele-medical",
    year: "2023",
    client: "Ndebele Healthcare Group"
  }
];

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<typeof projects[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from an API
    setIsLoading(true);
    setTimeout(() => {
      const foundProject = projects.find(p => p.slug === slug);
      setProject(foundProject || null);
      setIsLoading(false);
    }, 300);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <BlobBackground />
        <Navbar />
        <div className="container mx-auto px-6 py-20 flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading project details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen relative">
        <BlobBackground />
        <Navbar />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Project Not Found</h2>
            <p className="mb-8">Sorry, we couldn't find the project you're looking for.</p>
            <Link to="/#projects" className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft size={16} /> Back to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <BlobBackground />
      <Navbar />
      <main className="container mx-auto px-6 py-20">
        <Link to="/#projects" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
            
            <div className="mb-8 aspect-video overflow-hidden rounded-xl">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
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
            
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              {project.fullDescription.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-3">Challenges</h3>
                <p>{project.challenges}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Results</h3>
                <p>{project.results}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  <ExternalLink size={16} /> View Live Demo
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  <Github size={16} /> View Source Code
                </a>
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-6 shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-6 pb-4 border-b">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground/70">Client</p>
                  <p className="font-medium">{project.client}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/70">Year</p>
                  <p className="font-medium">{project.year}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/70">Category</p>
                  <p className="font-medium">{
                    project.slug === "mpumalanga-tourism" ? "Tourism & Travel" :
                    project.slug === "agriconnect" ? "Agriculture & E-commerce" :
                    "Healthcare & Technology"
                  }</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
