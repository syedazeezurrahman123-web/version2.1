import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Bell, BookOpen, Search, Home } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-govt-navy text-white shadow-md sticky top-0 z-50">
      <div className="bg-govt-saffron text-white text-xs py-1 px-4 text-center font-medium">
        🇮🇳 Government Jobs Hub - Official Alerts & Updates Portal
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-full text-govt-navy">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Govt Jobs Hub</h1>
            <p className="text-xs text-gray-300">Central & State Notifications</p>
          </div>
        </Link>

        <nav className="hidden md:flex space-x-6 items-center font-medium text-sm">
          <Link
            to="/"
            className={`flex items-center space-x-1 hover:text-govt-saffron transition-colors ${
              isActive('/') ? 'text-govt-saffron font-semibold' : 'text-gray-100'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            to="/search"
            className={`flex items-center space-x-1 hover:text-govt-saffron transition-colors ${
              isActive('/search') ? 'text-govt-saffron font-semibold' : 'text-gray-100'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Search Jobs</span>
          </Link>
          <Link
            to="/resources"
            className={`flex items-center space-x-1 hover:text-govt-saffron transition-colors ${
              isActive('/resources') ? 'text-govt-saffron font-semibold' : 'text-gray-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Syllabus & Papers</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
