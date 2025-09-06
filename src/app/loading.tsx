"use client";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100">
      <div className="text-center">
       
        <div className="relative mb-6">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-amber-600 mx-auto"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg 
              className="w-8 h-8 text-amber-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
        </div>
        
      
        <p className="text-amber-800 text-lg font-medium mb-2">Crafting your pitch</p>
        
       
        <div className="w-48 h-1 bg-amber-200 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-amber-600 rounded-full w-1/3 animate-pulse"></div>
        </div>
        
      
        <p className="text-amber-600 text-sm mt-4">Good things take a moment...</p>
      </div>
    </div>
  );
}