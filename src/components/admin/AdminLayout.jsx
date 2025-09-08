
import React, { useState } from 'react';
import { List, Map, Users, BarChart3, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = ({ children, activeScreen, navigateTo, switchRole }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'admin-issues', icon: List, label: 'All Issues' },
    { id: 'admin-map', icon: Map, label: 'Live Map' },
    { id: 'admin-workers', icon: Users, label: 'Workers' },
    { id: 'admin-analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const Sidebar = () => (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              navigateTo(item.id);
              setSidebarOpen(false); // Close sidebar on navigation
            }}
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
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full">
            <Sidebar />
          </div>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <button
            className="md:hidden text-gray-500 hover:text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 capitalize">
            {activeScreen.replace('admin-', '')}
          </h1>
          <div className="w-6 h-6"></div> {/* Spacer */}
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};


export default AdminLayout;
