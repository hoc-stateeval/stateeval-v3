import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useErrorHandler } from 'react-error-boundary';
import { useSelector } from "react-redux";

import {
  selectActiveFrameworkId,
} from "@user-context-slice";

import {
  useGetFrameworkByIdQuery,
  useGetPerceptionSurveyStatementsForFrameworkTagNameQuery,
  useGetPerceptionSurveyCheckedStatementIdsQuery
} from "@api-slice";

const PerceptionSurvey = () => {

  const errorHandler = useErrorHandler();

  const { id: surveyId } = useParams();

  const [statementMap, setStatementMap] = useState({});
  const activeFrameworkId = useSelector(selectActiveFrameworkId);

  const { data: activeFramework, error: getFrameworkError } = 
    useGetFrameworkByIdQuery(activeFrameworkId);
  if (getFrameworkError) errorHandler(getFrameworkError);

  const { data: statements, error: getStatementsError } = 
    useGetPerceptionSurveyStatementsForFrameworkTagNameQuery(activeFramework.frameworkTagName, {skip: !activeFramework});
  if (getStatementsError) errorHandler(getStatementsError);

  const { data: checkedIds, error: getCheckedIdsError } = 
    useGetPerceptionSurveyCheckedStatementIdsQuery(surveyId);
  if (getCheckedIdsError) errorHandler(getCheckedIdsError);

  useEffect(()=> {

  }, []);

  return (
    <>
    </>
  )
}

export default PerceptionSurvey;