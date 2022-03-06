import { useSelector } from 'react-redux';
import { useErrorHandler } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {
  selectActiveWorkAreaContext,
  selectActiveEvaluationId,

} from "@user-context-slice";

import {
  useGetPerceptionSurveysForEvaluationQuery,
  useCreatePerceptionSurveyMutation
} from "@api-slice";

import { evaluationPaths } from '@routes/paths';

const SurveyList = () => {

  const navigate = useNavigate();
  const errorHandler = useErrorHandler();

  const evaluationId = useSelector(selectActiveEvaluationId);
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);

  const { data: surveys, error: getPerceptionSurveysError } = 
  useGetPerceptionSurveysForEvaluationQuery(evaluationId);
  if (getPerceptionSurveysError) errorHandler(getPerceptionSurveysError);

  const [createSurvey, {error: createSurveyError}] = useCreatePerceptionSurveyMutation();
  if (createSurveyError) errorHandler(createSurveyError);

async function mkNewSurvey (){

  const survey = await createSurvey(
    {
      evaluationId: evaluationId,
      schoolCode: activeWorkAreaContext.schoolCode,
      locationOrigin: window.location.origin.toLowerCase()
    }).unwrap();
    
    const path = `${evaluationPaths.trMePerceptionSurveys}/${survey.id}`
    navigate(path);
}
  return(

<Stack direction="column" spacing={2}>
    <Button variant='contained' color='secondary' size="small" sx={{alignSelf:"flex-end"}} onClick={mkNewSurvey}>Add Survey</Button>
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
        {surveys && surveys.map((survey, i) => (
          <TableRow
            key={i
            }
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="right">{survey.title}</TableCell>
            <TableCell align="right">h</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </Stack>
  )
}

export default SurveyList;