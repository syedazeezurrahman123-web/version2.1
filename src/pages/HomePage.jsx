import React from 'react';
import FilterBar from '../components/common/FilterBar';
import JobCard from '../components/common/JobCard';
import HeroSection from '../components/home/HeroSection';
import EmailSubscription from '../components/notifications/EmailSubscription';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Pagination from '../components/common/Pagination';
import { useJobs } from '../hooks/useJobs';
import { useFilterContext } from '../context/FilterContext';

const HomePage = () => {
  const { filters, updateFilter, resetFilters } = useFilterContext();
  const { jobs, loading, error, pagination, refetch } = useJobs(filters);

  return (
    <div>
      <HeroSection />

      <FilterBar
        filters={filters}
        onFilterChange={updateFilter}
        onReset={resetFilters}
      />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Latest Job Notifications</h2>
        <span className="text-sm text-gray-500 font-medium">
          Showing {jobs.length} of {pagination.total || jobs.length} openings
        </span>
      </div>

      {loading ? (
        <LoadingSpinner text="Fetching job postings..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : jobs.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-lg border border-gray-200">
          <p className="text-gray-600 font-medium">No job notifications found matching your filter criteria.</p>
          <button
            onClick={resetFilters}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={(p) => updateFilter('page', p)}
      />

      <EmailSubscription />
    </div>
  );
};

export default HomePage;
