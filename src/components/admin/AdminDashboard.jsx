
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import AdminIssuesScreen from './AdminIssuesScreen';
import AdminMapScreen from './AdminMapScreen';
import AdminWorkersScreen from './AdminWorkersScreen';
import AdminAnalyticsScreen from './AdminAnalyticsScreen';
import AdminIssueDetailScreen from './AdminIssueDetailScreen';

const AdminDashboard = ({
  issues,
  workers,
  switchRole,
  getPriorityColor,
  getStatusColor,
  getStatusIcon,
  assignIssue,
  updateIssueStatus,
  issuesByCategory,
  issuesByStatus,
  weeklyData,
}) => {
  const [activeScreen, setActiveScreen] = useState('admin-issues');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const navigateTo = (screen) => {
    setActiveScreen(screen);
    setSelectedIssue(null); // Reset selected issue when changing screens
  };

  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue);
    setActiveScreen('admin-issue-detail');
  };

  const goBack = () => {
    setActiveScreen('admin-issues');
    setSelectedIssue(null);
  };

  const filteredIssues = issues.filter(issue => {
    const statusMatch = filterStatus === 'all' || issue.status === filterStatus;
    const categoryMatch = filterCategory === 'all' || issue.category === filterCategory;
    return statusMatch && categoryMatch;
  });

  const renderContent = () => {
    if (selectedIssue && activeScreen === 'admin-issue-detail') {
      return (
        <AdminIssueDetailScreen
          goBack={goBack}
          selectedIssue={selectedIssue}
          workers={workers}
          assignIssue={assignIssue}
          updateIssueStatus={updateIssueStatus}
          getPriorityColor={getPriorityColor}
          getStatusIcon={getStatusIcon}
          getStatusColor={getStatusColor}
        />
      );
    }

    switch (activeScreen) {
      case 'admin-issues':
        return (
          <AdminIssuesScreen
            goBack={() => navigateTo('admin-dashboard')} // Or handle differently
            filteredIssues={filteredIssues}
            issues={issues}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            setSelectedIssue={handleIssueSelect}
            setCurrentScreen={navigateTo} // Used for selecting an issue
            getPriorityColor={getPriorityColor}
            getStatusIcon={getStatusIcon}
            getStatusColor={getStatusColor}
          />
        );
      case 'admin-map':
        return <AdminMapScreen goBack={goBack} issues={issues} />;
      case 'admin-workers':
        return <AdminWorkersScreen goBack={goBack} workers={workers} />;
      case 'admin-analytics':
        return (
          <AdminAnalyticsScreen
            goBack={goBack}
            issuesByCategory={issuesByCategory}
            issuesByStatus={issuesByStatus}
            weeklyData={weeklyData}
          />
        );
      default:
        return (
          <AdminIssuesScreen
            goBack={() => navigateTo('admin-dashboard')} // Or handle differently
            filteredIssues={filteredIssues}
            issues={issues}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            setSelectedIssue={handleIssueSelect}
            setCurrentScreen={navigateTo} // Used for selecting an issue
            getPriorityColor={getPriorityColor}
            getStatusIcon={getStatusIcon}
            getStatusColor={getStatusColor}
          />
        );
    }
  };

  return (
    <AdminLayout
      activeScreen={activeScreen}
      navigateTo={navigateTo}
      switchRole={switchRole}
    >
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminDashboard;
