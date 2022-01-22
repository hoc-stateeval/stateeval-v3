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

const getActiveFrameworkNode = (state) => {
  const { activeFrameworkNodeId } = state.stateEval.rubricNavigator.ids;
  if (!activeFrameworkNodeId) return null;
  const { activeFrameworkId } = state.stateEval.userContext.ids;
  const { frameworks } = state.stateEval.userContext.entities;
  const framework = frameworks[activeFrameworkId];
  return framework.frameworkNodes.find(x=>x.id===activeFrameworkNodeId);
};

export const selectActiveFrameworkNode = createSelector(
  [getActiveFrameworkNode], (frameworkNode) => {
  return frameworkNode;
});

export const selectActiveFrameworkNodeId = createSelector(
  [getActiveFrameworkNode], (frameworkNode) => {
  return frameworkNode?.id;
});

const getActiveRubricRow = (state) => {
  const { activeFrameworkNodeId, activeRubricRowId } = state.stateEval.rubricNavigator.ids;
  if (!activeFrameworkNodeId || !activeRubricRowId) return null;
  const { activeFrameworkId } = state.stateEval.userContext.ids;
  const { frameworks } = state.stateEval.userContext.entities;
  const framework = frameworks[activeFrameworkId];
  let frameworkNode = framework.frameworkNodes.find(x=>x.id===activeFrameworkNodeId);
  if (frameworkNode) {
    return frameworkNode.rubricRows.find(x=>x.id===activeRubricRowId);
  }
  else {
    frameworkNode = framework.frameworkNodes[0];
    return frameworkNode.rubricRows[0];
  }
};

export const selectActiveRubricRow = createSelector(
  [getActiveRubricRow], (rubricRow) => {
  return rubricRow;
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