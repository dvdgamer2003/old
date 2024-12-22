import React from 'react';
import { ArticleActions } from './ArticleActions';

interface ArticleImageProps {
  imageUrl: string;
  title: string;
  url: string;
  isBookmarked: boolean;
  onBookmark: () => void;
}

export function ArticleImage({ imageUrl, title, url, isBookmarked, onBookmark }: ArticleImageProps) {
  return (
    <div className="relative h-[400px]">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-4 right-4">
        <ArticleActions
          url={url}
          title={title}
          isBookmarked={isBookmarked}
          onBookmark={onBookmark}
        />
      </div>
    </div>
  );
}