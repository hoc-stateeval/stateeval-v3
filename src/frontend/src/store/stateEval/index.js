import { combineReducers } from '@reduxjs/toolkit';
import userContext from './userContextSlice';
import rubricNavigator from './rubricNavigatorSlice';

const stateEvalReducers = combineReducers({
  userContext,
  rubricNavigator,
});

export default stateEvalReducers;
