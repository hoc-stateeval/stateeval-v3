
import { createSelector, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ThunkState, EvidenceCollectionType } from '@lib/enums';
import { get, post } from '@lib/api';

const createEvidenceItem = async (evidenceItem) => {
  const url = `evidence-items/${evidenceItem.collectionType}/${evidenceItem.collectionObjectId}`;
  const response = await post(url, evidenceItem);
  const data = await response.data.data;
  return data;
}

export const addOtherEvidence = createAsyncThunk(
  'evidenceCollection/addOtherEvidence',
  async (data, {dispatch, getState}) => {

    const { evidenceCollection : ecState, userContext: ucState } = getState().stateEval;

    const isPublic = ecState.collectionType === EvidenceCollectionType.YEAR_TO_DATE;
    const evidenceItem = await createEvidenceItem({
      ...data,
      collectionType: ecState.createdEvidenceCollectionType,
      collectionObjectId: ecState.collectionObjectId,
      evaluationId: ucState.ids.activeEvaluationId,
      createdByUserId: ucState.currentUser.id,
      rubricRowId: ecState.ids.activeRubricRowId,
      codedEvidenceClientId: null,
      userPromptResponseId: null,
      public: isPublic,
    });

    return evidenceItem;
  }
);

const getYearToDateEvidenceCollection = async (evaluationId) => {
  const response = await get(`evidence-collections/ytd/${evaluationId}`);
  const data = await response.data.data;
  return data;
};

export const initYearToDateEC = createAsyncThunk(
  'evidenceCollection/initYearToDateEC',
  async (_, { dispatch, getState }) => {

    const { userContext : ucState } = getState().stateEval;
    const activeEvaluationId = ucState.ids.activeEvaluationId;
    const activeFramework = ucState.entities.frameworks[ucState.ids.activeFrameworkId];
    const activeFrameworkNodeId = activeFramework.frameworkNodes[0].id;

    const evidenceCollection = await getYearToDateEvidenceCollection(activeEvaluationId);
    const evidenceItemMap = evidenceCollection.evidenceItems.reduce((acc,next)=> {
      const rubricRowId = next.rubricRowId;
      if (!acc[rubricRowId]) acc[rubricRowId] = [];
      acc[rubricRowId].push(next);
      return acc;
    }, {});

    return {
      createdEvidenceCollectionType: EvidenceCollectionType.OTHER_EVIDENCE,
      collectionType: EvidenceCollectionType.YEAR_TO_DATE,
      activeEvaluationId,
      activeFrameworkNodeId,
      evidenceItemMap,
    }
  }
);

const evidenceCollectionSlice = createSlice({
  name: 'evidenceCollection',
  initialState: {
    viewMode: 'node',
    evidenceItemMap: [],
    collectionType: EvidenceCollectionType.UNDEFINED,
    collectionObjectId: null,
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
      }, false);

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
    },
    setActiveRubricRowId: (state, action) => {

      const rubricRowId = action.payload;
      let selectedEvidenceItems = [];
      const evidenceItems = state.evidenceItemMap[rubricRowId];
      if (evidenceItems) {
        selectedEvidenceItems = evidenceItems.map(x=>{
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
          activeRubricRowId: rubricRowId,
        },
      };
    },
    setActiveFrameworkNodeId: (state, action) => {
   
      return {
        ...state,
        viewMode: 'node',
        evidencePackageRubricAlignment: null,
        buildingEvidencePackage: false,
        selectedEvidenceItems: [],
        ids: {
          ...state.ids,
          activeFrameworkNodeId: action.payload,
          activeRubricRowId: null,
        },
      };
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(addOtherEvidence.pending, (state, action) => {
      state.thunkState = ThunkState.PENDING;
    })
    .addCase(addOtherEvidence.fulfilled, (state, action) => {
      const evidenceItem = action.payload;
  
      if (!state.evidenceItemMap[evidenceItem.rubricRowId]) {
        state.evidenceItemMap[evidenceItem.rubricRowId] = [evidenceItem];
      }
      else {
        state.evidenceItemMap[evidenceItem.rubricRowId].push(evidenceItem);
      }
      state.thunkState = ThunkState.COMPLETE;
    })
    .addCase(addOtherEvidence.rejected, (state, action) => {
      state.thunkState = ThunkState.FAILED;
      state.errorMessage = action.payload;
    })
    .addCase(initYearToDateEC.pending, (state, action) => {
      state.thunkState = ThunkState.PENDING;
    })
    .addCase(initYearToDateEC.rejected, (state, action) => {
      state.thunkState = ThunkState.FAILED;
      state.errorMessage = action.payload;
    })
    .addCase(initYearToDateEC.fulfilled, (state, action) => {

      state.viewMode = 'node';
      state.createdEvidenceCollectionType = action.payload.createdEvidenceCollectionType;
      state.collectionType = action.payload.collectionType;
      state.collectionObjectId = action.payload.activeEvaluationId;
      state.evidenceItemMap = action.payload.evidenceItemMap;
      state.evidencePackageRubricAlignment = null;
      state.buildingEvidencePackage = false;
      state.selectedEvidenceItems = [];
      state.ids = {
          ...state.ids,
          activeRubricRowId: null,
          activeFrameworkNodeId: action.payload.activeFrameworkNodeId,
      };
      state.thunkState = ThunkState.COMPLETE;
    })
  }
});

const getUserContextEntities = (state) => (state.stateEval.userContext.entities);
const getUserContextIds = (state) => (state.stateEval.userContext.ids);

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

const getEvidenceItemMap = (state) => {
  const evidenceItemMap = state.stateEval.evidenceCollection.evidenceItemMap;
  return evidenceItemMap;
}

export const selectEvidenceItemMap = createSelector(
  getEvidenceItemMap,
  (evidenceItemMap) => {
    return evidenceItemMap;
  }
);

const getEvidenceItemsForActiveRubricRow = (state) => {
  const { activeRubricRowId } = getIds(state);
  const evidenceItems = state.stateEval.evidenceCollection.evidenceItemMap[activeRubricRowId];
  return evidenceItems?evidenceItems:[];
}

export const selectEvidenceItemsForActiveRubricRow = createSelector(
  getEvidenceItemsForActiveRubricRow,
  (evidenceItems) => {
    return evidenceItems;
  }
);

export const { 
  setSelectedEvidenceItems,
  setEvidencePackageRubricAlignment,
  setActiveFrameworkNodeId,
  setActiveRubricRowId,
} = evidenceCollectionSlice.actions;

export default evidenceCollectionSlice.reducer;
