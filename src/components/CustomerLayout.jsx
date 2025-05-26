import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function CustomerLayout() {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 flex flex-col">
        <div className="p-6 font-bold text-xl text-orange-400 border-b border-gray-700">Customer Portal</div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/" className="block p-2 rounded hover:bg-gray-700">Dashboard</Link>
            </li>
            <li>
              <Link to="/submit-update" className="block p-2 rounded hover:bg-gray-700">Submit Update</Link>
            </li>
            <li>
              <Link to="/request-module" className="block p-2 rounded hover:bg-gray-700">Request New Module</Link>
            </li>
            <li>
  <Link to="/upgrade-plan" className="block p-2 rounded hover:bg-gray-700">
    Upgrade Plan
  </Link>
</li>
            <li>
              <Link to="/settings" className="block p-2 rounded hover:bg-gray-700">Account Settings</Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 text-sm text-gray-400 border-t border-gray-700">© 2025 StephensCode</div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
