import React from 'react';
import { MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const navigationLinks = [
    { title: 'Home', href: '/' },
    { title: 'Destinations', href: '/destinations' },
    { title: 'Services', href: '/services' },
    { title: 'About Us', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-emerald-600 text-white py-8 lg:py-14">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="space-y-6 lg:space-y-8">
            <div className="flex items-center space-x-4">
              <MapPin className="w-12 h-12 lg:w-16 lg:h-16" />
              <h3 className="text-4xl lg:text-6xl font-bold">GoLocal Guide</h3>
            </div>
            <p className="text-lg lg:text-2xl text-emerald-50 leading-relaxed max-w-prose">
              A platform to support you in discovering local experiences 
              and managing your travel adventures.
            </p>
            <div className="flex flex-wrap gap-x-6 lg:gap-x-12 gap-y-4">
              {navigationLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="text-base lg:text-xl font-medium hover:text-emerald-100 transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Social Links */}
          <div className="flex flex-col items-center lg:items-end space-y-6 lg:space-y-8">
            <h4 className="text-2xl lg:text-3xl font-semibold">Follow us on</h4>
            <div className="flex space-x-6 lg:space-x-8">
              <a
                href="https://facebook.com/golocalguide"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-100 transition-transform hover:scale-110"
              >
                <Facebook className="w-8 h-8 lg:w-12 lg:h-12" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com/golocalguide"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-100 transition-transform hover:scale-110"
              >
                <Twitter className="w-8 h-8 lg:w-12 lg:h-12" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com/golocalguide"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-100 transition-transform hover:scale-110"
              >
                <Instagram className="w-8 h-8 lg:w-12 lg:h-12" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://linkedin.com/company/golocalguide"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-100 transition-transform hover:scale-110"
              >
                <Linkedin className="w-8 h-8 lg:w-12 lg:h-12" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-emerald-500/30 text-center">
          <p className="text-sm lg:text-xl text-emerald-50">
            &copy; {new Date().getFullYear()} GoLocal Guide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
