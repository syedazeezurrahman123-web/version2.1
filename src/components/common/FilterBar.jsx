import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

const FilterBar = ({ filters, onFilterChange, onReset }) => {
  const qualifications = ['10th', '12th', 'Graduate', 'Post Graduate'];
  const sectors = ['SSC', 'Banking', 'Railway', 'UPSC', 'Defense', 'State PSC'];
  const states = ['All States', 'Maharashtra', 'Delhi', 'Karnataka', 'Uttar Pradesh'];

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Filter Job Notifications</span>
        </h3>
        {onReset && (
          <button
            onClick={onReset}
            className="text-xs text-gray-500 hover:text-blue-600 flex items-center space-x-1 font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Qualification</label>
          <select
            value={filters.qualification || ''}
            onChange={(e) => onFilterChange('qualification', e.target.value)}
            className="w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3 border bg-white"
          >
            <option value="">All Qualifications</option>
            {qualifications.map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Sector / Exam Body</label>
          <select
            value={filters.sector || ''}
            onChange={(e) => onFilterChange('sector', e.target.value)}
            className="w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3 border bg-white"
          >
            <option value="">All Sectors</option>
            {sectors.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">State / Region</label>
          <select
            value={filters.state || ''}
            onChange={(e) => onFilterChange('state', e.target.value)}
            className="w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3 border bg-white"
          >
            <option value="">All States</option>
            {states.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
