
import { createSelector, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ThunkState } from '@lib/enums';

export const setActiveRubricRowId = createAsyncThunk(
  'evidenceCollection/setActiveRubricRow',
  async ({evidenceItems, rubricRowId }, { dispatch, getState }) => {

    const { evidenceCollection: state } = getState().stateEval;

    const selectedEvidenceItems = evidenceItems[rubricRowId].map(x=>{
      return {evidenceItem: x, selected: (x.id===rubricRowId)}
    });

    return {
      ...state,
      viewMode: 'row',
      selectedEvidenceItems: selectedEvidenceItems,
      ids: {
        ...state.ids,
        activeRubricRowId: rubricRowId,
      },
    };
  }
);

export const setActiveFrameworkNodeId = createAsyncThunk(
  'evidenceCollection/setActiveFrameworkNodeId',
  async (frameworkNodeId, { dispatch, getState }) => {

    const { evidenceCollection: state } = getState().stateEval;
    const selectedEvidenceItems = [];

    const newState = {
      ...state,
      viewMode: 'node',
      selectedEvidenceItems: selectedEvidenceItems,
      ids: {
        ...state.ids,
        activeFrameworkNodeId: frameworkNodeId,
        activeRubricRowId: null,
      },
    };

    return newState;
  }
);


const evidenceCollectionSlice = createSlice({
  name: 'evidenceCollection',
  initialState: {
    viewMode: 'node',
    ids: {
      activeFrameworkNodeId: null,
      activeRubricRowId: null,
    },
    // collectedEvidenceItems: [],
    // packagedEvidenceItems: [],
    selectedEvidenceItems: []
  },
  reducers: {
    setSelectedEvidenceItems: (state, action) => {
      return {
        ...state,
        selectedEvidenceItems: action.payload
      };
    },
  },
  extraReducers: {
    [setActiveFrameworkNodeId.pending]: (state, action) => ({
      ...state,
      thunkState: ThunkState.RUNNING,
    }),
    [setActiveFrameworkNodeId.fulfilled]: (state, action) => ({
      ...action.payload,
      thunkState: ThunkState.COMPLETE,
    }),
    [setActiveFrameworkNodeId.rejected]: (state, action) => ({
      ...state,
      thunkState: ThunkState.FAILED,
      errorMessage: action.payload,
    }),
    [setActiveRubricRowId.pending]: (state, action) => ({
      ...state,
      thunkState: ThunkState.RUNNING,
    }),
    [setActiveRubricRowId.fulfilled]: (state, action) => ({
      ...action.payload,
      thunkState: ThunkState.COMPLETE,
    }),
    [setActiveRubricRowId.rejected]: (state, action) => ({
      ...state,
      thunkState: ThunkState.FAILED,
      errorMessage: action.payload,
    }),
  }
});

const getUserContextEntities = (state) => (state.stateEval.userContext.entities);
const getUserContextIds = (state) => (state.stateEval.userContext.ids);

const getEntities = (state) => (state.stateEval.evidenceCollection.entities);
const getIds = (state) => (state.stateEval.evidenceCollection.ids);

const getActiveFrameworkNode = (state) => {
  const { activeFrameworkNodeId } = getIds(state);
  if (!activeFrameworkNodeId) return null;
  const { activeFrameworkId } = getUserContextIds(state);
  const { frameworks } = getUserContextEntities(state);
  const framework = frameworks[activeFrameworkId];
  return framework.frameworkNodes.find(x=>x.id===activeFrameworkNodeId);
};

const getEvidenceCollectionViewMode = (state) => {
  const {viewMode } = state.stateEval.evidenceCollection;
  return viewMode;
}

export const selectEvidenceCollectionViewMode = createSelector(
  [getEvidenceCollectionViewMode], (ecViewMode) => {
    return ecViewMode;
  }
)

export const selectActiveFrameworkNode = createSelector(
  [getActiveFrameworkNode], (frameworkNode) => {
  return frameworkNode;
});

export const selectActiveFrameworkNodeId = createSelector(
  [getActiveFrameworkNode], (frameworkNode) => {
  return frameworkNode?.id;
});

const getActiveRubricRow = (state) => {
  const { activeFrameworkNodeId, activeRubricRowId } = getIds(state);
  if (!activeFrameworkNodeId || !activeRubricRowId) return null;
  const { activeFrameworkId } = getUserContextIds(state);
  const { frameworks } = getUserContextEntities(state);
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
  const { activeRubricRowId } = getIds(state);
  return activeRubricRowId;
};

export const selectActiveRubricRowId = createSelector(
  [getActiveRubricRowId], (id) => {
  return id;
});


const getSelectedEvidenceItems = (state) => {
  return state.stateEval.evidenceCollection.selectedEvidenceItems;
}

export const selectSelectedEvidenceItems = createSelector(
  getSelectedEvidenceItems,
  (selectedEvidenceItems) => {
    return selectedEvidenceItems;
  }
);

export const { 
  setSelectedEvidenceItems,
} = evidenceCollectionSlice.actions;

export default evidenceCollectionSlice.reducer;
