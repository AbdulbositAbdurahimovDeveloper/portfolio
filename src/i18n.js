import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './i18n/en.json';
import uzTranslation from './i18n/uz.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {translation: enTranslation},
            uz: {translation: uzTranslation},
        },
        fallbackLng: 'en', // Agar til topilmasa, ingliz tilini ishlat
        interpolation: {
            escapeValue: false
        }
    }).then(r => console.log('i18n initialized', r));

 export default i18n;