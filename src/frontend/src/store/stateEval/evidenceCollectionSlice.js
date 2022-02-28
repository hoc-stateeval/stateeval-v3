import { createSelector, createSlice } from '@reduxjs/toolkit';
import { EvidenceCollectionType } from '@lib/enums';

// const createEvidenceItemAPI = async (evidenceItem) => {
//   const url = `evidence-items/${evidenceItem.collectionType}/${evidenceItem.collectionObjectId}`;
//   const response = await post(url, evidenceItem);
//   const data = await response.data;
//   return data;
// }

// const createEvidencePackageAPI = async (evidencePackage) => {
//   const url = `evidence-packages/${evidencePackage.evaluationId}`;
//   const response = await post(url, evidencePackage);
//   const data = await response.data;
//   return data;
// }

// export const createEvidencePackage = createAsyncThunk(
//   'evidenceCollection/createEvidencePackage',
//   async (data, {dispatch, getState}) => {

//     const { evidenceCollection : ecState, userContext: ucState } = getState().stateEval;

//     const isPublic = ecState.collectionType === EvidenceCollectionType.YEAR_TO_DATE;

//     try {
//       const evidencePackage = await createEvidencePackageAPI({
//         collectionType: ecState.createdEvidenceCollectionType,
//         collectionObjectId: ecState.collectionObjectId,
//         evaluationId: ucState.ids.activeEvaluationId,
//         createdByUserId: ucState.currentUser.id,
//         rubricRowId: ecState.ids.activeRubricRowId,
//         rubricStatement: data.rubricStatement,
//         performanceLevel: data.performanceLevel,
//         evidenceItemIds: data.evidenceItemIds,
//         public: isPublic,
//       });

//       return evidencePackage;
//     } catch (err) {
//       data.errorHandler(err);
//       throw err;
//     }
//   }
// );

const evidenceCollectionSlice = createSlice({
  name: 'evidenceCollection',
  initialState: {
    viewMode: 'node',
    evidenceItemMap: {},
    evidencePackageMap: {},
    createdEvidenceCollectionType: null,
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
    setActiveCollection: (state, action) => {
      return {
        ...state,
        viewMode:"node",
        collectionType: action.payload.collectionType,
        collectionObjectId: action.payload.collectionObjectId,
        evidencePackageRubricAlignment: null,
        buildingEvidencePackage: false,
        selectedEvidenceItems: [],
        ids: {
          ...state.ids,
          activeFrameworkNodeId: action.payload.activeFrameworkNodeId,
          activeRubricRowId: null
        }
      }
    },
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

export const selectSelectedEvidenceItems = createSelector(
  (state) => {
    return state.stateEval.evidenceCollection.selectedEvidenceItems;
  },
  (selectedEvidenceItems) => {
    return selectedEvidenceItems;
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
  setSelectedEvidenceItems,
  setEvidencePackageRubricAlignment,
  setActiveFrameworkNodeId,
  setActiveRubricRowId,
} = evidenceCollectionSlice.actions;

export default evidenceCollectionSlice.reducer;
