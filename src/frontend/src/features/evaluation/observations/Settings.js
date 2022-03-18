import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useErrorHandler } from "react-error-boundary"

import {Formik, Form, Field} from 'formik';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Divider,
  Stack,
  LinearProgress,
  FormControlLabel,
} from '@mui/material';
import {LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  TextField,
  Switch,
} from 'formik-mui';
import { DateTimePicker } from 'formik-mui-lab';

import {
  useGetObservationsForEvaluationQuery
} from "@api-slice";

import {  
  selectActiveEvaluationId,
} from "@user-context-slice";


const Settings = () => {

  const [confirmDeleteDlgOpen, setConfirmDeleteDlgOpen ] = useState(false);

  const { id } = useParams();
  const observationId = parseInt(id);
  const errorHandler = useErrorHandler();

  const evaluationId = useSelector(selectActiveEvaluationId);

  const { observation, error: getObservationsError } = 
  useGetObservationsForEvaluationQuery(evaluationId, {
    selectFromResult: ({ data }) => ({
      observation: data?.find((observation) => observation.id === observationId),
    }),
  });
  if (getObservationsError) errorHandler(getObservationsError);

  const deleteObservation = () => {
    alert("deleteObservation")
  }

  const handleCloseDeleteDlg = () => {
    alert("handleCloseDeleteDlg")
  }

  return (
    <>
     <Button sx={{alignSelf:'flex-start', mb: 4}}
                    variant="contained"
                    color="secondary"
                    onClick={confirmDeleteDlgOpen}
                  >
        Delete Observation
      </Button>
      <Dialog open={confirmDeleteDlgOpen} onClose={handleCloseDeleteDlg}>
        <DialogTitle>New Observation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Which Observation type would you like to start?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined"  onClick={handleCloseDeleteDlg}>Cancel</Button>
          <Button onClick={deleteObservation}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Divider >Observation Properties</Divider>
    <Formik
      initialValues={{
        title: observation?.title,
        includeSGComponents: observation?.includeStudentGrowthComponents,
        preConferenceDateTime: observation?.preConferenceDateTime,
        observationDateTime: observation?.observationDateTime,
        postConferenceDateTime: observation?.postConferenceDateTime,
        observationDuration: observation?.duration
      }}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Required';
        }
        if (values.observationDuration) {

        }
        return errors;
      }}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {({values, submitForm, resetForm, isSubmitting, touched, errors}) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form>
            <Box sx={{width:'30%'}}>
              <Stack direction="column" spacing={4}>
                <Button sx={{alignSelf:'flex-end'}}
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Update
                </Button>
                <Field 
                  component={TextField}
                  type="text"
                  label="Title"
                  name="title"
                />
               
                 <Divider textAlign="left">Pre-Conference</Divider>
                <Field
                  component={DateTimePicker}
                  name="preConferenceDateTime"
                  label="Date/Time"
                />

                <Divider textAlign="left">Observation</Divider>
                <Field
                  component={DateTimePicker}
                  name="observationDateTime"
                  label="Date/Time"
                />
                 <Field
                  component={TextField}
                  type="number"
                  name="observationDuration"
                  label="Duration (minutes)"
                />

                <Divider textAlign="left">Post-Conference</Divider>
                <Field
                  component={DateTimePicker}
                  name="postConferenceDateTime"
                  label="Date/Time"
                />  
                <Divider textAlign="left">Other</Divider>
                <FormControlLabel
                  control={
                    <Field component={Switch} type="checkbox" name="includeSGComponents" />
                  }
                  label="Include Student Growth Components"
                />
              </Stack>
            </Box>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </Form>
        </LocalizationProvider>
      )}
    </Formik>
    </>
  );
}

export default Settings;