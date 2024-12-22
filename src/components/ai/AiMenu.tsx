import React from 'react';
import { MessageSquare, FileText } from 'lucide-react';

interface AiMenuProps {
  onSelectChat: () => void;
  onSelectSummarize: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export function AiMenu({ onSelectChat, onSelectSummarize, onClose, isOpen }: AiMenuProps) {
  return (
    <div 
      className={`fixed bottom-24 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-50 transition-all duration-300 transform ${
        isOpen 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="flex flex-col gap-1">
        <button
          onClick={() => {
            onSelectChat();
            onClose();
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Chat with AI
        </button>
        <button
          onClick={() => {
            onSelectSummarize();
            onClose();
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <FileText className="w-4 h-4" />
          Summarize Articles
        </button>
      </div>
    </div>
  );
}