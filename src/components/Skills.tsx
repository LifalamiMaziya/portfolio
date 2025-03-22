
import { memo } from "react";
import ScrollObserver from "./ScrollObserver";

type SkillCategory = {
  title: string;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      "HTML5, CSS3, JavaScript/ES6+",
      "React.js, Vue.js",
      "TypeScript",
      "Responsive Design",
      "CSS Frameworks (Tailwind, Bootstrap)",
      "Animation Libraries"
    ]
  },
  {
    title: "Backend",
    skills: [
      "Node.js, Express",
      "RESTful API Development",
      "MongoDB, PostgreSQL",
      "Firebase",
      "Authentication & Authorization",
      "Server Architecture & Deployment"
    ]
  },
  {
    title: "Development Tools",
    skills: [
      "Git, GitHub",
      "VS Code",
      "CI/CD Pipelines",
      "Webpack, Vite",
      "ESLint, Prettier",
      "Terminal/CLI"
    ]
  },
  {
    title: "Professional Skills",
    skills: [
      "Agile Methodology",
      "Problem Solving",
      "Technical Documentation",
      "Project Management",
      "Functional Programming",
      "Performance Optimization"
    ]
  }
];

const SkillCard = memo(({ category, index }: { category: SkillCategory, index: number }) => {
  return (
    <ScrollObserver delayMs={index * 100} animateFrom={index % 2 === 0 ? "left" : "right"}>
      <div className="bg-card rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-border relative">
          {category.title}
          <span className="absolute bottom-[-1px] left-0 w-16 h-[2px] bg-primary"></span>
        </h3>
        <ul className="space-y-2">
          {category.skills.map((skill, idx) => (
            <li key={idx} className="flex items-start">
              <span className="inline-block w-2 h-2 mt-[0.45rem] mr-2 bg-primary rounded-full"></span>
              <span className="text-foreground/80">{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </ScrollObserver>
  );
});

const Skills = () => {
  return (
    <section id="skills" className="section-padding bg-secondary/50">
      <div className="container mx-auto px-6">
        <ScrollObserver>
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
              My Expertise
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Skills & Expertise
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              A versatile skill set that enables me to deliver exceptional digital solutions across the full development stack.
            </p>
          </div>
        </ScrollObserver>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <SkillCard key={idx} category={category} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Skills);
