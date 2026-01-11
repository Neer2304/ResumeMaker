"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] text-white z-50">
      {/* Animated background elements */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      
      {/* Main loader */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Outer ring */}
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 border-4 border-teal-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-teal-500 rounded-full animate-spin"></div>
          
          {/* Middle ring */}
          <div className="absolute inset-4 border-4 border-blue-500/30 rounded-full"></div>
          <div className="absolute inset-4 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          
          {/* Inner ring */}
          <div className="absolute inset-8 border-4 border-green-500/30 rounded-full"></div>
          <div className="absolute inset-8 border-4 border-transparent border-t-green-400 rounded-full animate-spin" style={{animationDuration: '2s'}}></div>
          
          {/* Center dot */}
          <div className="absolute inset-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full animate-ping" style={{animationDuration: '2s'}}></div>
        </div>
        
        {/* Text content */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-300">
            Loading Excellence
          </h2>
          <p className="mt-2 text-gray-300 max-w-md">
            Crafting your experience with precision and care
          </p>
        </div>
        
        {/* Progress indicator */}
        <div className="w-64 h-1.5 bg-gray-700/50 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full animate-progress"></div>
        </div>
        
        {/* Subtle tips */}
        <div className="mt-6 text-xs text-gray-400 animate-fade-in" style={{animationDelay: '0.5s'}}>
          Tip: Did you know? This portfolio was built with Next.js and Tailwind CSS
        </div>
      </div>
      
      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}