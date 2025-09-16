import React, { useState, useEffect } from 'react';
import { ArrowLeft, ThumbsUp } from 'lucide-react';
import { ISSUE_CATEGORIES ,MOCK_ISSUES} from '../../data/mockData';
import Image from '../Image';

const IssueDetailScreen = ({
  goBack,
  selectedIssue,
  handleCoreport,
  getStatusIcon,
  getStatusColor,
}) => {
  const [coReportCount, setCoReportCount] = useState(selectedIssue?.coreports);
  const [hasCoReported, setHasCoReported] = useState(false);

  useEffect(() => {
    setCoReportCount(selectedIssue?.coreports);
  }, [selectedIssue]);

  const handleCoReportClick = () => {
    if (!hasCoReported) {
      setCoReportCount(coReportCount + 1);
      handleCoreport(selectedIssue?.id);
      setHasCoReported(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center">
        <button onClick={goBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Issue Details</h1>
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
            {getStatusIcon(selectedIssue?.status)}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIssue?.status)}`}>
              {selectedIssue?.status?.replace('-', ' ')}
            </span>
          </div>
        </div>
       <div className='flex justify-center items-center mt-4 h-70 w-70 mx-auto rounded-lg border-2 border-amber-400'>
         <Image
          src={MOCK_ISSUES[selectedIssue?.id - 1]?.image}
          alt={selectedIssue?.title}
          height={70}
          width={70}
          className="rounded-lg"
        />
       </div>
        <div className="bg-white text-black p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-3">Community Support</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-blue-500" />
              <span className="text-lg font-semibold">{coReportCount} people</span>
              <span className="text-gray-600">reported this too</span>
            </div>
            <button
              onClick={handleCoReportClick}
              disabled={hasCoReported}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${hasCoReported ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              <ThumbsUp className="w-4 h-4" />
              {hasCoReported ? 'Co-reported' : 'Co-report'}
            </button>
          </div>
        </div>

        <div className="bg-white text-black p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-2">Assignment</h3>
          <p className="text-gray-600">
            <span className="font-medium">Department:</span> {ISSUE_CATEGORIES[selectedIssue?.category]?.department}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Priority:</span> {ISSUE_CATEGORIES[selectedIssue?.category]?.priority}
          </p>
          {selectedIssue?.assignedTo && (
            <p className="text-gray-600">
              <span className="font-medium">Assigned to:</span> {selectedIssue.assignedTo}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueDetailScreen;
