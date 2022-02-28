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
  selectSelectedEvidenceItems,
  setSelectedEvidenceItems,
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
  const selectedEvidenceItems = useSelector(selectSelectedEvidenceItems);
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
    setEvidenceItems(evidenceItemMap[activeRubricRowId]);
  }, [evidenceItemMap, activeRubricRowId])

 
  const toggleSelection = (evidenceItem) => {
    const itemState = selectedEvidenceItems.find(x=>x.evidenceItem.id===evidenceItem.id);
    const selected = itemState.selected;
    const newItems = selectedEvidenceItems.map(x=>{
      if (x.evidenceItem.id===evidenceItem.id) return {evidenceItem: x.evidenceItem, selected: !selected}
      else return x;
    });
    dispatch(setSelectedEvidenceItems(newItems));
  }

  const evidenceItemIsSelected = (evidenceItem) => {
    return selectedEvidenceItems.find(x=>x.evidenceItem.id===evidenceItem.id)?.selected;
  }

  const getEvidenceStyles = (evidenceItem) => {
    const selected = evidenceItemIsSelected(evidenceItem);
    return {
      backgroundColor: selected ? theme.palette.primary.main : '#f2f2f2',
      color: selected  ?'white' : theme.palette.text.primary,
    };
  }

  const getSelectedEvidenceItemPosition = (evidenceItem) => {
    return selectedEvidenceItems.findIndex((y)=>y.evidenceItem.id===evidenceItem.id) + 1;
  }

  const deSelectEvidence = (evidenceItem) => {
    dispatch(setSelectedEvidenceItems(selectedEvidenceItems
      .map(x=>(x.evidenceItem.id===evidenceItem.id?{...x, selected: false} : x))))
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
              <IconButton onClick={()=>{ deSelectEvidence(x)}} >
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
