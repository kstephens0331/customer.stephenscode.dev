import React from 'react';

export default function Analytics() {
  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col">
      <header className="p-6 border-b border-gray-700 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analytics</h1>
      </header>

      <main className="flex-grow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Usage Analytics */}
        <div className="bg-gray-800 rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2 text-orange-400">Usage Overview</h2>
          <p className="text-gray-300">Total Updates Submitted: 15</p>
          <p className="text-gray-300">Modules Requested: 3</p>
          <p className="text-gray-300">Last Login: 05/30/2025</p>
        </div>

        {/* Weaknesses / Areas for Improvement */}
        <div className="bg-gray-800 rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2 text-orange-400">Areas for Improvement</h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>Low update activity this month</li>
            <li>Few module requests - explore new feature needs</li>
            <li>Profile not fully completed - add phone and address</li>
          </ul>
        </div>
      </main>
    </div>
  );
}