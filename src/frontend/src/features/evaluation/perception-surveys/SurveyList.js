import { useErrorHandler } from "react-error-boundary";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"

import {
  useGetPerceptionSurveysForEvaluationQuery,
  useCreatePerceptionSurveyMutation
} from "@api-slice"

import {
  selectActiveEvaluationId,
  selectActiveWorkAreaContext
} from "@user-context-slice"

import { evaluationPaths } from "@routes/paths";

const SurveyList = () => {

  const errorHandler = useErrorHandler();

  const evaluationId = useSelector(selectActiveEvaluationId);
  const workAreaContext = useSelector(selectActiveWorkAreaContext);

  const { data: surveys, error: getSurveysError } = useGetPerceptionSurveysForEvaluationQuery(evaluationId);
  if (getSurveysError) errorHandler(getSurveysError);

  const [createSurvey, {error: createSurveyError}] = useCreatePerceptionSurveyMutation();
  if (createSurveyError) errorHandler(createSurveyError);

  const onClickNewSurvey = async () => {

    const survey = await createSurvey({
      evaluationId: evaluationId,
      schoolCode: workAreaContext.schoolCode,
      locationOrigin: window.location.origin.toLowerCase()
    }).unwrap();
  }

  return (
  <>
    <Button variant="contained" color="secondary" size="small"
      onClick={onClickNewSurvey}>
        Add Survey
    </Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {surveys && surveys.map((survey, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{survey.title}</TableCell>
              <TableCell align="center">{survey.wfStateDisplayName}</TableCell>
              <TableCell align="center">
              <Button variant="contained" color="secondary" size="small"
                component={RouterLink}
                to={`${evaluationPaths.trMePerceptionSurveys}/${survey.id}`}
              >
                    View Survey
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  )
}

export default SurveyList;