"use client";

import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar, FiCode } from "react-icons/fi";

interface ExperienceProps {
  mode: "light" | "dark";
}

const Experience: React.FC<ExperienceProps> = ({ mode }) => {
  const experiences = [
    {
      title: "Full-Stack Developer",
      company: "Freelance & Personal Projects",
      period: "2024 - Present",
      description: "Developing scalable web applications using Next.js, React, and TypeScript. Built admin panels, SaaS dashboards, and inventory management systems with modern tech stacks.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux Toolkit", "MongoDB", "Node.js"],
      icon: FiCode,
    },
    {
      title: "Frontend Developer",
      company: "Internship",
      period: "2024 - 2025",
      description: "Built responsive UIs with React and Tailwind CSS, and implemented REST API integrations.",
      technologies: ["React", "JavaScript", "CSS3", "REST APIs", "Git", "Responsive Design"],
      icon: FiBriefcase,
    },
    {
      title: "Computer Science Student",
      company: "GH Patel College of Engineering & Technology",
      period: "2021 - 2025",
      description: "Completed B.Tech in Computer Science (Internet of Things). Gained foundation in programming, algorithms, data structures, and web development principles.",
      technologies: ["C++", "Java", "Python", "Data Structures", "Algorithms", "Web Development"],
      icon: FiCalendar,
    },
  ];

  return (
    <section id="experience" className="py-20 lg:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-4">
            Experience & Education
          </h2>
          <p className={`text-lg lg:text-xl max-w-3xl mx-auto ${
            mode === "light" ? "text-slate-600" : "text-slate-300"
          }`}>
            My journey through education and professional development in tech
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 ${
            mode === "light" ? "bg-slate-200" : "bg-slate-700"
          }`}></div>

          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-start mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transform -translate-x-1/2 z-10 border-4 border-white dark:border-slate-900"></div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`p-6 rounded-2xl border transition-all duration-300 ${
                      mode === "light" 
                        ? "bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg" 
                        : "bg-slate-800 border-slate-700 hover:border-blue-500 hover:shadow-xl"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold mb-1 ${
                          mode === "light" ? "text-slate-800" : "text-slate-100"
                        }`}>
                          {exp.title}
                        </h3>
                        <p className="text-blue-500 font-semibold">{exp.company}</p>
                      </div>
                    </div>

                    {/* Period */}
                    <div className="flex items-center gap-2 mb-4">
                      <FiCalendar className={`w-4 h-4 ${
                        mode === "light" ? "text-slate-500" : "text-slate-400"
                      }`} />
                      <span className={`text-sm font-medium ${
                        mode === "light" ? "text-slate-600" : "text-slate-300"
                      }`}>
                        {exp.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className={`mb-4 leading-relaxed ${
                      mode === "light" ? "text-slate-600" : "text-slate-300"
                    }`}>
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                          viewport={{ once: true }}
                          className={`px-3 py-1 rounded-lg text-xs font-medium ${
                            mode === "light" 
                              ? "bg-slate-100 text-slate-700" 
                              : "bg-slate-700 text-slate-200"
                          }`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;