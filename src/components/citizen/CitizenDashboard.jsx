import { Bell, Plus, User, ThumbsUp } from 'lucide-react';
import { ISSUE_CATEGORIES } from '../../data/mockData';
import assets from '../../assets/assets';
import Image from '../Image'

const CitizenDashboard = ({
  issues,
  navigateTo,
  switchRole,
  setSelectedIssue,
  setCurrentScreen,
  getStatusIcon,
  getStatusColor,
}) => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-l font-bold">Civic Reporter(citizen app)</h1>
        <div className="flex gap-2">
          <button
            onClick={() => switchRole('admin')}
            className="px-3 py-1 bg-white text-black bg-opacity-20 rounded-full text-xs"
          >
            See Admin Prototype
          </button>
          <button className="p-2 bg-white text-black bg-opacity-20 rounded-full">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{issues.filter(i => i.status === 'reported').length}</div>
          <div className="text-sm opacity-90">Active</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{issues.filter(i => i.status === 'resolved').length}</div>
          <div className="text-sm opacity-90">Resolved</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{issues.reduce((sum, i) => sum + i.coreports, 0)}</div>
          <div className="text-sm opacity-90">Co-reports</div>
        </div>
      </div>
    </div>

    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => navigateTo('report-issue')}
          className="bg-blue-500 text-white p-4 rounded-xl flex flex-col items-center hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-8 h-8 mb-2" />
          <span className="font-medium">Report Issue</span>
        </button>
        <button
          onClick={() => navigateTo('my-reports')}
          className="bg-green-500 text-white p-4 rounded-xl flex flex-col items-center hover:bg-green-600 transition-colors"
        >
          <User className="w-8 h-8 mb-2" />
          <span className="font-medium">My Reports</span>
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-3">Recent Issues Nearby</h2>
      <div className="space-y-3">
        {issues.slice(0, 3).map(issue => (
          <div
            key={issue.id}
            onClick={() => {
              setSelectedIssue(issue);
              setCurrentScreen('issue-detail');
            }}
            className="bg-white text-black p-4 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{issue.title}</h3>
                <p className="text-sm text-gray-500">{issue.location}</p>
              </div>
              <span className="text-lg">{ISSUE_CATEGORIES[issue.category]?.icon}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(issue.status)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                  {issue.status.replace('-', ' ')}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <ThumbsUp className="w-4 h-4" />
                <span>{issue.coreports}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center items-center mt-6'>
        <p className='text-sm text-gray-500'>Scan the QR code to view on mobile</p>
      </div>
      <div className='flex justify-center items-center'>
        <Image src={assets.qrcode} alt='qrcode'/>
      </div>

    </div>
  </div>
);

export default CitizenDashboard;
