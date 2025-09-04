
import React from 'react';
import { GoogleIcon, CompassIcon } from './ui/icons';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl text-center animate-fade-in">
        <div className="flex justify-center">
          <CompassIcon className="w-16 h-16 text-brand-blue" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Local SEO AI Toolkit
        </h1>
        <p className="text-gray-600">
          Supercharge your local presence. Track, analyze, and automate your GMB performance with the power of AI.
        </p>
        <div>
          <button
            onClick={onLogin}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors duration-200"
          >
            <GoogleIcon className="w-5 h-5 mr-3" />
            Sign in with Google
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Connect your Google Business Profile to get started. It's free!
        </p>
      </div>
    </div>
  );
};

export default Login;
