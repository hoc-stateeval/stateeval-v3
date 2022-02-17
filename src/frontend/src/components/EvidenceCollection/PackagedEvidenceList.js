
import { useSelector, useDispatch } from 'react-redux';

import { 
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import { useTheme } from '@mui/material/styles';

import {
  selectEvidencePackagesForActiveRubricRow,
} from "@evidence-collection-slice";

const PackagedEvidenceList = () => {

  const evidencePackages = useSelector(selectEvidencePackagesForActiveRubricRow);
 
  return (
    <>
      {evidencePackages.map((x, i)=>(
        <Paper direction="column" key={i}>
          <Stack direction="column" spacing={2}>
            <Box>
              <Typography variant="body1">
                {x.rubricStatement}
              </Typography>
            </Box>
          </Stack>

        </Paper>
        ))
      }
    </>
  )
};

export default PackagedEvidenceList;