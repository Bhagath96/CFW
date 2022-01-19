import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { PROJECT_CONFIG_PROPS } from '../common/constants';
import { getProjectProps } from '../utils/ConfigUtils';
// import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
let selectedLanguage = JSON.parse(localStorage.getItem('selectedLanguage'));
import EN_IN from './locales/en_IN';
import ML_IN from './locales/ml_IN';
import MR_IN from './locales/mr_IN';

const { en: enOverRides = {}, ml: mlOverRides = {}, mr: mrOverRides = {}, defaultLanguage = 'en-IN' } = getProjectProps(PROJECT_CONFIG_PROPS.I18N);

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    // .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    // .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources: {
            en: {
                translation: { ...EN_IN, ...enOverRides }
            },
            ml: {
                translation: { ...ML_IN, ...mlOverRides }
            },
            mr: {
                translation: { ...MR_IN, ...mrOverRides }
            }
        },
        lng: selectedLanguage?.locale || defaultLanguage,
        fallbackLng: 'en-IN',
        debug: true,

        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    });


export default i18n;
