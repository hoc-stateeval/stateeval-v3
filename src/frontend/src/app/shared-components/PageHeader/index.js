
import {
  Box,
  Typography,
} from '@mui/material';

export const PageHeader = (props) => {
  return (
    <Box sx={{mb:5}}>
      <Typography variant="h2">{props.title}</Typography>
      <Typography variant="subtitle1">
        {props.children}
      </Typography>
    </Box>
  );
};
