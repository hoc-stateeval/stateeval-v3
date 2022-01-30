
import { 
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';

import { PageSectionHeader } from "@components";


const RubricAlignmentSection = () => {
  return (
    <>
      <Stack spacing={2}>
        <PageSectionHeader title={"Rubric Alignment"}></PageSectionHeader>
      </Stack>
    </>
  );
};

export default RubricAlignmentSection;