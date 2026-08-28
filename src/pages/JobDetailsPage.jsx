import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { formatDate, formatCurrency } from '../utils/helpers';
import { Calendar, Building2, GraduationCap, MapPin, IndianRupee, ExternalLink, ArrowLeft, CheckCircle2, FileText } from 'lucide-react';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data.job);
      } catch (err) {
        setError(err.response?.data?.error || 'Job not found');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading job details..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!job) return <ErrorMessage message="Job posting details could not be found." />;

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center space-x-1 text-sm font-semibold text-blue-600 hover:text-blue-800">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Job Listings</span>
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6 pb-6 border-b border-gray-100">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wide">
              {job.sector}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">{job.title}</h1>
            <p className="text-base text-gray-600 font-medium mt-1 flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-gray-400" />
              <span>{job.organization}</span>
            </p>
          </div>

          <a
            href={job.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <span>Apply Online</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg mb-8 border border-gray-200">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Qualification</p>
              <p className="text-sm font-semibold text-gray-900">{job.qualification}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <IndianRupee className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Salary Range</p>
              <p className="text-sm font-semibold text-gray-900">
                {formatCurrency(job.salaryRange?.min)} - {formatCurrency(job.salaryRange?.max)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Location</p>
              <p className="text-sm font-semibold text-gray-900">{job.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Application Deadline</p>
              <p className="text-sm font-semibold text-gray-900">{formatDate(job.importantDates?.applicationEnd)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Job Description</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{job.description}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Important Dates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <span className="text-xs text-gray-500 block">Notification Date</span>
                <span className="font-semibold text-gray-800">{formatDate(job.importantDates?.notificationDate)}</span>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <span className="text-xs text-gray-500 block">Application Start</span>
                <span className="font-semibold text-gray-800">{formatDate(job.importantDates?.applicationStart)}</span>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <span className="text-xs text-gray-500 block">Application End</span>
                <span className="font-semibold text-red-600">{formatDate(job.importantDates?.applicationEnd)}</span>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <span className="text-xs text-gray-500 block">Exam Date</span>
                <span className="font-semibold text-blue-600">{formatDate(job.importantDates?.examDate)}</span>
              </div>
            </div>
          </section>

          {job.education && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Educational Qualifications</h2>
              <ul className="space-y-2">
                {job.education.map((edu, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {job.selectionProcess && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Selection Process</h2>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-gray-700 font-medium">
                {job.selectionProcess.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </section>
          )}

          <section className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Official Notification PDF</h4>
                <p className="text-xs text-gray-600">Download and view official details issued by {job.shortName || 'department'}</p>
              </div>
            </div>
            <a
              href={job.notificationPdf || '#'}
              download
              className="px-4 py-2 bg-white border border-blue-300 text-blue-700 hover:bg-blue-100 rounded text-xs font-bold transition-colors"
            >
              Download PDF
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
