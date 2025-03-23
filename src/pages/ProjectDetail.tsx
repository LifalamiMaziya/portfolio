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
    image: "/assets/images/projects/mpumalanga-tourism.png",
    additionalImages: [
      "/assets/images/projects/mpumalanga-tourism-detail1.png",
      "/assets/images/projects/mpumalanga-tourism-detail2.png"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Mapbox API"],
    challenges: "Integrating multiple booking systems from different service providers presented significant challenges. We solved this by creating a standardized API adapter pattern.",
    results: "Increased tourism bookings by 30% within the first 6 months after launch. Improved user engagement with average session duration increasing from 2 to 5 minutes.",
    demoLink: "/projects/mpumalanga-tourism/index.html",
    codeLink: "https://github.com/LifalamiMaziya/mpumalanga-tourism",
    year: "2023",
    client: "Mpumalanga Tourism Board"
  },
  {
    id: 2,
    slug: "agri-connect",
    title: "AgriConnect Platform",
    description: "A digital marketplace connecting farmers with buyers in Mpumalanga, featuring inventory management, real-time market prices, and logistics tracking.",
    fullDescription: `
      AgriConnect is a digital marketplace that bridges the gap between small-scale farmers and buyers across South Africa.
      
      Prior to this platform, small-scale farmers struggled to find reliable markets for their produce, often relying on intermediaries who reduced their profit margins.
      
      The platform features a sophisticated inventory management system that helps farmers track their produce from planting to market. 
      Real-time market price data, sourced from major agricultural markets, ensures fair pricing and transparency.
      
      A logistics tracking system connects farmers with affordable transportation providers, solving one of the biggest challenges for rural farmers.
      
      The application uses Vue.js for the frontend, providing a responsive and intuitive user interface accessible from both desktop and mobile devices.
      Express and PostgreSQL power the backend, ensuring reliable data management for transactions and user accounts.
    `,
    image: "/assets/images/projects/agri-connect.png",
    additionalImages: [
      "/assets/images/projects/agri-connect-detail1.png",
      "/assets/images/projects/agri-connect-detail2.png"
    ],
    technologies: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
    challenges: "Building trust between farmers and buyers was crucial. We implemented a comprehensive review and verification system to address this challenge.",
    results: "Connected over 500 small-scale farmers to new markets. Increased average farmer income by 25% through better pricing and reduced dependency on intermediaries.",
    demoLink: "/projects/agri-connect/index.html",
    codeLink: "https://github.com/LifalamiMaziya/agri-connect",
    year: "2022",
    client: "Department of Agriculture"
  },
  {
    id: 3,
    slug: "nelspruit-medical",
    title: "Nelspruit Medical Center",
    description: "A comprehensive healthcare management system for a local medical facility, featuring appointment scheduling, patient records, and telehealth capabilities.",
    fullDescription: `
      The Nelspruit Medical Center platform was developed to modernize healthcare delivery for a leading medical facility in Nelspruit, Mpumalanga.
      
      Before implementation, the facility relied on paper-based records and manual appointment scheduling, leading to inefficiencies and occasional errors.
      
      Our solution introduced a comprehensive digital healthcare management system featuring secure patient records, an intuitive appointment scheduling interface, and integrated telehealth capabilities.
      
      The patient portal allows for secure access to medical histories, test results, and prescription information. The scheduling system intelligently manages doctor availability and patient preferences.
      
      The telehealth module, particularly valuable during the COVID-19 pandemic, enables secure video consultations with end-to-end encryption.
      
      Built with React and Firebase, the application ensures real-time data synchronization and responsive design across all devices.
      
      Stripe integration enables secure payment processing for consultations and services, with support for medical aid claims through integrated APIs.
    `,
    image: "/assets/images/projects/nelspruit-medical.png",
    additionalImages: [
      "/assets/images/projects/nelspruit-medical-detail1.png",
      "/assets/images/projects/nelspruit-medical-detail2.png"
    ],
    technologies: ["React", "Firebase", "Tailwind CSS", "Stripe API"],
    challenges: "Ensuring patient data security and compliance with POPIA (Protection of Personal Information Act) regulations was paramount. We implemented comprehensive encryption and access controls.",
    results: "Reduced administrative workload by 40% and decreased appointment no-shows by 60% through automated reminders. Patient satisfaction scores increased from 75% to 92%.",
    demoLink: "/projects/nelspruit-medical/index.html",
    codeLink: "https://github.com/LifalamiMaziya/nelspruit-medical",
    year: "2023",
    client: "Nelspruit Medical Center"
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
                <Link to={`/source-code/${project.slug}`} className="inline-flex items-center gap-2">
                  <Github size={16} /> View Source Code
                </Link>
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
                    project.slug === "agri-connect" ? "Agriculture & E-commerce" :
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
