import React from 'react';
import { Mail, Phone, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-3 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-govt-saffron" />
            <span>Govt Jobs Hub</span>
          </h3>
          <p className="text-sm text-gray-400">
            Your single destination for real-time government job alerts, notifications, exam calendars, syllabus, and previous year papers.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition-colors">Latest Jobs</a></li>
            <li><a href="/search" className="hover:text-white transition-colors">Search & Filter</a></li>
            <li><a href="/resources" className="hover:text-white transition-colors">Study Resources</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Support & Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-govt-saffron" />
              <span>support@govtjobshub.in</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-govt-saffron" />
              <span>1800-123-4567 (Toll Free)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-950 py-4 text-center text-xs text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} Government Jobs Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
