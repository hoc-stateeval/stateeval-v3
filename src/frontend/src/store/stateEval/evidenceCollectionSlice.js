import { createSelector, createSlice } from '@reduxjs/toolkit';
import { EvidenceCollectionType } from '@lib/enums';

const evidenceCollectionSlice = createSlice({
  name: 'evidenceCollection',
  initialState: {
    viewMode: 'node',
    collectionType: EvidenceCollectionType.UNDEFINED,
    collectionObjectId: null,
    evidencePackageRubricAlignment: null,
    ids: {
      activeFrameworkNodeId: null,
      activeRubricRowId: null,
    },
    buildingEvidencePackage: false,
    selectedEvidenceItemIds: []
  },
  reducers: {
    setActiveCollection: (state, action) => {
      return {
        ...state,
        viewMode:"node",
        collectionType: action.payload.collectionType,
        collectionObjectId: action.payload.collectionObjectId,
        evidencePackageRubricAlignment: null,
        buildingEvidencePackage: false,
        selectedEvidenceItemIds: [],
        ids: {
          ...state.ids,
          activeFrameworkNodeId: action.payload.activeFrameworkNodeId,
          activeRubricRowId: null
        }
      }
    },
    setSelectedEvidenceItemIds: (state, action) => {
      return {
        ...state,
        buildingEvidencePackage: action.payload.length>0,
        selectedEvidenceItemIds: action.payload
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
      return {
        ...state,
        viewMode: 'row',
        evidencePackageRubricAlignment: null,
        buildingEvidencePackage: false,
        selectedEvidenceItemIds: [],
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
        selectedEvidenceItemIds: [],
        ids: {
          ...state.ids,
          activeFrameworkNodeId: action.payload,
          activeRubricRowId: null,
        },
      };
    }
  },
});

const getIds = (state) => (state.stateEval.evidenceCollection.ids);

export const selectEvidencePackageRubricAlignment = createSelector(
  [(state) => {
    const {evidencePackageRubricAlignment } = state.stateEval.evidenceCollection;
    return evidencePackageRubricAlignment;
  }], (rubricAlignment) => {
    return rubricAlignment;
  }
)

export const selectBuildingEvidencePackage = createSelector(
  [(state) => {
    const {buildingEvidencePackage } = state.stateEval.evidenceCollection;
    return buildingEvidencePackage;
  }], (building) => {
    return building;
  }
)

export const selectEvidenceCollectionViewMode = createSelector(
  [(state) => {
    const {viewMode } = state.stateEval.evidenceCollection;
    return viewMode;
  }], (ecViewMode) => {
    return ecViewMode;
  }
)

export const selectActiveFrameworkNodeId = createSelector(
  [(state) => {
    const { activeFrameworkNodeId } = getIds(state);
    return activeFrameworkNodeId;
  }], (id) => {
  return id;
});

export const selectActiveRubricRowId = createSelector(
  [(state) => {
    const { activeRubricRowId } = getIds(state);
    return activeRubricRowId;
  }], (id) => {
  return id;
});

export const selectSelectedEvidenceItemIds = createSelector(
  (state) => {
    return state.stateEval.evidenceCollection.selectedEvidenceItemIds;
  },
  (selectedEvidenceItemIds) => {
    return selectedEvidenceItemIds;
  }
);

export const selectCollectionType = createSelector(
  [(state) => {
    const { collectionType } = state.stateEval.evidenceCollection;
    return collectionType;
  }], (collectionType) => {
  return collectionType;
});

export const selectCollectionObjectId = createSelector(
  [(state) => {
    const { collectionObjectId } = state.stateEval.evidenceCollection;
    return collectionObjectId;
  }], (collectionObjectId) => {
  return collectionObjectId;
});

export const { 
  setActiveCollection,
  setSelectedEvidenceItemIds,
  setEvidencePackageRubricAlignment,
  setActiveFrameworkNodeId,
  setActiveRubricRowId,
} = evidenceCollectionSlice.actions;

export default evidenceCollectionSlice.reducer;
