import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ISSUE_CATEGORIES ,MOCK_ISSUES} from '../../data/mockData';
import Image from '../Image';
import assets from '../../assets/assets';

const AdminIssueDetailScreen = ({
  goBack,
  selectedIssue,
  workers,
  assignIssue,
  updateIssueStatus,
  getPriorityColor,
  getStatusIcon,
  getStatusColor,
}) => (
  <div>
    <button onClick={goBack} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 mb-4">
      <ArrowLeft className="w-4 h-4" />
      Back to Issues
    </button>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Issue Details */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{selectedIssue?.title}</h2>
            <p className="text-sm text-gray-500 mt-1">📍 {selectedIssue?.location}</p>
          </div>
          <span className="text-3xl">{ISSUE_CATEGORIES[selectedIssue?.category]?.icon}</span>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedIssue?.status)}`}>
            {selectedIssue?.status?.replace('-', ' ')}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(selectedIssue?.priority)}`}>
            {selectedIssue?.priority} priority
          </span>
        </div>

        <p className="text-gray-700 mb-6">{selectedIssue?.description}</p>

        <div className='w-70 h-50 my-4'>
          <Image
            src={MOCK_ISSUES[selectedIssue?.id - 1]?.image}
            alt={selectedIssue?.title}
            height={200}
            width={200}
            className="rounded-lg"
          />
        </div>

        <div className="text-sm text-gray-500 border-t pt-4 mt-60">
          Reported on {selectedIssue?.date} • {selectedIssue?.coreports} co-reports
        </div>
      </div>

      {/* Right Column: Actions & Assignment */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Assignment</h3>
          {selectedIssue?.assignedTo ? (
            <div>
              <p className="font-semibold text-gray-700">Assigned to: {selectedIssue.assignedTo}</p>
              <p className="text-sm text-gray-500">{ISSUE_CATEGORIES[selectedIssue.category]?.department}</p>

              <div className='mt-2 w-40 h-40 rounded-lg flex justify-center items-center'>
                <Image
                  src={assets.sureshWorker}
                  alt={selectedIssue?.title}
                  height={200}
                  width={200}
                  className="rounded-lg"
                />
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-3">Department: {ISSUE_CATEGORIES[selectedIssue?.category]?.department}</p>
              <select
                onChange={(e) => assignIssue(selectedIssue.id, parseInt(e.target.value))}
                className="w-full p-2 border rounded-lg mb-2 bg-gray-50"
                defaultValue=""
              >
                <option value="" disabled>Select Worker</option>
                {workers
                  .filter(w => w.department === ISSUE_CATEGORIES[selectedIssue?.category]?.department)
                  .map(worker => (
                    <option key={worker.id} value={worker.id}>
                      {worker.name} ({worker.tasksAssigned} active)
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Update Status</h3>
          <div className="space-y-2">
            <button
              onClick={() => updateIssueStatus(selectedIssue.id, 'in-progress')}
              className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Mark In Progress
            </button>
            <button
              onClick={() => updateIssueStatus(selectedIssue.id, 'resolved')}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Mark Resolved
            </button>
            <button className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
              Escalate Priority
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default AdminIssueDetailScreen;