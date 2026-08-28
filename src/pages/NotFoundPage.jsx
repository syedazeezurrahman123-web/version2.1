import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center max-w-lg mx-auto my-12 shadow-sm">
      <FileQuestion className="w-16 h-16 text-blue-600 mx-auto mb-4" />
      <h1 className="text-3xl font-extrabold text-gray-900">404 - Page Not Found</h1>
      <p className="text-gray-600 text-sm mt-2">
        The job listing, resource, or page you are looking for does not exist or has expired.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
      >
        <Home className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
