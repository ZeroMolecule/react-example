import i18next from 'i18next';
import locales from 'strings/locales';

const i18n = i18next.init({
  interpolation: {escapeValue: false},
  lng: 'en',
  resources: locales
});

export default i18n;
