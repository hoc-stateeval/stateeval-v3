import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useErrorHandler } from 'react-error-boundary';

import "./evidence-package.css";

import { 
  Box,
  Paper,
  Stack,
} from "@mui/material";

import {
  selectActiveEvaluationId
} from "@user-context-slice";

import {
  selectActiveRubricRowId,
  selectCollectionType,
  selectCollectionObjectId
} from "@evidence-collection-slice";

import {
  useGetEvidenceItemsForCollectionQuery,
  useGetEvidencePackagesForCollectionQuery
} from "@api-slice";

const PackagedEvidenceList = () => {

  const errorHandler = useErrorHandler();

  const [evidencePackages, setEvidencePackages] = useState([]);
  const [evidenceItems, setEvidenceItems] = useState([]);

  const activeEvaluationId = useSelector(selectActiveEvaluationId);
  const activeRubricRowId = useSelector(selectActiveRubricRowId);
  const collectionType = useSelector(selectCollectionType);
  const collectionObjectId = useSelector(selectCollectionObjectId);

  const { data: evidenceItemMap, error: getEvidenceItemMapError } = 
    useGetEvidenceItemsForCollectionQuery({
      collectionType,
      collectionObjectId,
      evaluationId: activeEvaluationId
    });
  if (getEvidenceItemMapError) errorHandler(getEvidenceItemMapError);

  const { data: evidencePackageMap, error: getEvidencePackageMapError } = 
    useGetEvidencePackagesForCollectionQuery({
      collectionType,
      collectionObjectId,
      evaluationId: activeEvaluationId
    });
  if (getEvidencePackageMapError) errorHandler(getEvidencePackageMapError);

  useEffect(()=> {
    if (!evidencePackageMap || !evidenceItemMap) return;

    let evidenceItems = evidenceItemMap[activeRubricRowId];
    if (!evidenceItems) evidenceItems = [];
    setEvidenceItems(evidenceItems);

    let evidencePackages = evidencePackageMap[activeRubricRowId];
    if (!evidencePackages) evidencePackages = [];
    setEvidencePackages(evidencePackages);

  }, [evidencePackageMap, evidenceItemMap, activeRubricRowId])

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
                <Box dangerouslySetInnerHTML={{__html: `${x.rubricStatement}`}}>
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