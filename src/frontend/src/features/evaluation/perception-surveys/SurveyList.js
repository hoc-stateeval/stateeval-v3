import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import { 
  Button,
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
  selectActiveWorkAreaContext,
  selectActiveEvaluationId,
} from "@user-context-slice";

import {
  useGetPerceptionSurveysForEvaluationQuery,
  useCreatePerceptionSurveyMutation,
} from "@api-slice";

import { evaluationPaths } from '@routes/paths';

import { AddCircleOutline as AddCircleOutlineIcon } from "@mui/icons-material"

const SurveyList = () => {

  const navigate = useNavigate();
  const errorHandler = useErrorHandler();
  const evaluationId = useSelector(selectActiveEvaluationId);
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);

  const { data: surveys, error: getPerceptionSurveysError } = useGetPerceptionSurveysForEvaluationQuery(evaluationId);
  if (getPerceptionSurveysError) errorHandler(getPerceptionSurveysError);

  const [createSurvey, {error: createSurveyError}] = useCreatePerceptionSurveyMutation();
  if (createSurveyError) errorHandler(createSurveyError);

  const onClickNewSurvey = async () => {
    const survey = await createSurvey(
      {
        evaluationId: evaluationId,
        schoolCode: activeWorkAreaContext.schoolCode,
        locationOrigin: window.location.origin.toLowerCase()
      }
    ).unwrap();
    const path = `${evaluationPaths.trMePerceptionSurveys}/${survey.id}`
    navigate(path);
  }

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" sx={{ justifyContent: "flex-end" }} spacing={2}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<AddCircleOutlineIcon />}
          onClick={onClickNewSurvey}
        >
          Add Survey
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {surveys &&
              surveys.map((survey, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">
                      {survey.title}
                    </TableCell>
                    <TableCell align="center">
                      {survey.statusDisplayString}
                    </TableCell>
                    <TableCell align="center">
                    <Button
                      component={RouterLink}
                      to={`${evaluationPaths.trMePerceptionSurveys}/${survey.id}`}
                      color="secondary"
                      size="small"
                      variant="contained"
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
  )
}

export default SurveyList;