import { useSelector } from 'react-redux';
import { useErrorHandler } from 'react-error-boundary';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import {
  selectActiveWorkAreaContext,
  selectActiveEvaluationId,

} from "@user-context-slice";

import {
  useGetObservationsForEvaluationQuery,
  useCreateObservationMutation
} from "@api-slice";

import { evaluationPaths } from '@routes/paths';

const Dashboard = () => {

  const navigate = useNavigate();
  const errorHandler = useErrorHandler();

  const evaluationId = useSelector(selectActiveEvaluationId);
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);

  const { data: observations, error: getObservationsError } = 
  useGetObservationsForEvaluationQuery(evaluationId);
  if (getObservationsError) errorHandler(getObservationsError);

  const [createObservation, {error: createObservationError}] = useCreateObservationMutation();
  if (createObservationError) errorHandler(createObservationError);

  const onClickNewObservation = async ()  => {
    const observation = await createObservation(
      {
        evaluationId: evaluationId,
        schoolCode: activeWorkAreaContext.schoolCode,
      }).unwrap();
      
      const path = `${evaluationPaths.observation}/${observation.id}`
      navigate(path);
  }

  return(

    <Stack direction="column" spacing={2}>
        <Button variant='contained' color='secondary' size="small" sx={{alignSelf:"flex-end"}} onClick={onClickNewObservation}>Add Observation</Button>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {observations && observations.map((observation, i) => (
              <TableRow
                key={i
                }
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{observation.title}</TableCell>
                <TableCell align="right">{observation.wfStateDisplayName}</TableCell>
                <TableCell align="right">
                <Button variant='contained' 
                  color='secondary' 
                  size="small" 
                  component={RouterLink}
                  to={`${evaluationPaths.trMePerceptionSurveys}/${observation.id}`}>
                    View Survey
                 </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Stack>
      )
};

export default Dashboard;