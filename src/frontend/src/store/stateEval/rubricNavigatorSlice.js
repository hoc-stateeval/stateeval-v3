import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  ids: {
    activeFrameworkNodeId: null,
    activeRubricRowId: null,
  },
};

const rubricNavigatorSlice = createSlice({
  name: 'rubricNavigator',
  initialState,
  reducers: {
    setActiveFrameworkNodeId: (state, action) => {
      return {
        ...state,
        ids: {
          ...state.ids,
          activeFrameworkNodeId: action.payload,
        },
      };
    },
    setActiveRubricRowId: (state, action) => {
      return {
        ...state,
        ids: {
          ...state.ids,
          activeRubricRowId: action.payload,
        },
      };
    },
  },
});

const getActiveFrameworkNodeId = (state) => {
  const { activeFrameworkNodeId } = state.stateEval.rubricNavigator.ids;
  return activeFrameworkNodeId;
};
export const selectActiveFrameworkNodeId = createSelector(
  [getActiveFrameworkNodeId], (id) => {
  return id;
});

const getActiveRubricRowId = (state) => {
  const { activeRubricRowId } = state.stateEval.rubricNavigator.ids;
  return activeRubricRowId;
};
export const selectActiveRubricRowId = createSelector(
  [getActiveRubricRowId], (id) => {
  return id;
});

export const { 
  setActiveFrameworkNodeId, 
  setActiveRubricRowId, 
} = rubricNavigatorSlice.actions;

export default rubricNavigatorSlice.reducer;