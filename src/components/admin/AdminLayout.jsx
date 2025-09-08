
import React from 'react';
import { List, Map, Users, BarChart3, LogOut } from 'lucide-react';

const AdminLayout = ({ children, activeScreen, navigateTo, switchRole }) => {
  const menuItems = [
    { id: 'admin-issues', icon: List, label: 'All Issues' },
    { id: 'admin-map', icon: Map, label: 'Live Map' },
    { id: 'admin-workers', icon: Users, label: 'Workers' },
    { id: 'admin-analytics', icon: BarChart3, label: 'Analytics' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                activeScreen === item.id
                  ? 'bg-indigo-600'
                  : 'hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700 space-y-2">
          <button
            onClick={() => switchRole('citizen')}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left text-sm hover:bg-gray-700"
          >
            <LogOut className="w-5 h-5" />
            Switch to Citizen
          </button>
          <button
            onClick={() => switchRole('worker')}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left text-sm hover:bg-gray-700"
          >
            <LogOut className="w-5 h-5" />
            Switch to Worker
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md p-4">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize">
            {activeScreen.replace('admin-', '')}
          </h1>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
