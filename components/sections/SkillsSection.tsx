"use client";

import { motion } from "framer-motion";
import { 
  FaReact, 
  FaJs, 
  FaGitAlt, 
  FaNodeJs 
} from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiMongodb,
  SiRedux,
  SiGraphql,
  SiFirebase,
  SiExpress
} from "react-icons/si";

interface SkillsProps {
  mode: "light" | "dark";
}

const Skills: React.FC<SkillsProps> = ({ mode }) => {
  const techStack = [
    { name: "React", icon: FaReact, color: "#61DAFB", level: 90 },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000", level: 85 },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 80 },
    { name: "JavaScript", icon: FaJs, color: "#F7DF1E", level: 88 },
    { name: "Tailwind", icon: SiTailwindcss, color: "#38BDF8", level: 85 },
    { name: "Redux", icon: SiRedux, color: "#764ABC", level: 80 },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 70 },
    { name: "Git", icon: FaGitAlt, color: "#F05032", level: 83 },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28", level: 70 },
  ];

  return (
    <section id="skills" className="py-12 lg:py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gradient mb-2">
            Skills
          </h2>
          <p className={`text-sm lg:text-base ${
            mode === "light" ? "text-slate-600" : "text-slate-300"
          }`}>
            Technologies I work with
          </p>
        </motion.div>

        {/* Ultra Compact Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 mb-8"
        >
          {techStack.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className={`group relative p-2 rounded-lg border transition-all duration-200 cursor-help ${
                  mode === "light" 
                    ? "bg-white border-slate-200 hover:border-blue-300" 
                    : "bg-slate-800 border-slate-700 hover:border-blue-500"
                }`}
                title={`${tech.name} - ${tech.level}%`}
              >
                <div className="flex flex-col items-center">
                  <Icon 
                    className="w-5 h-5 mb-1" 
                    style={{ color: tech.color }}
                  />
                  <span className={`text-xs font-medium ${
                    mode === "light" ? "text-slate-700" : "text-slate-200"
                  }`}>
                    {tech.name}
                  </span>
                </div>

                {/* Progress indicator - tiny dot */}
                <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full border-2 ${
                  mode === "light" ? "border-white" : "border-slate-900"
                }`}>
                  <div 
                    className="w-full h-full rounded-full"
                    style={{ 
                      backgroundColor: tech.level > 80 ? "#10B981" : 
                                     tech.level > 60 ? "#F59E0B" : "#EF4444"
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skill Levels Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-6 text-xs"
        >
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className={mode === "light" ? "text-slate-600" : "text-slate-300"}>Advanced</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className={mode === "light" ? "text-slate-600" : "text-slate-300"}>Intermediate</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className={mode === "light" ? "text-slate-600" : "text-slate-300"}>Learning</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;