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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-t from-blue-600 to-indigo-400 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{t('transparency.title')}</h1>
          <div className="w-6 h-6"></div>
        </div>
      </div>

      <div className="p-4">
        <TransparencyDashboard issues={MOCK_ISSUES} />
      </div>
    </div>
  );
};

export default TransparencyPage;