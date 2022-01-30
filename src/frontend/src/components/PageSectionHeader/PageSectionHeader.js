
import {
  Divider,
  Typography,
} from '@mui/material';

const PageSectionHeader = ({title}) => {
  return (
  <>
      <Typography sx={{mb:-1}} variant="body1"><strong>{title}</strong></Typography>
      <Divider/>
  </>
  );
};

export default PageSectionHeader;
