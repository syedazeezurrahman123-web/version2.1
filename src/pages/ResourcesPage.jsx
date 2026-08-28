import React, { useState } from 'react';
import { useResources } from '../hooks/useResources';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { Download, BookOpen, FileCode, CheckCircle2, Search } from 'lucide-react';

const ResourcesPage = () => {
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { resources, loading, error, refetch } = useResources({ type: selectedType, search: searchQuery });

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl p-6 sm:p-8 shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-extrabold">Study Resources & Syllabus PDFs</h1>
        <p className="text-sm text-gray-200 mt-2">
          Download free official syllabi, previous year exam question papers, and preparation guides.
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedType('')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedType === '' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Resources
          </button>
          <button
            onClick={() => setSelectedType('syllabus')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedType === 'syllabus' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Syllabus
          </button>
          <button
            onClick={() => setSelectedType('previous-paper')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedType === 'previous-paper' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Previous Year Papers
          </button>
          <button
            onClick={() => setSelectedType('mock-test')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedType === 'mock-test' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Mock Tests
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search material..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {loading ? (
        <LoadingSpinner text="Fetching study materials..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : resources.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-lg border border-gray-200">
          <p className="text-gray-600 font-medium">No study materials match your selection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((res) => (
            <div key={res.id} className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
                    {res.category} • {res.type}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{res.fileSize}</span>
                </div>

                <h3 className="text-base font-bold text-gray-900">{res.title}</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{res.description}</p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {res.tags?.map((tag) => (
                    <span key={tag} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>Downloads: <strong>{res.downloads?.toLocaleString() || 0}</strong></span>
                <a
                  href={res.filePath}
                  download
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
