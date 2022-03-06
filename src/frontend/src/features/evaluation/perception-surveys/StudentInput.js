import { useParams } from "react-router-dom";
import { useErrorHandler } from 'react-error-boundary';

import {
  useGetPerceptionSurveyByGuidQuery
} from "@api-slice";

const StudentInput = () => {

  const errorHandler = useErrorHandler();

  let { guid } = useParams();

  const { data: survey, error: getPerceptionSurveyError } = 
  useGetPerceptionSurveyByGuidQuery(guid);
  if (getPerceptionSurveyError) errorHandler(getPerceptionSurveyError);

  return (
    <>
    <h1>{survey.guid}</h1>
    </>
  )
}

export default StudentInput;