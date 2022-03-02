import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useErrorHandler } from 'react-error-boundary';
import { useSelector } from "react-redux";

import {
  Checkbox,
  Stack,
  Typography
} from "@mui/material";

import {
  selectActiveFrameworkId,
} from "@user-context-slice";

import {
  useGetFrameworkByIdQuery,
  useGetPerceptionSurveyStatementsForFrameworkTagNameQuery,
  useGetPerceptionSurveyCheckedStatementIdsQuery,
  useAddStatementToSurveyMutation,
  useRemoveStatementFromSurveyMutation
} from "@api-slice";

const PerceptionSurveyStart = () => {

  const errorHandler = useErrorHandler();

  let { id: surveyId } = useParams();
  surveyId = parseInt(surveyId);

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

  const [addStatement, {error: addStatementError}] = useAddStatementToSurveyMutation();
  if (addStatementError) errorHandler(addStatementError);
  
  const [removeStatement, {error: removeStatementError}] = useRemoveStatementFromSurveyMutation();
  if (removeStatementError) errorHandler(removeStatementError);


  useEffect(()=> {

    if (!statements || !activeFramework) return;
    
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

  const toggleStatementChecked = (statementId) => {

    if (checkedIds.find(x=>x === statementId)) {
      removeStatement({surveyId, statementId});
    }
    else {
      addStatement({surveyId, statementId});
    }
  }

  if (!statements || !activeFramework || !checkedIds) {
    return (<></>)
  }

  return (
    <>
    { activeFramework.frameworkNodes.map((node, i) => {
      const statements = statementMap[node.shortName];
      if (statements) {
        return (
          <Stack key={i} direction="column">
            <Typography variant="body1">{node.shortName}-{node.title}</Typography>
            {statements.map((statement, j)=> {
              const rubricRow = activeFramework.rubricRowMap[statement.rubricRowId];
              return (
                <Stack key={j} direction="row">
                  <Checkbox
                      checked={checkedIds.find(x=>x===statement.id)}
                      onChange={()=>{toggleStatementChecked(statement.id)}}
                    />
                  <Typography variant="body1">{rubricRow.shortName}</Typography>
                  <Typography variant="body1">{statement.text}</Typography>
                </Stack>
              )
            }
          )}
          </Stack>
        )
      }
      else {
        return (<></>)
      }
    })}
    </>
  )
}

export default PerceptionSurveyStart;