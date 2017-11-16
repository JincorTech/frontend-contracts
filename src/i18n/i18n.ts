import * as i18n from 'i18next';

const ru = {
  common: require('../locales/ru/common.json')
};

const en = {
  common: require('../locales/en/common.json')
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
      common: en.common
    },
    ru: {
      common: ru.common
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
