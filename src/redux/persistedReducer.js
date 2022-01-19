import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import storageSession from 'redux-persist/lib/storage/session';
import reducer from '../modules/common/reducer';

import rootReducer from './rootReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'common']
};
const persistCommon = {
    key: 'common',
    storage: storageSession
};
const persistCommonReducer = persistReducer(persistCommon, reducer);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default { persistedReducer, persistCommonReducer };
