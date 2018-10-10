import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

const DEFAULT_LOCALE = 'zh';

i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    debug: true,

    fallbackLng: DEFAULT_LOCALE,

    ns: ['pages', 'global'],
    defaultNS: 'pages',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        pages: require('./locales/en/pages.json'),
        global: require('./locales/en/global.json'),
      },
      zh: {
        pages: require('./locales/zh/pages.json'),
        global: require('./locales/zh/global.json'),
      },
    },
    react: {
      wait: true,
    },
  });

const changeLang = (lng) => {
  i18n.changeLanguage(lng);
};

const getLang = () => i18n.language;

export default i18n;
export { changeLang, getLang };
