import React from 'react';
import { Pin } from 'lucide-react';
import Map from './Map';

const AdminMapScreen = ({ issues }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full bg-gray-200">
    {/* Map View */}
    <div className="lg:col-span-2 bg-black/90 rounded-lg shadow h-[calc(100vh-12rem)] max-sm:h-[calc(100vh-20rem)]">
      <Map 
      className="h-full w-full rounded-lg relative "
      issues={issues} />
    </div>

    {/* Issues List & Legend */}
    <div className="flex flex-col gap-6 ">
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h3 className="font-semibold text-lg mb-4 border-b pb-2">Legend</h3>
        <div className="space-y-2 text-sm">
          <LegendItem color="bg-red-500" text="Critical Priority" />
          <LegendItem color="bg-orange-500" text="High Priority" />
          <LegendItem color="bg-yellow-500" text="Medium Priority" />
          <LegendItem color="bg-green-500" text="Low Priority" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow flex-1 border border-gray-200 mt-2">
        <h3 className="font-semibold text-lg mb-4 border-b pb-2">Issues on Map</h3>
        <div className="space-y-3 overflow-y-auto h-[calc(100%-4rem)] p-4 bg-indigo-50 rounded-lg w-full">
          {issues.map(issue => (
            <div key={issue.id} className="p-3 rounded-lg border flex items-center justify-between hover:bg-gray-50 mt-1 cursor-pointer">
              <div className="flex items-center gap-3">
                <Pin className={`w-5 h-5 ${getPriorityPinColor(issue.priority)}`} />
                <div>
                  <p className="font-medium text-sm text-gray-800">{issue.title}</p>
                  <p className="text-xs text-gray-500">{issue.location}</p>
                </div>
              </div>
              <button className="text-blue-600 text-sm font-semibold hover:underline">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const LegendItem = ({ color, text }) => (
  <div className="flex items-center gap-3">
    <div className={`w-4 h-4 rounded-full ${color}`}></div>
    <span className="text-gray-700">{text}</span>
  </div>
);

const getPriorityPinColor = (priority) => {
  switch (priority) {
    case 'critical': return 'text-red-500';
    case 'high': return 'text-orange-500';
    case 'medium': return 'text-yellow-500';
    default: return 'text-green-500';
  }
};


export default AdminMapScreen;