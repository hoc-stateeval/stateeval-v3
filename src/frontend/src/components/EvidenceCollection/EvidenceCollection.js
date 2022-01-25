import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { 
  Grid
} from "@mui/material";

import {
  selectEvidenceCollectionViewMode,
  setEvidenceCollectionViewMode
} from "@user-context-slice";


import {
  selectSelectedEvidenceItems,
  updateSelectedEvidenceItems,
} from "@evidence-collection-slice";


import RubricNavigator from './RubricNavigator';
import RubricRowView from './RubricRowView';
import FrameworkNodeView from './FrameworkNodeView';
import EvidencePackageBuilder from "./EvidencePackageBuilder";

const EvidenceCollection = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const initializeEvidenceCollectionState = () => {
  //     dispatch(setEvidenceCollectionViewMode('node'));
  //     dispatch(updateSelectedEvidenceItems([]));
  //   }
  //   return initializeEvidenceCollectionState;
  // });
  
  const ecViewMode = useSelector(selectEvidenceCollectionViewMode);
  const selectedEvidenceItems = useSelector(selectSelectedEvidenceItems);

  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs>
        {ecViewMode === 'row' && <RubricRowView />}
        {ecViewMode === 'node' && <FrameworkNodeView />}
      </Grid>
      <Grid item xs={4}>
          {selectedEvidenceItems.length===0 && <RubricNavigator />}
          {selectedEvidenceItems.length>0 && <EvidencePackageBuilder />}
      </Grid>
    </Grid>
    </>
  );
};

export default EvidenceCollection;
