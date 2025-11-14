import React, { useState, useEffect, useContext } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthProvider';

export default function Analytics() {
  const { user } = useContext(AuthContext);
  const [gaTrackingId, setGaTrackingId] = useState('');
  const [savedGaId, setSavedGaId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) return;

    const fetchAnalyticsConfig = async () => {
      try {
        const docRef = doc(db, 'customers', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().googleAnalyticsId) {
          const gaId = docSnap.data().googleAnalyticsId;
          setSavedGaId(gaId);
          setGaTrackingId(gaId);
        }
      } catch (error) {
        console.error('Error fetching analytics config:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsConfig();
  }, [user]);

  const handleSave = async () => {
    if (!gaTrackingId.trim()) {
      setMessage('Please enter a valid Google Analytics Tracking ID');
      return;
    }

    setSaving(true);
    try {
      const docRef = doc(db, 'customers', user.uid);
      await setDoc(docRef, { googleAnalyticsId: gaTrackingId }, { merge: true });
      setSavedGaId(gaTrackingId);
      setMessage('Google Analytics ID saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving GA ID:', error);
      setMessage('Error saving. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Website Analytics
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Connect your Google Analytics to view insights here
          </p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 backdrop-blur-sm">
          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <span className="text-sm text-slate-300 font-semibold">Analytics Dashboard</span>
        </div>
      </div>

      {/* Google Analytics Setup Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 border border-slate-600/50 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Google Analytics Setup</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Google Analytics Tracking ID
              </label>
              <input
                type="text"
                placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
                value={gaTrackingId}
                onChange={(e) => setGaTrackingId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : savedGaId ? 'Update Tracking ID' : 'Save Tracking ID'}
            </button>

            {message && (
              <div className={`p-4 rounded-lg ${message.includes('Error') ? 'bg-red-500/20 border border-red-500/50 text-red-400' : 'bg-green-500/20 border border-green-500/50 text-green-400'}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 border border-slate-600/50 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">How to Get Your Tracking ID</h2>
          </div>

          <div className="space-y-4 text-slate-300">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Sign in to Google Analytics</h3>
                <p className="text-sm">Visit <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">analytics.google.com</a> and sign in with your Google account</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Find Your Tracking ID</h3>
                <p className="text-sm">Go to Admin → Property Settings → Find your Tracking ID (starts with "G-" for GA4 or "UA-" for Universal Analytics)</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Paste It Above</h3>
                <p className="text-sm">Copy your Tracking ID and paste it in the field above, then click Save</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center text-green-400 font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">View Analytics Here</h3>
                <p className="text-sm">Once connected, your website analytics will display in this dashboard for easy monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Preview (if connected) */}
      {savedGaId && (
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 border border-slate-600/50 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
          </div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Connected</h2>
                <p className="text-sm text-slate-400">Tracking ID: {savedGaId}</p>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50 text-center">
              <p className="text-slate-300 mb-4">
                Your Google Analytics is connected. Data from your website will be displayed here in a future update.
              </p>
              <div className="text-sm text-slate-500">
                🚀 Analytics visualization coming soon
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
