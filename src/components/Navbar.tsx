'use client';

import Link from 'next/link';
import { useState } from 'react';
import LoginButton from './LoginButton';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">QP</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">
              QuickPitch
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-800 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-800 transition-colors">
              How It Works
            </a>
            <a href="#use-cases" className="text-gray-600 hover:text-gray-800 transition-colors">
              Use Cases
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-800 transition-colors">
              Pricing
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
           <LoginButton />
            <Link 
              href="/generate"
              className="bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-900 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border border-gray-200 rounded-md mt-2 shadow-md">
              <a
                href="#features"
                className="block px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#use-cases"
                className="block px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Use Cases
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <div className="border-t border-gray-200 pt-2 mt-2">
               
                  <LoginButton />
                
                <Link
                  href="/generate"
                  className="block px-3 py-2 bg-gray-800 text-white rounded-md mt-2 text-center hover:bg-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}