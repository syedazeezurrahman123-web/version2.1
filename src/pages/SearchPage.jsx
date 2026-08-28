import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterBar from '../components/common/FilterBar';
import JobCard from '../components/common/JobCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Pagination from '../components/common/Pagination';
import SearchBar from '../components/common/SearchBar';
import { useJobs } from '../hooks/useJobs';
import { useFilterContext } from '../context/FilterContext';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, updateFilter, resetFilters, setFilters } = useFilterContext();

  const urlSearch = searchParams.get('search') || '';

  useEffect(() => {
    if (urlSearch && urlSearch !== filters.search) {
      updateFilter('search', urlSearch);
    }
  }, [urlSearch]);

  const { jobs, loading, error, pagination, refetch } = useJobs(filters);

  const handleSearchSubmit = (q) => {
    setSearchParams(q ? { search: q } : {});
    updateFilter('search', q);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Search Government Jobs</h1>
        <SearchBar onSearch={handleSearchSubmit} initialQuery={filters.search} />
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={updateFilter}
        onReset={() => {
          setSearchParams({});
          resetFilters();
        }}
      />

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">
          Search Results {filters.search && `for "${filters.search}"`}
        </h2>
        <span className="text-xs text-gray-500 font-medium">
          Found {pagination.total || jobs.length} openings
        </span>
      </div>

      {loading ? (
        <LoadingSpinner text="Searching jobs..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : jobs.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-lg border border-gray-200">
          <p className="text-gray-600 font-medium">No results found for your search query.</p>
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
    </div>
  );
};

export default SearchPage;
