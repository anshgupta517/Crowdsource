import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ThumbsUp } from 'lucide-react';
import { ISSUE_CATEGORIES, MOCK_ISSUES } from '../../data/mockData';
import { useLanguage } from '../../i18n/index.jsx';
import Image from '../../components/image';

const IssueDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [issue, setIssue] = useState(null);
  const [coReportCount, setCoReportCount] = useState(0);
  const [hasCoReported, setHasCoReported] = useState(false);

  useEffect(() => {
    // Try to get the issue from localStorage first (if navigated from MyReports)
    const storedIssue = localStorage.getItem('selectedIssue');
    if (storedIssue) {
      const parsedIssue = JSON.parse(storedIssue);
      setIssue(parsedIssue);
      setCoReportCount(parsedIssue.coreports);
      localStorage.removeItem('selectedIssue'); // Clean up
      return;
    }

    // Otherwise, find by ID in MOCK_ISSUES
    const foundIssue = MOCK_ISSUES.find(issue => issue.id === parseInt(id));
    if (foundIssue) {
      setIssue(foundIssue);
      setCoReportCount(foundIssue.coreports);
    } else {
      // Redirect to home if issue not found
      navigate('/');
    }
  }, [id, navigate]);

  const handleCoReportClick = () => {
    if (!hasCoReported) {
      setCoReportCount(coReportCount + 1);
      setHasCoReported(true);
      // You can add toast notification here if needed
    }
  };

  const getStatusIcon = (status) => {
    // Add your status icon logic here or import from utils
    return <span>📍</span>;
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

  if (!issue) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-t from-blue-600 to-indigo-400 text-white p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Issue Details</h1>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="bg-white text-black p-4 rounded-lg shadow-sm border-1 border-indigo-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">{issue.title}</h2>
            <span className="text-2xl">{ISSUE_CATEGORIES[issue.category]?.icon}</span>
          </div>
          <p className="text-gray-600 mb-2">{issue.description}</p>
          <p className="text-sm text-gray-500 mb-3">📍 {issue.location}</p>
          <div className="flex items-center gap-2">
            {getStatusIcon(issue.status)}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
              {issue.status?.replace('-', ' ')}
            </span>
          </div>
        </div>

        {issue.image && (
          <div className='flex justify-center items-center mt-4 h-70 w-70 mx-auto rounded-lg border-2 border-indigo-200'>
            <Image
              src={issue.image}
              alt={issue.title}
              height={70}
              width={70}
              className="rounded-lg"
            />
          </div>
        )}

        <div className="bg-white text-black p-4 rounded-lg shadow-sm border-1 border-indigo-200">
          <h3 className="font-medium mb-3 text-indigo-500">Community Support</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-blue-500" />
              <span className="text-lg font-semibold">{coReportCount} people</span>
              <span className="text-gray-600">reported this too</span>
            </div>
            <button
              onClick={handleCoReportClick}
              disabled={hasCoReported}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-all duration-200 hover:bg-emerald-500 ${hasCoReported ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              <ThumbsUp className="w-4 h-4" />
              {hasCoReported ? 'Co-reported' : 'Co-report'}
            </button>
          </div>
        </div>

        <div className="bg-white text-black p-4 rounded-lg shadow-sm border-1 border-emerald-500">
          <h3 className="font-medium mb-2 text-zinc-900">Assignment</h3>
          <p className="text-gray-700">
            <span className="font-medium">Department:</span> {ISSUE_CATEGORIES[issue.category]?.department}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Priority:</span> {ISSUE_CATEGORIES[issue.category]?.priority}
          </p>
          {issue.assignedTo && (
            <p className="text-gray-700">
              <span className="font-medium">Assigned to:</span> {issue.assignedTo}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueDetailPage;