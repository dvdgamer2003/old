import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function ArticleHeader() {
  return (
    <div className="mb-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-secondary hover:text-primary"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to News
      </Link>
    </div>
  );
}