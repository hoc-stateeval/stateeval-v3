import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";
import {errorHandler} from "react-error-boundary"

import {
  useGetPerceptionSurveyStatementsForFrameworkTagNameQuery,
  useGetFrameworkByIdQuery
} from "@api-slice"

import {selectActiveFrameworkId} from "@user-context-slice"

const PerceptionSurvey = () => {

  const activeFrameworkId = useSelector(selectActiveFrameworkId);

  const { data: activeFramework, error: getFrameworkError } = 
    useGetFrameworkByIdQuery(activeFrameworkId);
  if (getFrameworkError) errorHandler(getFrameworkError);

  const { data: statements, error: getPerceptionSurveysError } = 
  useGetPerceptionSurveyStatementsForFrameworkTagNameQuery(activeFramework.frameworkTagName);
  if (getPerceptionSurveysError) errorHandler(getPerceptionSurveysError);

  const { id: surveyId } = useParams();

  useEffect (()=> {
    if (!activeFramework || !statements) return;

    


  }, [activeFramework, statements])

  return (
    <>
      <h1>Perception Survey</h1>
      <h1>{surveyId}</h1>
    </>
  )
}

export default PerceptionSurvey;