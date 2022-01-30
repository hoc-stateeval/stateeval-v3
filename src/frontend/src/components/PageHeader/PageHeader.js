
import {
  Box,
  Typography,
} from '@mui/material';

const PageHeader = ({title, children}) => {
  return (
    <Box sx={{mb:5}}>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="subtitle1">
        {children}
      </Typography>
    </Box>
  );
};

export default PageHeader;
