import React from 'react';
import { Share2 } from 'lucide-react';
import { shareContent } from '@/lib/utils/share';

interface ShareButtonProps {
  url: string;
  title: string;
}

export function ShareButton({ url, title }: ShareButtonProps) {
  const handleShare = () => {
    shareContent({
      title,
      url,
      text: `Check out this article: ${title}`,
    });
  };

  return (
    <button
      onClick={handleShare}
      className="p-2 rounded-full backdrop-blur-md bg-white/90 text-gray-600 hover:bg-gray-100/90"
      title="Share article"
    >
      <Share2 className="w-5 h-5" />
    </button>
  );
}