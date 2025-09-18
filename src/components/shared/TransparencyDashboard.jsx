import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Eye, Clock, CheckCircle, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '../../i18n/index.jsx';

const TransparencyDashboard = ({ issues }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { t } = useLanguage();
  
  const departmentStats = calculateDepartmentStats(issues);
  const responseTimeStats = calculateResponseTimes(issues);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Eye className="w-6 h-6 text-blue-500" />
          {t('transparency.title')}
        </h2>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {['overview', 'departments', 'response_times', 'public_feedback'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t(`transparency.${tab}`)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <TransparencyCard
            title={t('transparency.total_issues')}
            value={issues.length}
            icon={<TrendingUp className="w-6 h-6" />}
            trend="+12% this month"
            color="bg-blue-500"
          />
          <TransparencyCard
            title={t('transparency.avg_response')}
            value="2.3 hours"
            icon={<Clock className="w-6 h-6" />}
            trend="-30min improvement"
            color="bg-green-500"
          />
          <TransparencyCard
            title={t('transparency.resolution_rate')}
            value="87%"
            icon={<CheckCircle className="w-6 h-6" />}
            trend="+5% this quarter"
            color="bg-purple-500"
          />
          <TransparencyCard
            title={t('transparency.satisfaction')}
            value="4.2/5"
            icon={<Users className="w-6 h-6" />}
            trend="↑ 0.3 improvement"
            color="bg-orange-500"
          />
        </div>
      )}

      {activeTab === 'departments' && (
        <DepartmentTransparency departments={departmentStats} />
      )}

      {activeTab === 'response_times' && (
        <ResponseTimeAnalysis data={responseTimeStats} />
      )}

      {activeTab === 'public_feedback' && (
        <PublicFeedbackView issues={issues} />
      )}
    </div>
  );
};

const TransparencyCard = ({ title, value, icon, trend, color }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-green-600">{trend}</p>
      </div>
      <div className={`${color} text-white p-3 rounded-full`}>
        {icon}
      </div>
    </div>
  </div>
);

const DepartmentTransparency = ({ departments }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-4">Department Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={departments}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="resolved" fill="#10b981" />
          <Bar dataKey="pending" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className="space-y-3">
      {departments.map((dept, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">{dept.name}</h4>
            <span className="text-sm text-gray-500">{dept.efficiency}% efficiency</span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${dept.efficiency}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ResponseTimeAnalysis = ({ data }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-semibold mb-4">Response Time Trends</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timeRange" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#6366f1" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const PublicFeedbackView = ({ issues }) => {
  const feedbackData = issues.filter(issue => issue.feedback).slice(0, 5);
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Recent Public Feedback</h3>
      {feedbackData.length > 0 ? (
        feedbackData.map((issue) => (
          <div key={issue.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{issue.title}</h4>
                <p className="text-sm text-gray-600">{issue.feedback?.comment}</p>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{issue.feedback?.rating}/5</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No public feedback available yet</p>
        </div>
      )}
    </div>
  );
};

// Helper functions
const calculateDepartmentStats = (issues) => {
  const departments = {};
  
  issues.forEach(issue => {
    const dept = issue.category || 'Other';
    if (!departments[dept]) {
      departments[dept] = { resolved: 0, pending: 0, total: 0 };
    }
    departments[dept].total++;
    if (issue.status === 'resolved') {
      departments[dept].resolved++;
    } else {
      departments[dept].pending++;
    }
  });

  return Object.keys(departments).map(name => ({
    name: name.length > 10 ? name.substring(0, 10) + '...' : name,
    resolved: departments[name].resolved,
    pending: departments[name].pending,
    efficiency: departments[name].total > 0 ? Math.round((departments[name].resolved / departments[name].total) * 100) : 0
  }));
};

const calculateResponseTimes = (issues) => {
  const timeRanges = {
    '< 1 hour': 0,
    '1-4 hours': 0,
    '4-24 hours': 0,
    '> 24 hours': 0
  };

  issues.forEach(() => {
    const responseTime = Math.random() * 48; // Mock response time in hours
    if (responseTime < 1) timeRanges['< 1 hour']++;
    else if (responseTime < 4) timeRanges['1-4 hours']++;
    else if (responseTime < 24) timeRanges['4-24 hours']++;
    else timeRanges['> 24 hours']++;
  });

  return Object.keys(timeRanges).map(timeRange => ({
    timeRange,
    count: timeRanges[timeRange]
  }));
};

export default TransparencyDashboard;