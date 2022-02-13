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
import { debounce } from 'debounce';
import { saveState } from '@lib/persist';
import stateEval from './stateEval';
import { apiSlice } from './apiSlice';

const middleware = [];

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require(`redux-logger`);
  const logger = createLogger({ collapsed: (getState, action, logEntry) => !logEntry.error });
  middleware.push(logger);
}

middleware.push(apiSlice.middleware);

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  stateEval,
  [apiSlice.reducerPath]: apiSlice.reducer
}))

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
});

// store.subscribe(
//   // we use debounce to save the state once each 800ms
//   // for better performances in case multiple changes occur in a short time
//   debounce(() => {
//     saveState(store.getState());
//   }, 800)
// );

export default store;
