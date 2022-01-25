import { combineReducers } from '@reduxjs/toolkit';
import userContext from './userContextSlice';
import evidenceCollection from './evidenceCollectionSlice';

const stateEvalReducers = combineReducers({
  userContext,
  evidenceCollection
});

export default stateEvalReducers;
