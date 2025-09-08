import React from 'react';
import { User, CheckCircle, ThumbsUp } from 'lucide-react';

const WorkerDashboard = ({
  issues,
  switchRole,
  setSelectedIssue,
  setCurrentScreen,
  getPriorityColor,
  getStatusColor,
}) => {
    const workerTasks = issues.filter(issue => issue.assignedTo === 'Raj Kumar'); // Mock current worker

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Field Worker</h1>
            <div className="flex gap-2">
              <button 
                onClick={() => switchRole('citizen')}
                className="px-3 py-1 bg-white text-black bg-opacity-20 rounded-full text-xs"
              >
                Citizen
              </button>
              <button 
                onClick={() => switchRole('admin')}
                className="px-3 py-1 bg-white text-black bg-opacity-20 rounded-full text-xs"
              >
                Admin
              </button>
            </div>
          </div>

          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-white text-black bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
              <User className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-medium">Raj Kumar</h2>
            <p className="text-sm opacity-90">Sanitation Department</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{workerTasks.filter(t => t.status === 'assigned').length}</div>
              <div className="text-sm opacity-90">Assigned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{workerTasks.filter(t => t.status === 'in-progress').length}</div>
              <div className="text-sm opacity-90">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm opacity-90">Completed</div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-3">My Tasks</h2>
          <div className="space-y-3">
            {workerTasks.length > 0 ? workerTasks.map(task => (
              <div 
                key={task.id}
                onClick={() => {
                  setSelectedIssue(task);
                  setCurrentScreen('worker-task-detail');
                }}
                className="bg-white text-black p-4 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-500">📍 {task.location}</p>
                    <p className="text-xs text-gray-400">Assigned on {task.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{task.coreports} reports</span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No active tasks</p>
                <p className="text-sm text-gray-400">Great job! All caught up.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

export default WorkerDashboard;