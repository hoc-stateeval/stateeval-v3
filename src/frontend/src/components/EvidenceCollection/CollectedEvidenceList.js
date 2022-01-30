import { useSelector, useDispatch } from 'react-redux';

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
  selectActiveRubricRow,
  selectEvidenceItemsForActiveRubricRow,
  selectSelectedEvidenceItems,
  setSelectedEvidenceItems
} from "@evidence-collection-slice";


import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const CollectedEvidenceList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const selectedEvidenceItems = useSelector(selectSelectedEvidenceItems);
  const evidenceItems = useSelector(selectEvidenceItemsForActiveRubricRow);

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
    return (<></>);
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
              <IconButton><DeleteRoundedIcon onClick={()=>{ deSelectEvidence(x)}} fontSize="small" sx={{}} /></IconButton>
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
