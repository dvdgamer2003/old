import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { Article } from './pages/Article';
import { Contact } from './pages/Contact';
import { OldNews } from './pages/OldNews';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';
import './styles/animations.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/article/:id',
    element: <Article />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/old-news',
    element: <OldNews />,
  },
  {
    path: '/privacy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/terms',
    element: <TermsOfService />,
  },
]);

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);