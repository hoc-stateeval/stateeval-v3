
import {
  Box,
  Typography,
} from '@mui/material';

const PageHeader = (props) => {
  return (
    <Box sx={{marginBottom:'20px'}}>
    <Typography variant="h2">{props.title}</Typography>
    <Typography variant="subtitle1">
      {props.children}
    </Typography>
    </Box>
  );
};

export default PageHeader;