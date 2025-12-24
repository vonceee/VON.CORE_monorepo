
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, Translation, Translations } from '../types';
import { TRANSLATIONS } from '../locales/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translation;
  availableLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('ENG');
  
  return (
    <LanguageContext.Provider value={{ 
      lang, 
      setLang, 
      t: TRANSLATIONS[lang],
      availableLanguages: Object.keys(TRANSLATIONS) as Language[]
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
