
import { createSelector, createSlice } from '@reduxjs/toolkit';

const evidenceCollectionSlice = createSlice({
  name: 'evidenceCollection',
  initialState: {
    selectedEvidenceItems: []
  },
  reducers: {
    updateSelectedEvidenceItems: (state, action) => {
      return {
        ...state,
        selectedEvidenceItems: action.payload
      };
    },
  },
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
  updateSelectedEvidenceItems
} = evidenceCollectionSlice.actions;

export default evidenceCollectionSlice.reducer;
