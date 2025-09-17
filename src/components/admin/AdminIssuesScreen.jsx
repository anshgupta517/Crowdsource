import React from 'react';
import { ThumbsUp } from 'lucide-react';
import { ISSUE_CATEGORIES } from '../../data/mockData';

const AdminIssuesScreen = ({
  filteredIssues,
  issues,
  filterStatus,
  setFilterStatus,
  filterCategory,
  setFilterCategory,
  setSelectedIssue,
  getPriorityColor,
  getStatusIcon,
  getStatusColor,
}) => (
  <div className="bg-white rounded-lg shadow">
    {/* Filters */}
    <div className="p-4 border-b">
      <div className="flex items-center gap-4 mb-3">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm w-full md:w-auto"
        >
          <option value="all">All Status</option>
          <option value="reported">Reported</option>
          <option value="assigned">Assigned</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm w-full md:w-auto"
        >
          <option value="all">All Categories</option>
          {Object.keys(ISSUE_CATEGORIES).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="text-sm text-gray-600">
        Showing {filteredIssues.length} of {issues.length} issues
      </div>
    </div>

    {/* Issues List */}
    <div className="p-4 space-y-4 mx-auto">
      {filteredIssues.map(issue => (
        <div
          key={issue.id}
          onClick={() => setSelectedIssue(issue)}
          className="p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all duration-200 max-w-7xl mx-auto hover:scale-101 border-indigo-200 hover:border-indigo-400 hover:bg-gray-200"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{issue.title}</h3>
              <p className="text-sm text-gray-500">{issue.location}</p>
              <p className="text-xs text-gray-400">ID: #{issue.id} • {issue.date}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                {issue.priority}
              </span>
              <span className="text-xl">{ISSUE_CATEGORIES[issue.category]?.icon}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              {getStatusIcon(issue.status)}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                {issue.status.replace('-', ' ')}
              </span>
              {issue.assignedTo && (
                <span className="text-xs text-gray-500">→ {issue.assignedTo}</span>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <ThumbsUp className="w-4 h-4" />
              <span>{issue.coreports}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);


export default AdminIssuesScreen;