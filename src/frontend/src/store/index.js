import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  createTransform,
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

const middleware = [];

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require(`redux-logger`);
  const logger = createLogger({ collapsed: (getState, action, logEntry) => !logEntry.error });
  middleware.push(logger);
}

const frameworkByIdMaps = createTransform(
  (inboundState, key) => {

    if (key === 'api') {
      let newState = {
        ...inboundState
      }
      if (Object.keys(inboundState.queries)>0) {
        for (const [objectKey, objectValue] of Object.entries(inboundState.api.queries)) {
          if (objectKey.includes("getFrameworkById")) {
            let framework = objectValue;
            const rubricRowMap =  framework.frameworkNodes.reduce((acc, node) => {
              for (const rubricRow of node.rubricRows) {
                acc[rubricRow.id] = rubricRow;
              }
              return acc;
            }, {});

            const frameworkNodeMap =  framework.frameworkNodes.reduce((acc, node) => {
              acc[node.id] = node;
              return acc;
            }, {});

            newState = {
              ...inboundState,
              queries: {
                ...inboundState.queries[objectKey].data,
                objectKey: {
                  ...objectKey,
                  data: {
                    ...inboundState.queries[objectKey].data,
                    frameworkNodeMap: frameworkNodeMap,
                    rubricRowMap: rubricRowMap
                  }
                }
              }
            }
          }
        }
      }
      return newState;
    }
  
    return {
      ...inboundState,
    }
  },
  (outboundState, key) => {
    if (key === 'api') {
      let newState = {
        ...outboundState
      }

      if (Object.keys(outboundState.queries)>0) {
        for (const [objectKey, objectValue] of Object.entries(outboundState.api.queries)) {
          if (objectKey.includes("getFrameworkById")) {

            newState = {
              ...outboundState,
              queries: {
                ...outboundState.queries[objectKey].data,
                objectKey: {
                  ...objectKey,
                  data: {
                    ...outboundState.queries[objectKey].data,
                    frameworkNodeMap: null,
                    rubricRowMap: null
                  }
                }
              }
            }
          }
        }
      }
      return newState;
    }

    return {
      ...outboundState,
    }
  }
)

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  transforms: [frameworkByIdMaps]
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
