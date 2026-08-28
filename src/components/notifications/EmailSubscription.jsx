import React, { useState } from 'react';
import api from '../../services/api';
import { Mail, BellRing, Check } from 'lucide-react';

const EmailSubscription = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus(null);
    try {
      const res = await api.post('/notifications/subscribe', { email, name });
      if (res.data?.success) {
        setStatus({ type: 'success', message: 'Subscribed successfully! You will receive instant notifications.' });
        setEmail('');
        setName('');
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.error || 'Subscription failed. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
      <div className="flex items-start space-x-4">
        <div className="bg-blue-600 text-white p-3 rounded-lg hidden sm:block">
          <Mail className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">Get Free Govt Job Alerts in Your Inbox</h3>
          <p className="text-sm text-gray-600 mt-1">
            Subscribe to daily email updates for latest notifications, admit card releases, and exam results.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Your Name (Optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <input
              type="email"
              required
              placeholder="Enter your email address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 px-4 rounded-md transition-colors disabled:opacity-50 flex items-center justify-center space-x-1"
            >
              <span>{loading ? 'Subscribing...' : 'Subscribe Now'}</span>
            </button>
          </form>

          {status && (
            <div className={`mt-3 text-sm font-medium flex items-center space-x-1 ${
              status.type === 'success' ? 'text-emerald-700' : 'text-red-700'
            }`}>
              {status.type === 'success' && <Check className="w-4 h-4" />}
              <span>{status.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailSubscription;
