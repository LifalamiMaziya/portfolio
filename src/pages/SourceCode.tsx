import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import BlobBackground from "../components/BlobBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowLeft, Download, Copy, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Project repository information
const repositories = {
  "mpumalanga-tourism": {
    name: "Mpumalanga Tourism Portal",
    repoUrl: "https://github.com/LifalamiMaziya/mpumalanga-tourism",
    files: [
      { name: "index.html", language: "html" },
      { name: "styles.css", language: "css" },
      { name: "main.js", language: "javascript" },
      { name: "README.md", language: "markdown" }
    ]
  },
  "agri-connect": {
    name: "AgriConnect Platform",
    repoUrl: "https://github.com/LifalamiMaziya/agri-connect",
    files: [
      { name: "index.html", language: "html" },
      { name: "styles.css", language: "css" },
      { name: "main.js", language: "javascript" },
      { name: "README.md", language: "markdown" }
    ]
  },
  "nelspruit-medical": {
    name: "Nelspruit Medical Center",
    repoUrl: "https://github.com/LifalamiMaziya/nelspruit-medical",
    files: [
      { name: "index.html", language: "html" },
      { name: "styles.css", language: "css" },
      { name: "main.js", language: "javascript" },
      { name: "README.md", language: "markdown" }
    ]
  }
};

// Sample code content for demonstration
const sampleCode = {
  "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Title</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <div class="logo">
        <img src="logo.png" alt="Logo">
      </div>
      <ul class="menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section id="hero">
      <h1>Welcome to our platform</h1>
      <p>Discover amazing features and services</p>
      <button>Get Started</button>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2023 Project Name. All rights reserved.</p>
  </footer>
  
  <script src="main.js"></script>
</body>
</html>`,

  "styles.css": `/* Base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Navigation */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.logo img {
  height: 40px;
}

.menu {
  display: flex;
  list-style: none;
}

.menu li {
  margin-left: 2rem;
}

.menu a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  transition: color 0.3s;
}

.menu a:hover {
  color: #0066cc;
}

/* Hero section */
#hero {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background-color: #f5f5f5;
}

#hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

#hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

button {
  padding: 0.8rem 2rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0052a3;
}

/* Footer */
footer {
  text-align: center;
  padding: 2rem;
  background-color: #333;
  color: white;
}`,

  "main.js": `// Main JavaScript file

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Document loaded and ready');
  
  // Initialize functionality
  initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
  // Add event listeners
  addEventListeners();
  
  // Any other initialization logic
  checkBrowserSupport();
}

/**
 * Add event listeners to interactive elements
 */
function addEventListeners() {
  const button = document.querySelector('#hero button');
  if (button) {
    button.addEventListener('click', () => {
      console.log('Get Started button clicked');
      showWelcomeMessage();
    });
  }
  
  // Mobile menu toggle (if exists)
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }
}

/**
 * Display a welcome message to the user
 */
function showWelcomeMessage() {
  alert('Welcome to our platform! We\'re glad you\'re here.');
}

/**
 * Toggle mobile menu for responsive design
 */
function toggleMobileMenu() {
  const menu = document.querySelector('.menu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

/**
 * Check browser compatibility for modern features
 */
function checkBrowserSupport() {
  const features = {
    localStorage: typeof localStorage !== 'undefined',
    flexbox: CSS.supports('display', 'flex'),
    grid: CSS.supports('display', 'grid'),
    es6: typeof Promise !== 'undefined'
  };
  
  console.log('Browser support:', features);
  
  // Notify about potential issues
  const unsupportedFeatures = Object.entries(features)
    .filter(([, supported]) => !supported)
    .map(([feature]) => feature);
    
  if (unsupportedFeatures.length > 0) {
    console.warn('Unsupported features:', unsupportedFeatures);
  }
}`,

  "README.md": `# Project Name

## Overview
This is a sample project demonstrating modern web development techniques and best practices.

## Features
- Responsive design
- Clean, semantic HTML
- Modern CSS with flexbox and grid
- Vanilla JavaScript with ES6+ features
- Optimized performance

## Getting Started
1. Clone the repository
2. Open index.html in your browser
3. Explore the project

## Structure
- index.html - Main HTML file
- styles.css - CSS styles
- main.js - JavaScript functionality

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
MIT License

## Contact
For questions or feedback, please reach out to example@example.com
`
};

const SourceCode = () => {
  const { slug } = useParams<{ slug: string }>();
  const [repoInfo, setRepoInfo] = useState<typeof repositories[keyof typeof repositories] | null>(null);
  const [currentFile, setCurrentFile] = useState("");
  const [code, setCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug && repositories[slug as keyof typeof repositories]) {
      const info = repositories[slug as keyof typeof repositories];
      setRepoInfo(info);
      setCurrentFile(info.files[0].name);
      
      // Simulate loading data
      setIsLoading(true);
      setTimeout(() => {
        setCode(sampleCode[info.files[0].name as keyof typeof sampleCode] || "// No code available");
        setIsLoading(false);
      }, 300);
    } else {
      setRepoInfo(null);
      setCurrentFile("");
      setCode("");
      setIsLoading(false);
    }
  }, [slug]);

  const handleFileChange = (fileName: string) => {
    setCurrentFile(fileName);
    
    // Simulate loading file content
    setIsLoading(true);
    setTimeout(() => {
      setCode(sampleCode[fileName as keyof typeof sampleCode] || "// No code available");
      setIsLoading(false);
    }, 200);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getFileLanguage = () => {
    if (!repoInfo) return "javascript";
    const file = repoInfo.files.find(f => f.name === currentFile);
    return file ? file.language : "javascript";
  };

  if (!repoInfo) {
    return (
      <div className="min-h-screen relative">
        <BlobBackground />
        <Navbar />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Repository Not Found</h2>
            <p className="mb-8">Sorry, we couldn't find the project repository you're looking for.</p>
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
        <Link to={`/project/${slug}`} className="inline-flex items-center gap-2 text-primary hover:underline mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Project Details
        </Link>
        
        <div className="bg-card rounded-xl shadow-lg overflow-hidden mb-10">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileText size={24} className="text-primary" />
              {repoInfo.name} Source Code
            </h1>
            <p className="text-foreground/70 mt-2">
              Browse through the project files and explore the codebase
            </p>
          </div>

          <Tabs defaultValue={repoInfo.files[0].name} className="w-full">
            <div className="flex items-center justify-between p-2 bg-muted/50">
              <TabsList className="grid grid-flow-col auto-cols-max gap-2">
                {repoInfo.files.map((file) => (
                  <TabsTrigger
                    key={file.name}
                    value={file.name}
                    onClick={() => handleFileChange(file.name)}
                    className="px-4 py-2"
                  >
                    {file.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCopyCode}
                  disabled={isCopied}
                  className="text-xs"
                >
                  {isCopied ? (
                    <>
                      <Check size={14} className="mr-1" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="mr-1" /> Copy Code
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="text-xs"
                >
                  <a href={repoInfo.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Download size={14} className="mr-1" /> View on GitHub
                  </a>
                </Button>
              </div>
            </div>

            {repoInfo.files.map((file) => (
              <TabsContent key={file.name} value={file.name} className="p-0 m-0">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <div className="animate-pulse">Loading file content...</div>
                  </div>
                ) : (
                  <div className="max-h-[70vh] overflow-auto">
                    <SyntaxHighlighter
                      language={getFileLanguage()}
                      style={vscDarkPlus}
                      showLineNumbers
                      customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        fontSize: '14px',
                      }}
                    >
                      {code}
                    </SyntaxHighlighter>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SourceCode; 