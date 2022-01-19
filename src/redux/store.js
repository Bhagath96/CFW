import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { persistStore } from 'redux-persist';
import persistedReducer from './rootReducer';
import { logger } from 'redux-logger';
const middlewares = [];

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    persistedReducer,
    {},
    composeEnhancer(applyMiddleware(...middlewares))
);

store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);

const persistor = persistStore(store);

export { store, persistor };
