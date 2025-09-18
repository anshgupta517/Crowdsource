import React from 'react';
import { ArrowLeft, User, Settings, Globe, Bell, Shield, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/index.jsx';
import BottomNavigation from '../../components/citizen/BottomNavigation';

const AccountPage = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  const menuItems = [
    {
      icon: User,
      title: 'Profile Information',
      subtitle: 'Manage your personal details',
      action: () => console.log('Profile')
    },
    {
      icon: Globe,
      title: 'Language / भाषा',
      subtitle: `Current: ${language === 'en' ? 'English' : 'हिंदी'}`,
      action: () => setLanguage(language === 'en' ? 'hi' : 'en')
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      action: () => console.log('Notifications')
    },
    {
      icon: Shield,
      title: 'Privacy Settings',
      subtitle: 'Control your data and privacy',
      action: () => console.log('Privacy')
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      action: () => console.log('Help')
    },
    {
      icon: Settings,
      title: 'App Settings',
      subtitle: 'Configure app preferences',
      action: () => console.log('Settings')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-t from-blue-600 to-indigo-400 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{t('nav.account')}</h1>
          <div className="w-6 h-6"></div>
        </div>

        {/* User Profile Section */}
        <div className="text-center py-4">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-10 h-10" />
          </div>
          <h2 className="text-lg font-semibold">John Doe</h2>
          <p className="text-sm opacity-90">john.doe@email.com</p>
          <p className="text-xs opacity-75">Member since Jan 2025</p>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className="w-full bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 text-left"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  </div>
                  <div className="text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Your Impact</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">5</p>
              <p className="text-xs text-gray-500">Issues Reported</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">3</p>
              <p className="text-xs text-gray-500">Resolved</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">12</p>
              <p className="text-xs text-gray-500">Co-reports</p>
            </div>
          </div>
        </div>

        {/* Community Transparency Link */}
        <div className="mt-4">
          <button
            onClick={() => navigate('/transparency')}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
          >
            View Community Transparency Dashboard
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AccountPage;