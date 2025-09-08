import React from 'react';
import { UserCheck, UserX, Star } from 'lucide-react';

const AdminWorkersScreen = ({ workers }) => (
  <div>
    {/* KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <WorkerKpiCard 
        title="Total Workers" 
        value={workers.length} 
        icon={<UserCheck className="w-6 h-6 text-blue-500" />} 
      />
      <WorkerKpiCard 
        title="Active Workers" 
        value={workers.filter(w => w.status === 'active').length} 
        icon={<UserCheck className="w-6 h-6 text-green-500" />} 
      />
      <WorkerKpiCard 
        title="Busy Workers" 
        value={workers.filter(w => w.status === 'busy').length} 
        icon={<UserX className="w-6 h-6 text-orange-500" />} 
      />
    </div>

    {/* Workers Table */}
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {workers.map(worker => (
            <tr key={worker.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{worker.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-700">{worker.department}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  worker.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {worker.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {worker.tasksAssigned} active / {worker.tasksCompleted} completed
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-700">{worker.rating.toFixed(1)}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-4">Assign</button>
                <button className="text-gray-600 hover:text-gray-900">Profile</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const WorkerKpiCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div className="bg-gray-100 p-3 rounded-full">
        {icon}
      </div>
    </div>
  </div>
);


export default AdminWorkersScreen;