
import { useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import {
  useGetPerceptionSurveyByGuidQuery,
  useGetPerceptionSurveyStatementsForSurveyQuery,
} from "@api-slice";

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
      <StudentSurveyBody preview={false} survey={survey} statements={statements} />
    </>
  )
}

export default StudentPerceptionSurvey;