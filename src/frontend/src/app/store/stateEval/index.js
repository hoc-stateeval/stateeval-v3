import { combineReducers } from '@reduxjs/toolkit';
import userContext from './userContextSlice';

const stateEvalReducers = combineReducers({
  userContext,
});

export default stateEvalReducers;
