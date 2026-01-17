import { Outlet, useLocation } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';
import { useState } from 'react';
import Sidebar from './Sidebar';

const getPageTitle = (pathname) => {
  const titles = {
    '/': 'Dashboard',
    '/employees': 'Employees',
    '/attendance': 'Attendance',
  };
  return titles[pathname] || 'Dashboard';
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const sidebarWidth = sidebarOpen ? 288 : 80;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} width={sidebarWidth} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <main
        style={{ marginLeft: `${sidebarWidth}px` }}
        className="min-h-screen transition-all duration-300"
      >
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 border-b border-gray-100 page-padding-x">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <HiMenuAlt2 className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{getPageTitle(location.pathname)}</h2>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="page-padding animate-fadeIn">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
