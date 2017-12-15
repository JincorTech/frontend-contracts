import * as i18n from 'i18next';

const ru = {
  common: require('../locales/ru/common.json'),
  app: require('../locales/ru/app.json')
};

const en = {
  common: require('../locales/en/common.json'),
  app: require('../locales/en/app.json')
};

export const config = {
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'ru'],
  debug: process.env.NODE_ENV === 'development',
  react: {
    wait: true,
    nsMode: 'default'
  },
  resources: {
    en: {
      common: en.common,
      app: en.app
    },
    ru: {
      common: ru.common,
      app: ru.app
    }
  },
  ns: ['common'],
  defaultNS: 'common',
  detection: {
    order: ['querystring', 'localStorage'],
    lookupQuerystring: 'lang',
    lookupLocalStorage: 'i18nextLng',
    caches: ['localStorage']
  }
};

const instance = i18n
  .init(config);

export default instance;
