
import { useParams } from 'react-router-dom';
import { useErrorHandler, ErrorBoundary } from 'react-error-boundary';

import {
  Box,
  Container
} from "@mui/material";

import {
  useGetPerceptionSurveyByGuidQuery,
  useGetPerceptionSurveyStatementsForSurveyQuery,
} from "@api-slice";

import ErrorFallback from "@routes/errors/ErrorFallback";

import StudentSurveyBody from './StudentSurveyBody';

const StudentPerceptionSurvey = () => {

  const errorHandler = useErrorHandler();
  const { guid } = useParams();

  const { data: survey, error: getSurveyError } = 
  useGetPerceptionSurveyByGuidQuery(guid);
  if (getSurveyError) errorHandler(getSurveyError);

const { data: statements, error: getStatementsError} = 
  useGetPerceptionSurveyStatementsForSurveyQuery(survey?.id, {skip: !survey} );
  if (getStatementsError) errorHandler(getStatementsError);


  if (!statements) {
    return (<></>)
  }
  return (
    <>
     <Box sx={{ mt: 3 }}>
      <Container
        sx={{
          minHeight: "100vh",
          width: "95%",
          padding: "20px 10px",
          borderTop: "solid 5px #e7eaec",
          margin: "20 20px 0 20px",
          backgroundColor: "#FFF",
        }}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <StudentSurveyBody preview={false} survey={survey} statements={statements} />
        </ErrorBoundary>
      </Container>
    </Box>
    </>
  )
}

export default StudentPerceptionSurvey;