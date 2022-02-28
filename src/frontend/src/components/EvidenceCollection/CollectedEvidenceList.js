import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useErrorHandler } from 'react-error-boundary';

import { 
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';

import {
  selectActiveEvaluationId
} from "@user-context-slice";

import {
  selectActiveRubricRowId,
  selectSelectedEvidenceItemIds,
  setSelectedEvidenceItemIds,
  selectCollectionType,
  selectCollectionObjectId
} from "@evidence-collection-slice";

import {
  useGetEvidenceItemsForCollectionQuery
} from "@api-slice";

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const CollectedEvidenceList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const errorHandler = useErrorHandler();

  const [evidenceItems, setEvidenceItems] = useState([]);

  const activeEvaluationId = useSelector(selectActiveEvaluationId);
  const selectedEvidenceItemIds = useSelector(selectSelectedEvidenceItemIds);
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

  useEffect(()=> {
    if (!evidenceItemMap) return;
    let evidenceItems = evidenceItemMap[activeRubricRowId];
    if (!evidenceItems) evidenceItems = [];
    setEvidenceItems(evidenceItems);
  }, [evidenceItemMap, activeRubricRowId])

  const evidenceItemIsSelected = (evidenceItem) => {
    return selectedEvidenceItemIds.find(x=>x===evidenceItem.id);
  }

  const toggleSelection = (evidenceItem) => {
    const selected = evidenceItemIsSelected(evidenceItem);
    if (selected) {
      dispatch(setSelectedEvidenceItemIds(selectedEvidenceItemIds.filter(x=>x!==evidenceItem.id)));
    }
    else {
      dispatch(setSelectedEvidenceItemIds([...selectedEvidenceItemIds, evidenceItem.id]));
    }
  }

  const getEvidenceStyles = (evidenceItem) => {
    const selected = evidenceItemIsSelected(evidenceItem);
    return {
      backgroundColor: selected ? theme.palette.primary.main : '#f2f2f2',
      color: selected  ?'white' : theme.palette.text.primary,
    };
  }

  const getSelectedEvidenceItemPosition = (evidenceItem) => {
    return selectedEvidenceItemIds.findIndex(x=>x===evidenceItem.id) + 1;
  }

  const deleteEvidence = (evidenceItem) => {
    // TODO
    // dispatch(setSelectedEvidenceItemIds(selectedEvidenceItemIds.filter(x=>x===evidenceItem.id)));
  };

  if (!evidenceItems) {
    return (<></>)
  }

  return (
    <>
    {evidenceItems.map((x, i)=>(
      <Paper direction="column" key={i}
        onClick={()=> {toggleSelection(x)}}
        sx={{mb:2, p:2, ...getEvidenceStyles(x)}}>
        <Stack direction="row" sx={{justifyContent:'space-between'}}>
          <Stack direction="column" spacing={0}>
            <Box>
                  <strong>Created:&nbsp;</strong>
                  {`${x.creationDateDisplayString} : ${x.createdByDisplayName}`}
            </Box>
            <Box>
              <strong>Source:&nbsp;</strong>
              {x.evidenceCollectionDisplayName}
            </Box>
            <Box>
              <strong>Type:&nbsp;</strong>
              {x.evidenceTypeDisplayName}
            </Box>
          </Stack>
          {evidenceItemIsSelected(x) ?
          (<>{getSelectedEvidenceItemPosition(x)}</>) :
          (<Box>
            <Tooltip title="Delete">
              <IconButton onClick={()=>{ deleteEvidence(x)}} >
                <DeleteRoundedIcon fontSize="small" sx={{}} />
              </IconButton>
            </Tooltip>
            </Box>)
          } 
        </Stack>
       
        <Divider sx={{mt:1,mb:1}}/>
        <Box>{x.evidenceText}</Box>
      </Paper>))
        }
    </>
  );
};

export default CollectedEvidenceList;
