import { 
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Stack,
} from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';

const evidenceItemStyles = { 
  backgroundColor: `#f2f2f2`,
  color: '#676a6c',
  margin: '10px 0',
  fontSize:'11px'
};

const CollectedEvidenceList = ({evidenceItems, rubricRowId}) => {
  if (!evidenceItems || !evidenceItems[rubricRowId]) {
    return (<></>);
  }

  return (
    <>
    {evidenceItems[rubricRowId].map(x=>(
          <Accordion  key={x.id} sx={{...evidenceItemStyles}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" spacing={2}>
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
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="row" sx={{justifyContent:'space-between'}}>
                  <div>{x.evidenceText}</div>
                  <div>
                    <IconButton><ClearIcon sx={{backgroundColor:'red', color:'white', borderRadius:'50%'}} /></IconButton>
                  </div>
                </Stack>
              </AccordionDetails>
          </Accordion>))
        }
    </>
  );
};

export default CollectedEvidenceList;
