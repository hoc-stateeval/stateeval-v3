
import { useSelector } from 'react-redux';

import "./evidence-package.css";

import { 
  Box,
  Paper,
  Stack,
} from "@mui/material";

import {
  selectEvidencePackagesForActiveRubricRow,
  selectEvidenceItemsForActiveRubricRow,
} from "@evidence-collection-slice";

const PackagedEvidenceList = () => {

  const evidencePackages = useSelector(selectEvidencePackagesForActiveRubricRow);
  const evidenceItems = useSelector(selectEvidenceItemsForActiveRubricRow);

  return (
    <>
      {evidencePackages.map((x, i)=>(
        <Paper className="evidence-package" direction="column" key={i} >
         <Stack direction="column" sx={{justifyContent:'space-between'}}>
            <Stack className="header" direction="row" spacing={0}>
              <Box className="header-title">
                    <strong>Created:&nbsp;</strong>
                    {`${x.creationDateDisplayString} : ${x.createdByDisplayName}`}
              </Box>
              <Box className="header-title">
                <strong>Source:&nbsp;</strong>
                {x.evidenceCollectionDisplayName}
              </Box>
            </Stack>
            <Stack direction="row" className="rating">
              <Box className="performance-level performance-level-default">
                {x.performanceLevelDisplayName[0]}
              </Box>
              <Stack className="statement" direction="column">
                <Box>
                  {x.rubricStatement}
                </Box>
              </Stack>
            </Stack>
            <Stack direction="row">
              <Box>
              {
                x.evidenceItemIds.map((evidenceItemId, i) => {
                  const evidenceItem = evidenceItems.find(x=>x.id===evidenceItemId);
                  return (
                    <Stack direction="row" key={i}
                      spacing={2}>
                      <Stack direction="column" spacing={0} sx={{p:2}}>
                        <Box>
                              <strong>Created:&nbsp;</strong>
                              {`${evidenceItem.creationDateDisplayString} : ${evidenceItem.createdByDisplayName}`}
                        </Box>
                        <Box>
                          <strong>Source:&nbsp;</strong>
                          {evidenceItem.evidenceCollectionDisplayName}
                        </Box>
                        <Box>
                          <strong>Type:&nbsp;</strong>
                          {evidenceItem.evidenceTypeDisplayName}
                        </Box>
                      </Stack>
                    </Stack>
                  )
                }
                )}
              </Box>
            </Stack>
          </Stack>
        </Paper>
        ))
      }
    </>
  )
};

export default PackagedEvidenceList;