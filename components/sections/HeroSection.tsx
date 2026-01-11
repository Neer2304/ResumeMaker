"use client";

import { assets } from "@/assets/assets";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiDownload, FiGithub, FiLinkedin, FiArrowRight } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";

interface HeroProps {
  mode: "light" | "dark";
}

const Hero: React.FC<HeroProps> = ({ mode }) => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Simple Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50 dark:from-slate-900/50 dark:via-blue-900/30 dark:to-purple-900/30"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span
                className={`inline-block px-3 py-1 rounded-full text-xl font-medium ${
                  mode === "light"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-blue-900/30 text-blue-400"
                }`}
              >
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="heading-1 mb-6"
            >
              Hi, I'm <span className="text-gradient">Neer Mehta</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-2xl lg:text-3xl font-bold mb-6 h-12"
            >
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  2000,
                  "React Specialist",
                  2000,
                  "Next.js Expert",
                  2000,
                  "UI/UX Enthusiast",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                className="text-gradient-accent"
                repeat={Infinity}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-lg lg:text-xl mb-8 leading-relaxed text-slate-600 dark:text-slate-300"
            >
              I craft{" "}
              <span className="font-semibold text-blue-500">
                digital experiences
              </span>{" "}
              that blend beautiful design with cutting-edge technology. Let's
              build something{" "}
              <span className="font-semibold text-green-500">amazing</span>{" "}
              together.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.a
                href="/Neer_Resume.pdf"
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                <FiDownload size={18} />
                Download Resume
                <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>

              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                View My Work
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {[
                {
                  icon: FiGithub,
                  href: "https://github.com/Neer2304",
                  label: "GitHub",
                },
                {
                  icon: FiLinkedin,
                  href: "https://linkedin.com/in/neer-mehta-94a23b339",
                  label: "LinkedIn",
                },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    mode === "light"
                      ? "bg-white shadow-md text-slate-700 hover:text-blue-500 hover:shadow-lg"
                      : "bg-slate-800 text-slate-300 hover:text-blue-400 hover:bg-slate-700"
                  }`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image - RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Main Profile Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800"
              >
                <Image
                  src={assets.neer_gibili}
                  alt="Neer Mehta"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Simple Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span
              className={`text-xs mb-2 ${
                mode === "light" ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Scroll Down
            </span>
            <div
              className={`w-5 h-8 border-2 rounded-full flex justify-center ${
                mode === "light" ? "border-slate-400" : "border-slate-600"
              }`}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-1 h-2 rounded-full mt-2 ${
                  mode === "light" ? "bg-slate-400" : "bg-slate-600"
                }`}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;