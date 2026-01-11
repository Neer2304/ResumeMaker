"use client";

import { motion } from "framer-motion";
import { FiAward, FiCode, FiCoffee, FiUser } from "react-icons/fi";

interface AboutProps {
  mode: "light" | "dark";
}

const About: React.FC<AboutProps> = ({ mode }) => {
  const stats = [
    { icon: FiCode, number: "5+", label: "Projects Completed" },
    { icon: FiAward, number: "1+", label: "Years Experience" },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-4">
            About Me
          </h2>
          <p className={`text-lg lg:text-xl max-w-3xl mx-auto ${
            mode === "light" ? "text-slate-600" : "text-slate-300"
          }`}>
            Passionate developer crafting digital experiences that make a difference
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className={`text-lg leading-relaxed px-px p-2 ${
                mode === "light" ? "text-slate-600" : "text-slate-300"
              }`}>
                Hello! I'm <span className="font-semibold text-blue-500">Neer Mehta</span>, a passionate 
                Full-Stack Developer with expertise in modern web technologies. I specialize in creating 
                responsive, performant, and user-friendly applications.
              </p>

              <p className={`text-lg leading-relaxed px-px p-2 ${
                mode === "light" ? "text-slate-600" : "text-slate-300"
              }`}>
                With a strong foundation in <span className="font-semibold text-green-500">React.js, Next.js, TypeScript</span>, 
                and <span className="font-semibold text-purple-500">Node.js</span>, I bring ideas to life through clean code 
                and innovative solutions.
              </p>

              <p className={`text-lg leading-relaxed px-px p-2 ${
                mode === "light" ? "text-slate-600" : "text-slate-300"
              }`}>
                I hold a B.Tech in Computer Science from GH Patel College of Engineering and Technology. 
                Fluent in Gujarati, Hindi, and English, I'm always learning new tools to deliver innovative solutions.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`p-2 rounded-2xl border text-center ${
                      mode === "light" 
                        ? "bg-white border-slate-200" 
                        : "bg-slate-800 border-slate-700"
                    }`}
                  >
                    <Icon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                      {stat.number}
                    </div>
                    <div className={`text-sm ${
                      mode === "light" ? "text-slate-600" : "text-slate-300"
                    }`}>
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Skills & Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Core Skills */}
            <div className={`p-6 rounded-2xl border mt-4 ${
              mode === "light" 
                ? "bg-white border-slate-200" 
                : "bg-slate-800 border-slate-700"
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${
                mode === "light" ? "text-slate-800" : "text-slate-100"
              }`}>
                Core Expertise
              </h3>
              <div className="space-y-3">
                {[
                  { skill: "Frontend Development", level: 95 },
                  { skill: "Backend Development", level: 85 },
                  { skill: "UI/UX Design", level: 80 },
                  { skill: "Problem Solving", level: 90 },
                ].map((item, index) => (
                  <div key={item.skill} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${
                        mode === "light" ? "text-slate-700" : "text-slate-200"
                      }`}>
                        {item.skill}
                      </span>
                      <span className="text-blue-500 font-bold">
                        {item.level}%
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${
                      mode === "light" ? "bg-slate-200" : "bg-slate-700"
                    }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className={`p-6 rounded-2xl border ${
              mode === "light" 
                ? "bg-white border-slate-200" 
                : "bg-slate-800 border-slate-700"
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${
                mode === "light" ? "text-slate-800" : "text-slate-100"
              }`}>
                Tech Stack
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "React.js", "Next.js", "TypeScript", "JavaScript", 
                  "Tailwind CSS", "Redux Toolkit", "Node.js", "Express.js",
                  "MongoDB", "Firebase", "Git", "REST APIs"
                ].map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className={`px-3 py-2 rounded-lg text-center text-sm font-medium ${
                      mode === "light" 
                        ? "bg-blue-50 text-blue-700 border border-blue-200" 
                        : "bg-blue-900/20 text-blue-400 border border-blue-800/30"
                    }`}
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;