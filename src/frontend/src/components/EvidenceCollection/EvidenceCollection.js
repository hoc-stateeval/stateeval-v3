import { useSelector } from "react-redux";

import { 
  Grid
} from "@mui/material";

import {
  selectEvidenceCollectionViewMode
} from "@user-context-slice";


import RubricNavigator from './RubricNavigator';
import RubricRowView from './RubricRowView';
import FrameworkNodeView from './FrameworkNodeView';

const EvidenceCollection = () => {

  const ecViewMode = useSelector(selectEvidenceCollectionViewMode);

  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs>
        {ecViewMode === 'row' && <RubricRowView />}
        {ecViewMode === 'node' && <FrameworkNodeView />}
      </Grid>
      <Grid item xs={4}>
          <RubricNavigator />
      </Grid>
    </Grid>
    </>
  );
};

export default EvidenceCollection;
