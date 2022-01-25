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

  if (!evidenceItems || !evidenceItems[rubricRowId]) {
    return (<></>);
  }

  const toggleSelection = (id) => {
    if (selectedEvidenceItems.includes(id)) {
      dispatch(updateSelectedEvidenceItems(selectedEvidenceItems.filter(x=>x.id)));
    }
    else {
      dispatch(updateSelectedEvidenceItems([...selectedEvidenceItems, id]));
    }
  }

  const getEvidenceStyles = (id) => {
    const selected = selectedEvidenceItems.includes(id);
    return {
      backgroundColor: selected?theme.palette.primary.main:'#f2f2f2',
      color: selected?'white': theme.palette.text.primary,
    };
  }

  return (
    <>
    {evidenceItems[rubricRowId].map(x=>(
      <Paper direction="column"
        onClick={()=> {toggleSelection(x.id)}}
        sx={{mb:2, p:2, ...getEvidenceStyles(x.id)}}>
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
          {!selectedEvidenceItems.includes(x.id) &&  
          <Box>
          <Tooltip title="Delete">
            <IconButton><DeleteRoundedIcon fontSize="small" sx={{}} /></IconButton>
          </Tooltip>
          </Box>
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
