import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthView = 'login' | 'signup' | 'forgot-password';

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [view, setView] = useState<AuthView>('login');

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    // Reset view to login after modal is closed
    setTimeout(() => setView('login'), 300);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {view === 'login' && 'Welcome Back'}
          {view === 'signup' && 'Create Account'}
          {view === 'forgot-password' && 'Reset Password'}
        </h2>

        {view === 'login' && (
          <LoginForm 
            onClose={handleClose} 
            onForgotPassword={() => setView('forgot-password')} 
          />
        )}
        {view === 'signup' && <SignupForm onClose={handleClose} />}
        {view === 'forgot-password' && (
          <ForgotPasswordForm onBack={() => setView('login')} />
        )}

        {view !== 'forgot-password' && (
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            {view === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setView(view === 'login' ? 'signup' : 'login')}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              {view === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}