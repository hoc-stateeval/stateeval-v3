
import { createSelector, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ThunkState } from '@lib/enums';
import { get } from '@lib/api';

//  const getEvidenceItemsForCollection = async (evaluationId) => {
//   const response = await get( `evidence-items/${evaluationId}/`);
//   const data = await response.data.data;
//   return data;
// };

export const initializeEvidenceCollectionState = createAsyncThunk(
  'evidenceCollection/initializeEvidenceCollectionState',
  async (collectionParams, { dispatch, getState }) => {

    const { evidenceCollection: state } = getState().stateEval;
    // const { activeEvaluationId } = getState().stateEval.userContext.ids;

    // const evidenceItems = await getEvidenceItemsForCollection(activeEvaluationId);
    // const evidenceItemMap = evidenceItems.reduce((acc,next)=> {
    //   const rubricRowId = next.rubricRowId;
    //   if (!acc[rubricRowId]) acc[rubricRowId] = [];
    //   acc[rubricRowId].push(next);
    //   return acc;
    // }, {});
  
    const newState = {
      ...state,
      viewMode: 'node',
      evidencePackageRubricAlignment: null,
      buildingEvidencePackage: false,
      selectedEvidenceItems: [],
      collectionParams: collectionParams,
      ids: {
        ...state.ids,
        activeRubricRowId: null,
        activeFrameworkNodeId: null,
      },
    };

    return newState;
  }
);

export const setActiveRubricRowId = createAsyncThunk(
  'evidenceCollection/setActiveRubricRow',
  async (data, { dispatch, getState }) => {

    const { evidenceCollection: state } = getState().stateEval;

    let selectedEvidenceItems = [];
    if (data.evidenceItems) {
      selectedEvidenceItems = data.evidenceItems.map(x=>{
        return {evidenceItem: x, selected: false}
      });
    }

    return {
      ...state,
      viewMode: 'row',
      evidencePackageRubricAlignment: null,
      buildingEvidencePackage: false,
      selectedEvidenceItems: selectedEvidenceItems,
      ids: {
        ...state.ids,
        activeRubricRowId: data.rubricRowId,
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
      evidencePackageRubricAlignment: null,
      buildingEvidencePackage: false,
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
    evidencePackageRubricAlignment: null,
    ids: {
      activeFrameworkNodeId: null,
      activeRubricRowId: null,
    },
    buildingEvidencePackage: false,
    selectedEvidenceItems: []
  },
  reducers: {
    setSelectedEvidenceItems: (state, action) => {
      const selectedEvidence = action.payload.reduce((selected, next)=> {
        if (next.selected) selected = true;
        return selected;
      }, false)
      return {
        ...state,
        buildingEvidencePackage: selectedEvidence,
        selectedEvidenceItems: action.payload
      };
    },
    setEvidencePackageRubricAlignment: (state, action) => {
      return {
        ...state,
        evidencePackageRubricAlignment: action.payload,
      }
    }
  },
  extraReducers: {
    [initializeEvidenceCollectionState.pending]: (state, action) => ({
      ...state,
      thunkState: ThunkState.RUNNING,
    }),
    [initializeEvidenceCollectionState.fulfilled]: (state, action) => ({
      ...action.payload,
      thunkState: ThunkState.COMPLETE,
    }),
    [initializeEvidenceCollectionState.rejected]: (state, action) => ({
      ...state,
      thunkState: ThunkState.FAILED,
      errorMessage: action.payload,
    }),
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


const getEvidencePackageRubricAlignment = (state) => {
  const {evidencePackageRubricAlignment } = state.stateEval.evidenceCollection;
  return evidencePackageRubricAlignment;
}

export const selectEvidencePackageRubricAlignment = createSelector(
  [getEvidencePackageRubricAlignment], (rubricAlignment) => {
    return rubricAlignment;
  }
)
const getBuildingEvidencePackage = (state) => {
  const {buildingEvidencePackage } = state.stateEval.evidenceCollection;
  return buildingEvidencePackage;
}

export const selectBuildingEvidencePackage = createSelector(
  [getBuildingEvidencePackage], (building) => {
    return building;
  }
)

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

const getCollectionParams = (state) => {
  const {collectionParams } = state.stateEval.evidenceCollection;
  return collectionParams;
}

export const selectCollectionParams = createSelector(
  [getCollectionParams], (params) => {
    return params;
  }
)

export const { 
  setSelectedEvidenceItems,
  setEvidencePackageRubricAlignment,
} = evidenceCollectionSlice.actions;

export default evidenceCollectionSlice.reducer;
