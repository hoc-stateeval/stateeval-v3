
import ServerError from "./ServerError";
import { Alert } from "@mui/material";

const ErrorFallback = ({ error }) => {

  if (error.message.indexOf('api-error:')===0) {
    const errorDetails = error.message.split(":");
    return <ServerError error={{status: errorDetails[1], message: errorDetails[2]}}/>
  }
  else {
    return <Alert severity="error">Something went wrong:{error.message}</Alert>;
  }
};

export default ErrorFallback;