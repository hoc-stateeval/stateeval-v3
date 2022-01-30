import { useSelector, useDispatch } from "react-redux";

import { 
  Grid
} from "@mui/material";

import {
  selectEvidenceCollectionViewMode,
  selectSelectedEvidenceItems,
} from "@evidence-collection-slice";



import RubricNavigator from './RubricNavigator';
import RubricRowView from './RubricRowView';
import FrameworkNodeView from './FrameworkNodeView';
import EvidencePackageBuilder from "./EvidencePackageBuilder";

const EvidenceCollection = ({evidenceItems}) => {
  
  const ecViewMode = useSelector(selectEvidenceCollectionViewMode);
  const selectedEvidenceItems = useSelector(selectSelectedEvidenceItems);

  if (!evidenceItems) {
    return (<></>);
  }

  let showRubricNavigator = true;
  for (const next of selectedEvidenceItems) {
    if (next.selected) {
      showRubricNavigator = false;
      break;
    }
  }

  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs>
        {ecViewMode === 'row' && <RubricRowView />}
        {ecViewMode === 'node' && <FrameworkNodeView />}
      </Grid>
      <Grid item xs={4}>
          {showRubricNavigator && <RubricNavigator evidenceItems={evidenceItems} /> }
          {!showRubricNavigator && <EvidencePackageBuilder />}
      </Grid>
    </Grid>
    </>
  );
};

export default EvidenceCollection;
