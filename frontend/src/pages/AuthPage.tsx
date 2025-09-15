import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PenTool, Users, BookOpen, Star } from 'lucide-react';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-purple-50/50 flex">
      {/* Left Panel - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 p-12 flex-col justify-between text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-white"></div>
          <div className="absolute top-3/4 right-1/3 w-16 h-16 rounded-full bg-white"></div>
        </div>

        <div className="relative z-10">
          <Link
            to="/"
            className="flex items-center space-x-3 text-2xl font-bold mb-16"
          >
            <PenTool className="h-8 w-8" />
            <span>BlogSpace</span>
          </Link>

          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Welcome to the Future of Blogging
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Join thousands of writers and readers in our vibrant community.
                Share your stories, discover amazing content, and connect with like-minded people.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Active Community</h3>
                  <p className="text-blue-100 text-sm">Connect with writers worldwide</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Quality Content</h3>
                  <p className="text-blue-100 text-sm">Discover amazing stories daily</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Easy Publishing</h3>
                  <p className="text-blue-100 text-sm">Share your thoughts effortlessly</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-blue-200 text-sm">
            &ldquo;BlogSpace has transformed how I share my ideas with the world.&rdquo;
          </p>
          <p className="text-blue-100 text-xs mt-2">- Sarah Johnson, Writer</p>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-6 sm:mb-8">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4 sm:mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              <PenTool className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              <span>BlogSpace</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-soft border p-6 sm:p-8 lg:p-10">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                {isLogin ? 'Welcome Back' : 'Join BlogSpace'}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                {isLogin
                  ? 'Enter your credentials to access your account'
                  : 'Create your account and start sharing your stories'
                }
              </p>
            </div>

            {isLogin ? (
              <LoginForm onSuccess={handleSuccess} />
            ) : (
              <RegisterForm onSuccess={handleSuccess} />
            )}

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600 mb-3">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </p>
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-800 font-semibold p-0"
              >
                {isLogin ? 'Create an account' : 'Sign in instead'}
              </Button>
            </div>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                By continuing, you agree to our{' '}
                <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};