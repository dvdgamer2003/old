import React from 'react';
import { Share2, Copy, MessageCircle, Twitter, Facebook, Linkedin, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { generateShareUrls } from '@/lib/utils/share';

interface ShareMenuProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareMenu({ url, title, isOpen, onClose }: ShareMenuProps) {
  if (!isOpen || !url || !title) return null;

  let shareUrls: ReturnType<typeof generateShareUrls>;
  try {
    shareUrls = generateShareUrls({ url, title });
  } catch (error) {
    console.error('Error generating share URLs:', error);
    return null;
  }

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const fullUrl = url.startsWith('http') 
        ? url 
        : `${window.location.origin}/article/${encodeURIComponent(url)}`;
      await navigator.clipboard.writeText(fullUrl);
      toast.success('Link copied to clipboard!');
      onClose();
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Failed to copy link');
    }
  };

  const handleShare = (e: React.MouseEvent, platform: keyof typeof shareUrls) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
      onClose();
    } catch (error) {
      console.error('Error opening share URL:', error);
      toast.error('Failed to open sharing page');
    }
  };

  return (
    <div 
      className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 min-w-[200px] animate-fade-in z-50"
      onClick={e => e.stopPropagation()}
    >
      <div className="space-y-1">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Copy className="w-4 h-4" />
          Copy link
        </button>
        <button
          onClick={(e) => handleShare(e, 'whatsapp')}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </button>
        <button
          onClick={(e) => handleShare(e, 'twitter')}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </button>
        <button
          onClick={(e) => handleShare(e, 'facebook')}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </button>
        <button
          onClick={(e) => handleShare(e, 'linkedin')}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </button>
        <button
          onClick={(e) => handleShare(e, 'telegram')}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Send className="w-4 h-4" />
          Telegram
        </button>
      </div>
    </div>
  );
}