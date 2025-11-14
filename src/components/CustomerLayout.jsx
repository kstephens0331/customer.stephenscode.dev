import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

export default function CustomerLayout() {
  const navItem = "group flex items-center gap-3 px-4 py-3.5 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-orange-600/20 transition-all duration-300 rounded-xl text-sm font-medium relative overflow-hidden";
  const activeNavItem = "group flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 rounded-xl text-sm font-medium shadow-lg shadow-orange-500/30 relative overflow-hidden";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-700/50 flex flex-col p-6 shadow-2xl">
        {/* Logo/Brand */}
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-4 rounded-2xl border border-slate-600/50 backdrop-blur-sm">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Client Portal
            </div>
            <div className="text-xs text-slate-400 mt-1">StephensCode Dashboard</div>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) => isActive ? activeNavItem : navItem}
          >
            {({ isActive }) => (
              <>
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <svg className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-orange-400'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <span className={isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}>Dashboard</span>
                {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive}) => isActive ? activeNavItem : navItem}
          >
            {({ isActive }) => (
              <>
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <svg className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-orange-400'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <span className={isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}>Analytics</span>
                {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/review"
            className={({ isActive}) => isActive ? activeNavItem : navItem}
          >
            {({ isActive }) => (
              <>
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <svg className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-orange-400'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className={isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}>Leave Review</span>
                {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>}
              </>
            )}
          </NavLink>

          <div className="mt-6 mb-3 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent"></div>
            <span className="text-xs uppercase text-slate-500 font-bold tracking-wider">Actions</span>
            <div className="h-px flex-1 bg-gradient-to-l from-slate-700 to-transparent"></div>
          </div>

          <NavLink
            to="/submit-update"
            className={({ isActive }) => isActive ? activeNavItem : navItem}
          >
            {({ isActive }) => (
              <>
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <svg className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-orange-400'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className={isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}>Submit Update</span>
                {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/request-module"
            className={({ isActive }) => isActive ? activeNavItem : navItem}
          >
            {({ isActive }) => (
              <>
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <svg className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-orange-400'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className={isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}>Request Module</span>
                {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/upgrade-plan"
            className={({ isActive }) => isActive ? activeNavItem : navItem}
          >
            {({ isActive }) => (
              <>
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <svg className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-orange-400'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </div>
                <span className={isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}>Upgrade Plan</span>
                {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) => isActive ? activeNavItem : navItem}
          >
            {({ isActive }) => (
              <>
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <svg className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-orange-400'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className={isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}>Settings</span>
                {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>}
              </>
            )}
          </NavLink>
        </nav>

        <div className="mt-auto pt-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6"></div>
          <LogoutButton />
          <div className="mt-4 text-center text-xs text-slate-500">© 2025 StephensCode</div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-6 py-8 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
