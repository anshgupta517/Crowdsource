import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/index.jsx';
import BottomNavigation from '../../components/citizen/BottomNavigation';
import { MOCK_ISSUES } from '../../data/mockData';

const TrackStatusPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const filteredIssues = MOCK_ISSUES.filter(issue => 
    issue.id.toString().includes(searchQuery) || 
    issue.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-t from-blue-600 to-indigo-400 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{t('nav.track')}</h1>
          <div className="w-6 h-6"></div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by Issue ID or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      <div className="p-4">
        {selectedIssue ? (
          <IssueTrackingDetail 
            issue={selectedIssue} 
            onBack={() => setSelectedIssue(null)} 
          />
        ) : (
          <div className="space-y-3">
            {filteredIssues.map(issue => (
              <div
                key={issue.id}
                onClick={() => setSelectedIssue(issue)}
                className="bg-white p-4 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">#{issue.id} - {issue.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {issue.location}
                    </p>
                  </div>
                  <StatusBadge status={issue.status} />
                </div>
                <div className="text-xs text-gray-400">
                  Reported on {issue.date}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

const IssueTrackingDetail = ({ issue, onBack }) => {
  const { t } = useLanguage();
  
  const statusSteps = [
    { key: 'reported', label: t('status.reported'), icon: Clock },
    { key: 'assigned', label: t('status.assigned'), icon: CheckCircle },
    { key: 'in_progress', label: t('status.in_progress'), icon: CheckCircle },
    { key: 'resolved', label: t('status.resolved'), icon: CheckCircle }
  ];

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.key === issue.status.replace('-', '_'));
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Search
      </button>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-2">#{issue.id} - {issue.title}</h2>
        <p className="text-gray-600 mb-4">{issue.description}</p>
        
        {/* Progress Tracker */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Progress Status</h3>
          <div className="space-y-4">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= getCurrentStepIndex();
              const isCurrent = index === getCurrentStepIndex();
              
              return (
                <div key={step.key} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="ml-3">
                    <p className={`font-medium ${
                      isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </p>
                    {isCurrent && (
                      <p className="text-sm text-gray-500">Current Status</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Details */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Location</p>
              <p className="font-medium">{issue.location}</p>
            </div>
            <div>
              <p className="text-gray-500">Category</p>
              <p className="font-medium">{issue.category}</p>
            </div>
            <div>
              <p className="text-gray-500">Priority</p>
              <p className="font-medium">{issue.priority}</p>
            </div>
            <div>
              <p className="text-gray-500">Assigned To</p>
              <p className="font-medium">{issue.assignedTo || 'Not assigned'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'reported': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status.replace('-', ' ')}
    </span>
  );
};

export default TrackStatusPage;