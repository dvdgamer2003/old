import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to News
        </Link>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-custom p-8">
          <h1 className="text-3xl font-bold text-foreground mb-6">Privacy Policy</h1>
          
          <div className="space-y-6 text-secondary">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Information We Collect</h2>
              <p>We collect information you provide directly to us when you:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Create an account</li>
                <li>Set your news preferences</li>
                <li>Save articles to bookmarks</li>
                <li>Interact with our AI features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Personalize your news feed</li>
                <li>Improve our recommendation system</li>
                <li>Provide AI-powered features</li>
                <li>Send relevant notifications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information.
                Your data is encrypted and stored securely using industry-standard protocols.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@samachar.com" className="text-primary hover:underline">
                  privacy@samachar.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}