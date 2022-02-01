import { useSelector } from "react-redux";

import { 
  Grid
} from "@mui/material";

import {
  selectBuildingEvidencePackage,
  selectEvidenceCollectionViewMode,
} from "@evidence-collection-slice";



import RubricNavigator from './RubricNavigator';
import RubricRowView from './RubricRowView';
import FrameworkNodeView from './FrameworkNodeView';
import EvidencePackageBuilder from "./EvidencePackageBuilder";

const EvidenceCollection = ({evidenceItems}) => {
  
  const ecViewMode = useSelector(selectEvidenceCollectionViewMode);
  const buildingEvidencePackage = useSelector(selectBuildingEvidencePackage);

  if (!evidenceItems) {
    return (<></>);
  }

  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs>
        {ecViewMode === 'row' && <RubricRowView />}
        {ecViewMode === 'node' && <FrameworkNodeView />}
      </Grid>
      <Grid item xs={4}>
          {!buildingEvidencePackage && <RubricNavigator evidenceItems={evidenceItems} /> }
          {buildingEvidencePackage && <EvidencePackageBuilder />}
      </Grid>
    </Grid>
    </>
  );
};

export default EvidenceCollection;
