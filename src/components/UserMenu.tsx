import React, { useState } from 'react';
import { LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface UserMenuProps {
  onShowPreferences: () => void;
}

export function UserMenu({ onShowPreferences }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <User className="w-5 h-5" />
        <span className="text-sm font-medium">{user.email}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50">
          <button
            onClick={() => {
              onShowPreferences();
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Settings className="w-4 h-4 mr-2" />
            Preferences
          </button>
          <button
            onClick={signOut}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}