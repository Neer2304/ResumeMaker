"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CustomCursorProps {
  mode: "light" | "dark";
}

const CustomCursor: React.FC<CustomCursorProps> = ({ mode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const mouseDown = () => setCursorVariant("click");
    const mouseUp = () => setCursorVariant("default");
    
    const mouseEnter = () => setCursorVariant("hover");
    const mouseLeave = () => setCursorVariant("default");

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    // Only add to interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .btn-primary, .btn-secondary");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", mouseEnter);
      el.addEventListener("mouseleave", mouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", mouseEnter);
        el.removeEventListener("mouseleave", mouseLeave);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 1.5,
    },
    click: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 0.8,
    },
  };

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50 ${
          mode === "light" ? "bg-blue-500" : "bg-blue-400"
        }`}
        variants={variants}
        animate={cursorVariant}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 28,
          mass: 0.5 // Lighter for better performance
        }}
      />
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 border-2 ${
          mode === "light" ? "border-blue-500" : "border-blue-400"
        }`}
        variants={variants}
        animate={cursorVariant}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 28,
          mass: 0.5
        }}
      />
    </>
  );
};

export default CustomCursor;