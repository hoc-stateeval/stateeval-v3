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
  selectSelectedEvidenceItems,
  updateSelectedEvidenceItems
} from "@evidence-collection-slice";


import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const CollectedEvidenceList = ({evidenceItems, rubricRowId}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const selectedEvidenceItems = useSelector(selectSelectedEvidenceItems);
  // if (evidenceItems) {
  //   const initialState = evidenceItems[rubricRowId].map(x=>({evidenceItem: x, selected: false}));
  //   dispatch(updateSelectedEvidenceItems(initialState));
  // }

  if (!evidenceItems || !evidenceItems[rubricRowId]) {
    return (<></>);
  }

  const toggleSelection = (evidenceItem) => {
    if (selectedEvidenceItems.length===0) {
      const initialState = evidenceItems[rubricRowId].map(x=>{
        return {evidenceItem: x, selected: (x.id===evidenceItem.id)}
      });
      dispatch(updateSelectedEvidenceItems(initialState));
      return;
    }

    const itemState = selectedEvidenceItems.find(x=>x.evidenceItem.id===evidenceItem.id);

    const selected = itemState.selected;
    const newItems = selectedEvidenceItems.map(x=>{
      if (x.evidenceItem.id===evidenceItem.id) return {evidenceItem: x.evidenceItem, selected: !selected}
      else return x;
    })
    dispatch(updateSelectedEvidenceItems(newItems));
  }

  const getEvidenceStyles = (evidenceItem) => {
    const selected = selectedEvidenceItems.find(x=>x.evidenceItem.id===evidenceItem.id)?.selected;
    return {
      backgroundColor: selected?theme.palette.primary.main:'#f2f2f2',
      color: selected?'white': theme.palette.text.primary,
    };
  }

  return (
    <>
    {evidenceItems[rubricRowId].map((x, i)=>(
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
          {selectedEvidenceItems.find(y=>y.evidenceItem.id === x.id).selected ?
          (<>{selectedEvidenceItems.findIndex((y)=>y.evidenceItem.id===x.id)+1}</>) :
          (<Box>
            <Tooltip title="Delete">
              <IconButton><DeleteRoundedIcon fontSize="small" sx={{}} /></IconButton>
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
