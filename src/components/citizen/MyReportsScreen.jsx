import React from 'react';
import { ArrowLeft, ThumbsUp } from 'lucide-react';
import { ISSUE_CATEGORIES } from '../../data/mockData';
import BottomNavigation from './BottomNavigation';
import { useNavigate } from 'react-router-dom';

const MyReportsScreen = ({
  goBack,
  issues,
  getStatusColor,
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen pb-20">
      <div className="bg-gradient-to-t from-blue-600 to-indigo-400 text-white p-4 flex items-center">
        <button onClick={() => navigate('/')} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">My Reports</h1>
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          {issues.map(issue => (
            <div 
              key={issue.id}
              onClick={() => {
                // Store the selected issue in localStorage for the detail page
                localStorage.setItem('selectedIssue', JSON.stringify(issue));
                navigate(`/issue-detail/${issue.id}`);
              }}
              className="bg-gray-100 text-black p-4 rounded-lg shadow-sm border cursor-pointer border-indigo-200 hover:shadow-md transition-all duration-200 hover:scale-105 hover:border-indigo-300"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{issue.title}</h3>
                  <p className="text-sm text-gray-500">{issue.location}</p>
                  <p className="text-xs text-gray-400">Reported on {issue.date}</p>
                </div>
                <span className="text-lg">{ISSUE_CATEGORIES[issue.category]?.icon}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                  {issue.status.replace('-', ' ')}
                </span>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{issue.coreports} co-reports</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default MyReportsScreen;
