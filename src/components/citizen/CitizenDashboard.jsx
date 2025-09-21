import { Bell, Plus, User, ThumbsUp, Globe } from 'lucide-react';
import { ISSUE_CATEGORIES } from '../../data/mockData';
import assets from '../../assets/assets';
import Image from '../Image.jsx';
import BottomNavigation from './BottomNavigation';
import { useLanguage } from '../../i18n/index.jsx';
import { useNavigate } from 'react-router-dom';

const CitizenDashboard = ({
  issues,
  navigateTo,
  switchRole,
  getStatusIcon,
  getStatusColor,
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-150 pb-20">
      <div className="bg-gradient-to-t from-blue-600 to-indigo-400 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-l font-bold">{t('dashboard.title')}</h1>
          <div className="flex gap-2">

            <button
              onClick={() => {
                const currentLang = localStorage.getItem('language') || 'en';
                const newLang = currentLang === 'en' ? 'hi' : 'en';
                localStorage.setItem('language', newLang);
                window.location.reload();
              }}
              className="px-3 py-1 bg-white text-black bg-opacity-20 rounded-full text-xs flex items-center gap-1"
            >
              <Globe className="w-4 h-4" />
              {localStorage.getItem('language') === 'hi' ? 'EN' : 'हिं'}
            </button>
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
          <div className="text-sm opacity-90">{t('dashboard.active')}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{issues.filter(i => i.status === 'resolved').length}</div>
          <div className="text-sm opacity-90">{t('dashboard.resolved')}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{issues.reduce((sum, i) => sum + i.coreports, 0)}</div>
          <div className="text-sm opacity-90">{t('dashboard.coreports')}</div>
        </div>
      </div>
    </div>

    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => navigate('/report-issue')}
          className="bg-indigo-500 text-white p-4 rounded-xl flex flex-col items-center hover:bg-indigo-600 hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-8 h-8 mb-2" />
          <span className="font-medium">{t('dashboard.report_issue')}</span>
        </button>
        <button
          onClick={() => navigate('/my-reports')}
          className="bg-emerald-500 text-white p-4 rounded-xl flex flex-col items-center hover:bg-emerald-400  hover:scale-105 transition-all"
        >
          <User className="w-8 h-8 mb-2" />
          <span className="font-medium">{t('dashboard.my_reports')}</span>
        </button>
        <button
          onClick={() => navigate('/transparency')}
          className="bg-orange-500 text-white p-4 rounded-xl flex flex-col items-center hover:bg-orange-400  hover:scale-105 transition-all"
        >
          <Globe className="w-8 h-8 mb-2" />
          <span className="font-medium">{t('transparency.title')}</span>
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-3">{t('dashboard.recent_issues')}</h2>
      <div className="space-y-3">
        {issues.slice(0, 3).map(issue => (
          <div
            key={issue.id}
            onClick={() => {
              localStorage.setItem('selectedIssue', JSON.stringify(issue));
              navigate(`/issue-detail/${issue.id}`);
            }}
            className="bg-gray-100 text-black p-4 rounded-lg shadow-sm border-1 border-indigo-200 cursor-pointer hover:shadow-md hover:scale-105 hover:border-indigo-300 transition-all duration-200"
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
      <div className='hidden sm:flex justify-center items-center mt-6'>
        <p className='text-sm text-gray-500'>Scan the QR code to view on mobile</p>
      </div>
      <div className='hidden sm:flex justify-center items-center p-2 mt-2 hover:scale-105 transition-all duration-200'>
        <Image src={assets.qrcode} alt='qrcode' className="rounded-lg border-2 border-emerald-300" />
      </div>

    </div>
    
    <BottomNavigation />
  </div>
  );
};

export default CitizenDashboard;
