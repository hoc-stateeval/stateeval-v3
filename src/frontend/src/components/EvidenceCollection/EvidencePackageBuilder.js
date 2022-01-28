import { useSelector, useDispatch } from 'react-redux';

import { 
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import {
  selectSelectedEvidenceItems,
  setSelectedEvidenceItems,
} from "@evidence-collection-slice";

import './evidence-package-builder.css';

const EvidencePackageBuilder = () => {
  const dispatch = useDispatch();

  const deSelectEvidenceItem = (selectedEvidenceItem) => {
    const newState = selectedEvidenceItems
          .map(x=>(x.evidenceItem.id===selectedEvidenceItem.evidenceItem.id?{...x, selected: false} : x));
    dispatch(setSelectedEvidenceItems(newState));
    };

  const selectedEvidenceItems = useSelector(selectSelectedEvidenceItems);
  return (
    <>
      <div className="evidence-package-builder">
        <Typography variant="h4">Evidence Package Creation</Typography>
        <div className="subhead">Items demonstrating the claim</div>
        {/*TODO: order by id */}
        <ul class="selected-evidence">
          {selectedEvidenceItems.filter(x=>x.selected).map((next, i)=> {
            return (
              <li className="item-row">
                <div class="index">{i+1}</div>
                <div>{next.evidenceItem.evidenceTypeDisplayName}</div>
                <Tooltip title="Delete">
                  <IconButton><DeleteRoundedIcon onClick={()=>{ deSelectEvidenceItem(next)}} fontSize="small" sx={{}} /></IconButton>
                </Tooltip>
              </li>
            )
          })}
          <Typography variant="subhead">Relevant Rubric Alignment</Typography>
          <Button variant="contained" color="secondary" size="small">Go to Rubric</Button> and select the relevant rubric text
          <Stack direction="row" spacing={1} sx={{justifyContent:'flex-end'}}>
                <Button 
                  variant="contained" 
                  color="background" 
                  size="small"
                >Cancel</Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="small"
                >Create</Button>
              </Stack>
      </ul>
      </div>
    </>
  );
};

export default EvidencePackageBuilder;