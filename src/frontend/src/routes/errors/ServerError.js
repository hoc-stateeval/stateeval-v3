

import {
  Stack,
  Typography
} from "@mui/material"

const ServerError = ({error}) => {
 
  // todo: handle general network error
  let title = "";
  let details = "";
  if (error.status === '500') {
    title = "Unexpected server error!"
    details = "We apologize for the inconvenience. The error has been logged and will be investigated shortly.";
  }
  else if (error.status === '404') {
    title = "Page not found!"
    details = "The page you are looking for might have been removed had its name changed or is temporarily unavailable."
  }
  else if (error.status === '400') {
    title = "Bad server request!"
    details = "We apologize for the inconvenience. The error has been logged and will be investigated shortly.";
  }
  else {
    title = "Unknown error";
  }
  return (
    <>
        <Stack direction="column" spacing={3}>
          <Typography variant="h1">{error.status}</Typography>
          <Typography variant="h2">{title}</Typography>
          <Typography variant="body1">{details}</Typography>
        </Stack>

    </>
  );
};

export default ServerError;

