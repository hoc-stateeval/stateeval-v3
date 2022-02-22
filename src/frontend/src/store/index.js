import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit';
import stateEval from './stateEval';
import { apiSlice } from './apiSlice';
import { clearTokens } from '../lib/tokenService';
import { persistStore } from 'redux-persist';

const middleware = [];

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require(`redux-logger`);
  const logger = createLogger({ collapsed: (getState, action, logEntry) => !logEntry.error });
  middleware.push(logger);
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  stateEval,
  [apiSlice.reducerPath]: apiSlice.reducer
}))

const rootReducer = (state, action) => {
  if (action.type === 'userContext/logout') { 
    state = undefined;
    localStorage.removeItem('persist:root');
    clearTokens();
    window.location.replace("/login")
    return persistedReducer( state, action);
  }
  return persistedReducer(state, action);
};


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(apiSlice.middleware)
});

export default store;
