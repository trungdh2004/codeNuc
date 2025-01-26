import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enLanguage from '@/assets/locales/en.language';
import viLanguage from '@/assets/locales/vi.language';

// File ngôn ngữ (ví dụ: tiếng Anh và tiếng Việt)
const resources = {
  en: enLanguage,
  vi: viLanguage,
};

// Khởi tạo i18next
i18n
  .use(LanguageDetector) // Tự phát hiện ngôn ngữ
  .use(initReactI18next) // Tích hợp vào React
  .init({
    resources,
    fallbackLng:'vi', // Ngôn ngữ mặc định
    interpolation: {
      escapeValue: false, // Không cần escape
    },
  });

export default i18n;
