import React, { useState, useEffect } from 'react';
import SearchBar from '../common/SearchBar';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Users, Bell, FileText, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  const [activeCount, setActiveCount] = useState(128);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await api.get('/users/active-count');
        if (res.data?.activeCount) {
          setActiveCount(res.data.activeCount);
        }
      } catch (err) {
        // Fallback count
      }
    };
    fetchCount();
  }, []);

  const handleSearch = (query) => {
    navigate(`/search?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="bg-gradient-to-r from-govt-navy to-blue-900 text-white rounded-2xl p-6 sm:p-10 mb-8 shadow-lg relative overflow-hidden">
      <div className="max-w-3xl relative z-10">
        <div className="inline-flex items-center space-x-2 bg-blue-800/80 px-3 py-1 rounded-full text-xs font-semibold text-govt-saffron mb-4 border border-blue-700">
          <Users className="w-3.5 h-3.5" />
          <span>{activeCount} Active Job Seekers Online Now</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Find Verified Government Job Vacancies & Exam Schedules
        </h1>
        <p className="text-sm sm:text-base text-gray-200 mb-6 leading-relaxed">
          Stay updated with real-time official alerts for SSC, Banking, Railways, UPSC, and State PSC examinations across India.
        </p>

        <SearchBar onSearch={handleSearch} placeholder="Search by Job Title (e.g., SSC CGL, IBPS PO, RRB)..." />

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-300">
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>100% Free Alerts</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bell className="w-4 h-4 text-emerald-400" />
            <span>Instant Notifications</span>
          </div>
          <div className="flex items-center space-x-1">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Official Syllabus PDFs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
