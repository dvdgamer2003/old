import React from 'react';
import { X, Bot, AlertCircle, Loader2, Info } from 'lucide-react';

interface SummaryModalProps {
  summary: string | null;
  loading: boolean;
  error: string | null;
  remainingUsage: number;
  usageLimit: number;
  onClose: () => void;
  isOpen: boolean;
}

export function SummaryModal({
  summary,
  loading,
  error,
  remainingUsage,
  usageLimit,
  onClose,
  isOpen
}: SummaryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl shadow-xl">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-br from-blue-600/10 via-blue-700/10 to-indigo-800/10">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">AI Summary</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {loading && (
            <div className="flex items-center gap-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <p>Generating summary...</p>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          {summary && (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {summary}
            </p>
          )}

          <p className="mt-4 text-sm text-gray-500 flex items-center gap-1">
            <Info className="w-4 h-4" />
            {remainingUsage} of {usageLimit} daily AI summaries remaining
          </p>
        </div>
      </div>
    </div>
  );
}