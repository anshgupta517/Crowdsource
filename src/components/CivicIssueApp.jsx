import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
    ISSUE_CATEGORIES,
    MOCK_ISSUES,
    MOCK_WORKERS,
    issuesByCategory,
    issuesByStatus,
    weeklyData
} from '../data/mockData.js';

// Import Components
import CitizenDashboard from './citizen/CitizenDashboard';
import ReportIssueScreen from './citizen/ReportIssueScreen';
import MyReportsScreen from './citizen/MyReportsScreen';
import IssueDetailScreen from './citizen/IssueDetailScreen';
import AdminDashboard from './admin/AdminDashboard';
import WorkerDashboard from './worker/WorkerDashboard';
import WorkerTaskDetail from './worker/WorkerTaskDetail';

// Import Icons
import { Clock, CheckCircle, AlertTriangle, UserCheck } from 'lucide-react';

const CivicIssueApp = ({ initialRole = 'citizen', initialScreen = 'dashboard' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [currentRole, setCurrentRole] = useState(() => {
    return initialRole || localStorage.getItem('currentRole') || 'citizen';
  });
  const [currentScreen, setCurrentScreen] = useState(initialScreen);

  // Update screen based on route changes
  useEffect(() => {
    if (initialScreen) {
      setCurrentScreen(initialScreen);
    }
  }, [initialScreen, location.pathname]);
  const [issues, setIssues] = useState(() => {
    const savedIssues = localStorage.getItem('issues');
    return savedIssues ? JSON.parse(savedIssues) : MOCK_ISSUES;
  });
  const [workers, setWorkers] = useState(() => {
    const savedWorkers = localStorage.getItem('workers');
    return savedWorkers ? JSON.parse(savedWorkers) : MOCK_WORKERS;
  });
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [newIssue, setNewIssue] = useState(() => {
    const savedNewIssue = localStorage.getItem('newIssue');
    return savedNewIssue ? JSON.parse(savedNewIssue) : {
      title: '',
      category: '',
      subcategory: '',
      description: '',
      location: '',
      photo: null
    };
  });
  const [reportStep, setReportStep] = useState(() => {
    const savedReportStep = localStorage.getItem('reportStep');
    return savedReportStep ? parseInt(savedReportStep) : 1;
  });
  const [filterStatus, setFilterStatus] = useState(() => localStorage.getItem('filterStatus') || 'all');
  const [filterCategory, setFilterCategory] = useState(() => localStorage.getItem('filterCategory') || 'all');

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('issues', JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem('workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('currentRole', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('newIssue', JSON.stringify(newIssue));
  }, [newIssue]);

  useEffect(() => {
    localStorage.setItem('reportStep', reportStep.toString());
  }, [reportStep]);

  useEffect(() => {
    localStorage.setItem('filterStatus', filterStatus);
  }, [filterStatus]);

  useEffect(() => {
    localStorage.setItem('filterCategory', filterCategory);
  }, [filterCategory]);

  // Navigation functions
  const navigateTo = (screen) => {
    if (screen === 'report-issue') {
      navigate('/report-issue');
    } else if (screen === 'my-reports') {
      navigate('/my-reports');
    } else {
      setCurrentScreen(screen);
    }
  };
  
  const switchRole = (role) => {
    setCurrentRole(role);
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'worker') {
      navigate('/worker');
    } else {
      navigate('/');
    }
  };

  const goBack = () => {
    if (currentScreen === 'report-issue') {
      if (reportStep > 1) {
        setReportStep(reportStep - 1);
      } else {
        navigate('/');
        setCurrentScreen('dashboard');
        setReportStep(1);
        setNewIssue({ title: '', category: '', subcategory: '', description: '', location: '', photo: null });
      }
    } else {
      navigate('/');
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
    toast.success(`Issue assigned to ${worker.name}`);
  };

  const updateIssueStatus = (issueId, newStatus) => {
    setIssues(issues.map(issue =>
      issue.id === issueId
        ? { ...issue, status: newStatus }
        : issue
    ));
    toast.success(`Issue status updated to ${newStatus.replace('-', ' ')}`);
  };

  const handleCoreport = (issueId) => {
    setIssues(issues.map(issue =>
      issue.id === issueId
        ? { ...issue, coreports: issue.coreports + 1 }
        : issue
    ));
    toast.success('Co-reported successfully!');
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
    navigate('/');
    setCurrentScreen('dashboard');
    setReportStep(1);
    setNewIssue({ title: '', category: '', subcategory: '', description: '', location: '', photo: null });
    toast.success('Issue reported successfully!');
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