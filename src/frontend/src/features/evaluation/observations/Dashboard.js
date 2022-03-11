import { useState } from 'react';
import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import {  
  selectCurrentUser,
  selectActiveEvaluationId,
} from "@user-context-slice";

import {
  useGetObservationsForEvaluationQuery,
  useCreateObservationMutation,
} from "@api-slice";

import { ObservationType } from "@lib/enums";

import { evaluationPaths } from '@routes/paths';

import { AddCircleOutline as AddCircleOutlineIcon } from "@mui/icons-material"

const Dashboard = () => {

  const [dlgOpen, setDlgOpen] = useState(false);

  const navigate = useNavigate();
  const errorHandler = useErrorHandler();
  const evaluationId = useSelector(selectActiveEvaluationId);
  const currentUser = useSelector(selectCurrentUser);

  const { data: observations, error: getObservationsError } = useGetObservationsForEvaluationQuery(evaluationId);
  if (getObservationsError) errorHandler(getObservationsError);

  const [createObservationAPI, {error: createObservationError}] = useCreateObservationMutation();
  if (createObservationError) errorHandler(createObservationError);

  const handleOpenObservationDialog = () => {
    setDlgOpen(true);
  };

  const handleCloseObservationDialog = () => {
    setDlgOpen(false);
  };

  const createObservation = async (observationType) => {
    const observation = await createObservationAPI(
      {
        evaluationId: evaluationId,
        evaluatorId: currentUser.id,
        observationType
      }
    ).unwrap();
    const path = `${evaluationPaths.observations}/${observation.id}`
    navigate(path);
  }

  const handleInformalObservationDialog = () => {

    setDlgOpen(false);
    createObservation(ObservationType.INFORMAL);
  };

  const handleFormalObservationDialog = () => {
    
    setDlgOpen(false);
    createObservation(ObservationType.FORMAL);
  };

  return (
    <Stack direction="column" spacing={2}>
    <Stack direction="row" sx={{ justifyContent: "flex-end" }} spacing={2}>
      <Button
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleOpenObservationDialog}
      >
        Add Observation
      </Button>
      <Dialog open={dlgOpen} onClose={handleCloseObservationDialog}>
        <DialogTitle>New Observation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Which Observation type would you like to start?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined"  onClick={handleCloseObservationDialog}>Cancel</Button>
          <Button variant="outlined" onClick={handleInformalObservationDialog}>Informal</Button>
          <Button onClick={handleFormalObservationDialog}>Formal</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  <TableContainer component={Paper}>
    <Table size="small" aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">Title</TableCell>
          <TableCell align="center">Type</TableCell>
          <TableCell align="center">Status</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {observations &&
          observations.map((observation, i) => (
              <TableRow key={i}>
                <TableCell align="center">
                  {observation.title}
                </TableCell>
                <TableCell align="center">
                  {observation.observationTypeDisplayName}
                </TableCell>
                <TableCell align="center">
                  {observation.wfStateDisplayName}
                </TableCell>
                <TableCell align="center">
                <Button
                  component={RouterLink}
                  to={`${evaluationPaths.observations}/${observation.id}`}
                >
                  View
                </Button>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  </TableContainer>
  </Stack>
  );
};

export default Dashboard;