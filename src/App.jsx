import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { LanguageProvider } from './i18n/index.jsx';
import './index.css';

// Import the previous app logic as a component
import CivicIssueApp from './components/CivicIssueApp';

// Import new page components
import TrackStatusPage from './pages/citizen/TrackStatusPage';
import AccountPage from './pages/citizen/AccountPage';
import IssueDetailPage from './pages/citizen/IssueDetailPage';
import TransparencyPage from './pages/shared/TransparencyPage';

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Toaster position="bottom-center" />
          <Routes>
            {/* Citizen Routes */}
            <Route path="/" element={<CivicIssueApp initialRole="citizen" />} />
            <Route path="/report-issue" element={<CivicIssueApp initialRole="citizen" initialScreen="report-issue" />} />
            <Route path="/my-reports" element={<CivicIssueApp initialRole="citizen" initialScreen="my-reports" />} />
            <Route path="/issue-detail/:id" element={<IssueDetailPage />} />
            <Route path="/track-status" element={<TrackStatusPage />} />
            <Route path="/account" element={<AccountPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<CivicIssueApp initialRole="admin" />} />
            <Route path="/admin/*" element={<CivicIssueApp initialRole="admin" />} />
            
            {/* Worker Routes */}
            <Route path="/worker" element={<CivicIssueApp initialRole="worker" />} />
            <Route path="/worker/*" element={<CivicIssueApp initialRole="worker" />} />
            
            {/* Shared Routes */}
            <Route path="/transparency" element={<TransparencyPage />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
