import React, { createContext, useContext, useState } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    // Ensure the saved language exists in translations, fallback to 'en'
    return translations[savedLang] ? savedLang : 'en';
  });

  const t = (key) => {
    // Safe access with fallback to English and then to the key itself
    const currentTranslations = translations[language] || translations['en'] || {};
    return currentTranslations[key] || key;
  };

  const switchLanguage = (lang) => {
    // Only switch to supported languages
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};