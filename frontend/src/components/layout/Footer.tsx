import { Link } from 'react-router-dom';
import { PenTool, Twitter, Github, Linkedin, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
            >
              <PenTool className="h-6 w-6 text-blue-600" />
              <span>BlogSpace</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              A modern blogging platform where ideas come to life. Share your thoughts,
              connect with readers, and build your online presence.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@blogspace.com"
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/auth"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#help"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>© {currentYear} BlogSpace.</span>
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by developers, for writers.</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#privacy"
                className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
              >
                Privacy
              </a>
              <a
                href="#terms"
                className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
              >
                Terms
              </a>
              <a
                href="#cookies"
                className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};