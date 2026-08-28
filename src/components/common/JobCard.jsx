import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, GraduationCap, IndianRupee, ArrowRight, Star } from 'lucide-react';
import { formatDate, formatCurrency } from '../../utils/helpers';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-5 flex flex-col justify-between relative">
      <div>
        <div className="flex justify-between items-start gap-2 mb-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
            {job.sector}
          </span>
          {job.featured && (
            <span className="flex items-center space-x-1 text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
              <Star className="w-3 h-3 fill-current" />
              <span>Featured</span>
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2">
          {job.title}
        </h3>
        <p className="text-sm font-medium text-gray-600 mt-1">{job.organization}</p>

        <p className="text-sm text-gray-500 mt-3 line-clamp-2">{job.description}</p>

        <div className="grid grid-cols-2 gap-3 mt-4 text-xs text-gray-600 border-t border-b border-gray-100 py-3">
          <div className="flex items-center space-x-1.5">
            <GraduationCap className="w-4 h-4 text-gray-400" />
            <span className="truncate">{job.qualification}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <IndianRupee className="w-4 h-4 text-gray-400" />
            <span className="truncate">
              {formatCurrency(job.salaryRange?.min)} - {formatCurrency(job.salaryRange?.max)}
            </span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="truncate">End: {formatDate(job.importantDates?.applicationEnd)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2 flex justify-between items-center">
        <span className="text-xs font-medium text-gray-500">
          Vacancies: <strong className="text-gray-900">{job.vacancies?.toLocaleString() || 'N/A'}</strong>
        </span>
        <Link
          to={`/job/${job.id}`}
          className="inline-flex items-center space-x-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
