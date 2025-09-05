import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">QP</span>
              </div>
              <span className="text-lg font-semibold text-gray-800">QuickPitch</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              AI-powered pitch generation for startups, entrepreneurs, and innovators.
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 QuickPitch. All rights reserved.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">Use Cases</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">API</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">Partners</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            Transforming ideas into compelling pitches with AI technology.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Terms</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}