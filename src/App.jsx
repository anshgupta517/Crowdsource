import React, { useState } from 'react';
import {
    ISSUE_CATEGORIES,
    MOCK_ISSUES,
    MOCK_WORKERS,
    issuesByCategory,
    issuesByStatus,
    weeklyData
} from './data/mockData.js';
import './index.css';

// Import Components
import CitizenDashboard from './components/citizen/CitizenDashboard';
import ReportIssueScreen from './components/citizen/ReportIssueScreen';
import MyReportsScreen from './components/citizen/MyReportsScreen';
import IssueDetailScreen from './components/citizen/IssueDetailScreen';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminIssuesScreen from './components/admin/AdminIssuesScreen';
import AdminIssueDetailScreen from './components/admin/AdminIssueDetailScreen';
import AdminMapScreen from './components/admin/AdminMapScreen';
import AdminWorkersScreen from './components/admin/AdminWorkersScreen';
import AdminAnalyticsScreen from './components/admin/AdminAnalyticsScreen';
import WorkerDashboard from './components/worker/WorkerDashboard';
import WorkerTaskDetail from './components/worker/WorkerTaskDetail';

// Import Icons
import { Clock, CheckCircle, AlertTriangle, UserCheck } from 'lucide-react';

const CivicIssueApp = () => {
  const [currentRole, setCurrentRole] = useState('citizen'); // citizen, admin, worker
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [issues, setIssues] = useState(MOCK_ISSUES);
  const [workers, setWorkers] = useState(MOCK_WORKERS);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [newIssue, setNewIssue] = useState({
    title: '',
    category: '',
    subcategory: '',
    description: '',
    location: '',
    photo: null
  });
  const [reportStep, setReportStep] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Navigation functions
  const navigateTo = (screen) => setCurrentScreen(screen);
  const switchRole = (role) => {
    setCurrentRole(role);
    setCurrentScreen('dashboard');
  };

  const goBack = () => {
    if (currentScreen === 'report-issue') {
      if (reportStep > 1) {
        setReportStep(reportStep - 1);
      } else {
        setCurrentScreen('dashboard');
        setReportStep(1);
        setNewIssue({ title: '', category: '', subcategory: '', description: '', location: '', photo: null });
      }
    } else {
      setCurrentScreen('dashboard');
    }
  };

  // Issue management functions
  const assignIssue = (issueId, workerId) => {
    const worker = workers.find(w => w.id === workerId);
    setIssues(issues.map(issue =>
      issue.id === issueId
        ? { ...issue, status: 'assigned', assignedTo: worker.name }
        : issue
    ));
  };

  const updateIssueStatus = (issueId, newStatus) => {
    setIssues(issues.map(issue =>
      issue.id === issueId
        ? { ...issue, status: newStatus }
        : issue
    ));
  };

  const handleCoreport = (issueId) => {
    setIssues(issues.map(issue =>
      issue.id === issueId
        ? { ...issue, coreports: issue.coreports + 1 }
        : issue
    ));
  };

  // Report issue functions (citizen)
  const handleCategorySelect = (category) => {
    setNewIssue({ ...newIssue, category, subcategory: '' });
    setReportStep(2);
  };

  const handleSubcategorySelect = (subcategory) => {
    setNewIssue({ ...newIssue, subcategory });
    setReportStep(3);
  };

  const handleSubmitIssue = () => {
    const issue = {
      id: issues.length + 1,
      title: newIssue.title || `${newIssue.subcategory} Issue`,
      category: newIssue.category,
      subcategory: newIssue.subcategory,
      description: newIssue.description,
      location: newIssue.location || 'Current Location',
      status: 'reported',
      coreports: 1,
      date: new Date().toISOString().split('T')[0],
      priority: ISSUE_CATEGORIES[newIssue.category].priority,
      assignedTo: null,
      coordinates: { lat: 28.5355, lng: 77.3910 }
    };

    setIssues([issue, ...issues]);
    setCurrentScreen('dashboard');
    setReportStep(1);
    setNewIssue({ title: '', category: '', subcategory: '', description: '', location: '', photo: null });
  };

  // Utility functions
  const getStatusIcon = (status) => {
    switch (status) {
      case 'reported': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'assigned': return <UserCheck className="w-4 h-4 text-blue-500" />;
      case 'in-progress': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'reported': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Filter issues
  const filteredIssues = issues.filter(issue => {
    if (filterStatus !== 'all' && issue.status !== filterStatus) return false;
    if (filterCategory !== 'all' && issue.category !== filterCategory) return false;
    return true;
  });


  // Main render based on role and screen
  const renderScreen = () => {
    if (currentRole === 'admin') {
      return <AdminDashboard 
        issues={issues}
        workers={workers}
        issuesByCategory={issuesByCategory}
        issuesByStatus={issuesByStatus}
        weeklyData={weeklyData}
        switchRole={switchRole}
        getPriorityColor={getPriorityColor}
        getStatusColor={getStatusColor}
        getStatusIcon={getStatusIcon}
        assignIssue={assignIssue}
        updateIssueStatus={updateIssueStatus}
      />;
    } else if (currentRole === 'worker') {
      switch (currentScreen) {
        case 'dashboard': return <WorkerDashboard
          issues={issues}
          switchRole={switchRole}
          setSelectedIssue={setSelectedIssue}
          setCurrentScreen={setCurrentScreen}
          getPriorityColor={getPriorityColor}
          getStatusColor={getStatusColor}
        />;
        case 'worker-task-detail': return <WorkerTaskDetail
          goBack={goBack}
          selectedIssue={selectedIssue}
          updateIssueStatus={updateIssueStatus}
          getPriorityColor={getPriorityColor}
          getStatusColor={getStatusColor}
        />;
        default: return <WorkerDashboard
          issues={issues}
          switchRole={switchRole}
          setSelectedIssue={setSelectedIssue}
          setCurrentScreen={setCurrentScreen}
          getPriorityColor={getPriorityColor}
          getStatusColor={getStatusColor}
        />;
      }
    } else {
      // Citizen role
      switch (currentScreen) {
        case 'dashboard': return <CitizenDashboard
          issues={issues}
          navigateTo={navigateTo}
          switchRole={switchRole}
          setSelectedIssue={setSelectedIssue}
          setCurrentScreen={setCurrentScreen}
          getStatusIcon={getStatusIcon}
          getStatusColor={getStatusColor}
        />;
        case 'report-issue': return <ReportIssueScreen
          goBack={goBack}
          reportStep={reportStep}
          newIssue={newIssue}
          handleCategorySelect={handleCategorySelect}
          handleSubcategorySelect={handleSubcategorySelect}
          setNewIssue={setNewIssue}
          handleSubmitIssue={handleSubmitIssue}
        />;
        case 'my-reports': return <MyReportsScreen
          goBack={goBack}
          issues={issues}
          setSelectedIssue={setSelectedIssue}
          setCurrentScreen={setCurrentScreen}
          getStatusColor={getStatusColor}
        />;
        case 'issue-detail': return <IssueDetailScreen
          goBack={goBack}
          selectedIssue={selectedIssue}
          handleCoreport={handleCoreport}
          getStatusIcon={getStatusIcon}
          getStatusColor={getStatusColor}
        />;
        default: return <CitizenDashboard
          issues={issues}
          navigateTo={navigateTo}
          switchRole={switchRole}
          setSelectedIssue={setSelectedIssue}
          setCurrentScreen={setCurrentScreen}
          getStatusIcon={getStatusIcon}
          getStatusColor={getStatusColor}
        />;
      }
    }
  };

  return (
    <div className={currentRole === 'admin' ? 'bg-gray-100 min-h-screen' : 'max-w-md mx-auto bg-white text-black min-h-screen'}>
      {renderScreen()}
    </div>
  );
};

export default CivicIssueApp;
