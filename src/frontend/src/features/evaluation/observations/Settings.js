import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useErrorHandler } from "react-error-boundary"

import {Formik, Form, Field} from "formik";

import {
  Button,
  Divider,
  LinearProgress,
  Stack,
  Typography
} from "@mui/material";

import {
  TextField
} from 'formik-mui';

import {
  TimePicker,
  DatePicker
} from 'formik-mui-lab';

import {LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import {
  useGetObservationsForEvaluationQuery
} from "@api-slice";

import {  
  selectActiveEvaluationId,
  selectActiveWorkAreaContext
} from "@user-context-slice";

const Settings = () => {

  const { id } = useParams();
  const observationId = parseInt(id);
  const errorHandler = useErrorHandler();

  const evaluationId = useSelector(selectActiveEvaluationId);
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);

  const { observation, error: getObservationsError } = 
  useGetObservationsForEvaluationQuery(evaluationId, {
    selectFromResult: ({ data }) => ({
      observation: data?.find((observation) => observation.id === observationId),
    }),
  });
  if (getObservationsError) errorHandler(getObservationsError);

  return (
    <>
      {/* <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <Typography><strong>Evaluator</strong></Typography>
          <Typography>{observation?.evaluatorDisplayName}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography><strong>{activeWorkAreaContext.evaluateeTerm}</strong></Typography>
          <Typography>{observation?.evaluateeDisplayName}</Typography>
        </Stack>
      </Stack>
      <Divider orientation="vertical" /> */}
      <Formik
        initialValues={{
          title: observation?.title,
        }}
        validate={(values)=> {
          const errors = {};
          if (!values.title) {
            errors.title = "Required";
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(()=> {
            setSubmitting(false);
    
          }, 500);
        }}
      >{({values, submitForm, resetForm, isSubmitting, touched, errors}) => {
        <LocalizationProvider dataAdapter={AdapterDateFns}>
          <Form>
          {isSubmitting && <LinearProgress />}
          <Field
              component={TextField}
              name="title"
              type="text"
              label="title"
              helperText="Please enter title"
            />
            <Button
              sx={{margin: 1}}
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Update
            </Button>
          </Form>
        </LocalizationProvider>
      }}
      </Formik>
    </>
  )
}

export default Settings;

{/* <Stack direction="column" spacing={2}>
<Stack direction="row" spacing={2}>
  <Field
    component={TextField}
    name="title"
    type="text"
    label="title"
    helperText="Please enter title"
  />
</Stack>
</Stack> */}