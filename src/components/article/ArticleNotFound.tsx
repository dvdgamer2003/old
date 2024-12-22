import React from 'react';
import { Link } from 'react-router-dom';

export function ArticleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <Link to="/" className="text-primary hover:underline">
          Return to homepage
        </Link>
      </div>
    </div>
  );
}