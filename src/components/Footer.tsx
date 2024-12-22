import React from 'react';
import { Mail, ExternalLink, Newspaper } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-6">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="text-base md:text-lg font-semibold text-foreground">Samachar 2.0</span>
            </div>
            <p className="text-sm leading-relaxed text-secondary">
              Delivering reliable and comprehensive news coverage to keep you informed about what matters most.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/contact"
                  className="text-secondary hover:text-primary transition-colors text-sm flex items-center gap-1"
                >
                  Contact Us <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-secondary hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-secondary hover:text-primary transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h3>
            <div className="space-y-2">
              <a
                href="mailto:fusion.minds45@gmail.com"
                className="text-secondary hover:text-primary transition-colors text-sm flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                fusion.minds45@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary text-sm text-center md:text-left">
              © {new Date().getFullYear()} Samachar 2.0. All rights reserved.
            </p>
            <p className="text-secondary text-sm">
              Powered by <span className="text-primary">fusion.minds</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}