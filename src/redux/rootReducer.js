import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import notifications from 'react-redux-notify';
import _ from 'lodash';
import * as modules from '../modules';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import storageSession from 'redux-persist/lib/storage/session';
import commonReducer from '../modules/common/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'common', 'dfg', 'enrollment'] // only user node needs to be persisted
};
const persistCommon = {
  key: 'common',
  storage: storageSession
};
const reducers = {
  form,
  notifications
};
_.values(modules).forEach(module => {
  if (module.STATE_REDUCER_KEY && module.reducer) {
    reducers[module.STATE_REDUCER_KEY] = module.reducer;
  }
});

const appReducer = combineReducers({
  commonReducer: persistReducer(persistCommon, commonReducer),
  ...reducers
});
const rootReducer = (state, action) => appReducer(state, action);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
