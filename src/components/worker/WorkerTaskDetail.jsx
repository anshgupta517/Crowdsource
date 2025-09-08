import React from 'react';
import { ArrowLeft, Camera, AlertTriangle, CheckCircle, ThumbsUp } from 'lucide-react';
import { ISSUE_CATEGORIES } from '../../data/mockData';

const WorkerTaskDetail = ({
  goBack,
  selectedIssue,
  updateIssueStatus,
  getPriorityColor,
  getStatusColor,
}) => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4 flex items-center">
        <button onClick={goBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Task Details</h1>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="bg-white text-black p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">{selectedIssue?.title}</h2>
            <span className="text-2xl">{ISSUE_CATEGORIES[selectedIssue?.category]?.icon}</span>
          </div>
          <p className="text-gray-600 mb-2">{selectedIssue?.description}</p>
          <p className="text-sm text-gray-500 mb-3">📍 {selectedIssue?.location}</p>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(selectedIssue?.priority)}`}>
              {selectedIssue?.priority} priority
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIssue?.status)}`}>
              {selectedIssue?.status?.replace('-', ' ')}
            </span>
          </div>
        </div>

        <div className="bg-white text-black p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-3">Update Status</h3>
          <div className="space-y-3">
            <button 
              onClick={() => updateIssueStatus(selectedIssue.id, 'in-progress')}
              className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-5 h-5" />
              Start Working
            </button>
            
            <button className="w-full bg-gray-100 border-2 border-dashed border-gray-300 text-gray-600 p-8 rounded-lg hover:bg-gray-50 flex flex-col items-center">
              <Camera className="w-8 h-8 mb-2" />
              <span>Take Progress Photo</span>
            </button>
            
            <button 
              onClick={() => updateIssueStatus(selectedIssue.id, 'resolved')}
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Mark Complete
            </button>
          </div>
        </div>

        <div className="bg-white text-black p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-2">Citizen Feedback</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ThumbsUp className="w-4 h-4" />
            <span>{selectedIssue?.coreports} citizens reported this issue</span>
          </div>
        </div>
      </div>
    </div>
  );

export default WorkerTaskDetail;