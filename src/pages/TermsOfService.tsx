import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TermsOfService() {
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
          <h1 className="text-3xl font-bold text-foreground mb-6">Terms of Service</h1>
          
          <div className="space-y-6 text-secondary">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Samachar News, you agree to be bound by these Terms of Service
                and all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. User Accounts</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must provide accurate information when creating an account</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You must not share your account credentials</li>
                <li>We reserve the right to terminate accounts that violate our terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Content Usage</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Content is provided for personal, non-commercial use only</li>
                <li>You may not redistribute or republish our content</li>
                <li>Attribution must be maintained for all shared content</li>
                <li>AI-generated content is subject to additional terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. AI Features</h2>
              <p>Our AI features are provided "as is" and:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>May have usage limits</li>
                <li>Are subject to availability</li>
                <li>May contain inaccuracies</li>
                <li>Should not be relied upon for critical decisions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Limitations</h2>
              <p>
                We strive for accuracy but cannot guarantee the completeness or timeliness of news
                content. Use of our service is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the service
                constitutes acceptance of updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
              <p>
                For questions about these terms, please contact{' '}
                <a href="mailto:legal@samachar.com" className="text-primary hover:underline">
                  legal@samachar.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}