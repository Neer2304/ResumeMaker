"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiArrowRight } from "react-icons/fi";
import Image from "next/image";

interface ProjectsProps {
  mode: "light" | "dark";
}

const Projects: React.FC<ProjectsProps> = ({ mode }) => {
  const projects = [
    {
      title: "Grocery Admin Panel",
      description: "A scalable admin dashboard for grocery management with real-time analytics, product management, and order tracking system.",
      image: "/assets/dashboard.png",
      technologies: ["Next.js", "TypeScript", "Tailwind", "GraphQL", "Redux"],
      github: "https://github.com/Neer2304",
      live: "#",
      featured: true,
    },
    {
      title: "AccuManage",
      description: "Serverless inventory management system with automated billing, stock tracking, and real-time analytics.",
      image: "/assets/amdash.png",
      technologies: ["Next.js", "MongoDB", "Node.js", "AWS", "REST APIs"],
      github: "https://github.com/Neer2304",
      live: "#",
      featured: true,
    },
    {
      title: "Resume Maker",
      description: "User-friendly resume builder with customizable templates and PDF export functionality.",
      image: "/assets/resumemaker.png",
      technologies: ["React", "JavaScript", "Tailwind", "PDF Generation"],
      github: "https://github.com/Neer2304",
      live: "#",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Fixed animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are some of the projects I've worked on, showcasing my skills in modern web development.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}

                {/* Overlay Links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
                  >
                    <FiGithub className="w-5 h-5 text-gray-800" />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
                  >
                    <FiExternalLink className="w-5 h-5 text-gray-800" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
                  >
                    <FiGithub className="w-4 h-4" />
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 text-sm font-medium"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Neer2304"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors duration-200 font-medium"
          >
            <FiGithub className="w-5 h-5" />
            View All Projects
            <FiArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;