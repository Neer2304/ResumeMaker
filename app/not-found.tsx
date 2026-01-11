"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);
    
    // Check for dark mode preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }

    // Handle mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate parallax effect for floating elements (client-side only)
  const calculateParallax = (factor: number) => {
    if (!isClient) return { transform: 'translate(0px, 0px)' };
    
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return { transform: `translate(${x}px, ${y}px)` };
  };

  const bgStyle = {
    minHeight: "100vh",
    background: isDarkMode
      ? "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)"
      : "linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%)",
    color: isDarkMode ? "#F8F9FA" : "#212529",
  };

  return (
    <main style={bgStyle} className="flex flex-col items-center justify-center px-6 py-16 text-center transition-all duration-300 relative overflow-hidden">
      {/* Animated background elements */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #4FD1C5 0%, transparent 70%)",
          ...calculateParallax(0.01)
        }}
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #4299E1 0%, transparent 70%)",
          ...calculateParallax(0.015)
        }}
      />
      
      {/* Floating shapes */}
      <div 
        className="absolute top-1/3 right-1/3 w-12 h-12 rounded-lg opacity-20"
        style={{
          background: "linear-gradient(45deg, #4FD1C5, #4299E1)",
          ...calculateParallax(0.02)
        }}
      />
      <div 
        className="absolute bottom-1/4 left-1/3 w-16 h-16 rounded-full opacity-20"
        style={{
          background: "linear-gradient(45deg, #4299E1, #4FD1C5)",
          ...calculateParallax(0.025)
        }}
      />
      
      {/* Main content */}
      <div className="relative z-10 max-w-2xl">
        {/* Animated 404 text */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
            404
          </h1>
          <div className="absolute -inset-4 bg-gradient-to-r from-teal-400/20 to-blue-500/20 blur-2xl rounded-full -z-10 animate-pulse-slow" />
        </div>
        
        <h2 className="text-3xl font-bold mb-4">Lost in the Digital Space</h2>
        <p className="text-lg opacity-80 mb-8 max-w-md mx-auto">
          The page you're looking for seems to have drifted into the unknown. 
          Let's get you back to familiar territory.
        </p>

        {/* Animated button */}
        <Link
          href="/"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center">
            <svg
              className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Return to Home
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>

        {/* Additional navigation options */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <Link href="/" className="px-4 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-200">
            <div className="font-medium mb-1">Home</div>
            <div className="opacity-70 text-xs">Main page</div>
          </Link>
          <Link href="/projects" className="px-4 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-200">
            <div className="font-medium mb-1">Projects</div>
            <div className="opacity-70 text-xs">My work</div>
          </Link>
          <Link href="/contact" className="px-4 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-200">
            <div className="font-medium mb-1">Contact</div>
            <div className="opacity-70 text-xs">Get in touch</div>
          </Link>
        </div>
      </div>

      {/* Animated cosmic particles */}
      {isClient && [...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white opacity-30 animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${15 + Math.random() * 15}s`,
          }}
        />
      ))}

      {/* Footer */}
      <p className="mt-16 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Neer's Portfolio. All rights reserved.
      </p>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-40px) rotate(360deg);
            opacity: 0.3;
          }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-float {
          animation: float 15s infinite linear;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite ease-in-out;
        }
      `}</style>
    </main>
  );
}