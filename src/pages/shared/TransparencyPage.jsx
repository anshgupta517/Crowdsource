import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../i18n/index.jsx';
import TransparencyDashboard from '../../components/shared/TransparencyDashboard';
import { MOCK_ISSUES } from '../../data/mockData';

const TransparencyPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 w-full ">
      {/* Mobile-optimized header */}
      <div className="bg-gradient-to-t from-blue-600 to-indigo-400 text-white p-3 md:p-6 sticky top-0 z-10 w-full">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-white/10 rounded-lg transition-colors touch-manipulation"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center flex-1 mx-2 sm:mx-4 truncate">
            {t('transparency.title')}
          </h1>
          <div className="w-9 h-9 sm:w-10 sm:h-10"></div>
        </div>
      </div>

      {/* Mobile-optimized content */}
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <TransparencyDashboard issues={MOCK_ISSUES} />
      </div>
    </div>
  );
};

export default TransparencyPage;