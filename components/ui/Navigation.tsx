"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiHome, FiUser, FiCode, FiBriefcase, FiMail } from "react-icons/fi";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: FiHome },
    { id: "about", label: "About", icon: FiUser },
    { id: "skills", label: "Skills", icon: FiCode },
    { id: "experience", label: "Experience", icon: FiBriefcase },
    { id: "projects", label: "Projects", icon: FiCode },
    { id: "contact", label: "Contact", icon: FiMail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          scrolled ? "glass-effect rounded-2xl shadow-2xl" : "bg-transparent"
        }`}
      >
        <div className="hidden md:flex items-center gap-2 p-2">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(item.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "text-slate-600 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-black/20"
              }`}
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-6 right-6 z-50">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="glass-effect p-3 rounded-xl text-slate-600 dark:text-slate-300"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-16 right-0 glass-effect rounded-2xl p-4 shadow-2xl"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        activeSection === item.id
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                          : "text-slate-600 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-black/20"
                      }`}
                    >
                      <Icon size={20} />
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navigation;