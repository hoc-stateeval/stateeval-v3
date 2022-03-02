import { useEffeect, useState } from 'react'
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
import { useEffect } from "react";

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

    const map = statements.reduce((acc, statement) => {
      const rubricRow = activeFramework.rubricRowMap[statement.rubricRowId];
      if (!acc[rubricRow.frameworkNodeShortName]) {
        acc[rubricRow.frameworkNodeShortName] = [];
      }
      acc[rubricRow.frameworkNodeShortName].push(statement);
      return acc;
    }, {});

    setStatementMap(map);
  }, [statements, activeFramework]);

  return (
    <>
    { activeFramework.frameworkNodes.map((node, i) => {
      const statements = statementMap[node.shortName];
      if (statements) {
        return (
          <>
          <h3 key={i}>{node.shortName}</h3>
          {statements.map((statement, j)=> {
            const rubricRow = activeFramework.rubricRowMap[statement.rubricRowId];
            return (
              <p key={j}>{rubricRow.shortName} - {statement.text} </p>
            )
          })}
          </>
        )
      }
      else {
        return (<></>)
      }
    })}
    </>
  )
}

export default PerceptionSurvey;