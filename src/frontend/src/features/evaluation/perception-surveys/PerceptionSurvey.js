/* eslint-disable no-lone-blocks */
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useErrorHandler } from 'react-error-boundary';
import { useSelector } from "react-redux";

import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  Paper,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography
} from "@mui/material";

import {
  selectActiveEvaluationId,
  selectActiveFrameworkId,
} from "@user-context-slice";

import {
  useGetFrameworkByIdQuery,
  useGetPerceptionSurveysForEvaluationQuery,
  useGetPerceptionSurveyStatementsForFrameworkTagNameQuery,
  useGetPerceptionSurveyStatementIdsQuery,
  useAddStatementToSurveyMutation,
  useRemoveStatementFromSurveyMutation
} from "@api-slice";

import { WorkState } from "@lib/enums";
import copyToClipboard from "@lib/utils/copyToClipboard";

const SurveyStatus = ({survey}) => {

  return (
    <>
    {survey.wfState === WorkState.PERCEPTION_SURVEY_COMPLETE &&
      <Alert severity="info">
        <AlertTitle>Status: Complete</AlertTitle>
        <Typography>
          This survey is complete. If you would like to include this survey in your evaluation, 
          click the <strong>Create PDF</strong> button and save the document to your local
          drive and then upload it as an artifact within your evaluation.
        </Typography>
      </Alert>
    }
    {survey.wfState === WorkState.PERCEPTION_SURVEY_BUILDING &&
      <Alert severity="info">
        <AlertTitle>Status: Under Construction</AlertTitle>
        <Typography>
          This survey is currently under construction. To make the survey visible to your 
          students, click the <strong>Open Survey</strong> button.
        </Typography>
      </Alert>
    }
    {survey.wfState === WorkState.PERCEPTION_SURVEY_OPEN &&
      <Alert severity="info">
        <AlertTitle>Status: Open to Students
        </AlertTitle>
        <Stack direction="column" spacing={2}>
          <Button sx={{alignSelf: 'flex-start'}} variant="outlined" size="small" onClick={copyToClipboard(survey.tinyURL)}>Copy URL to Clipboard</Button>
          <Typography>
            If you need to temporarily close access to the survey, click the <strong>Close Survey </strong> button. You will be able to re-open the survey again.
          </Typography>
          <Typography>
            If you are ready to allow no further access to the survey and complete the survey report generation
            process, click the <strong>Complete Survey</strong> button. Once you have completed the survey, you will not be able to re-open the survey.
          </Typography>
          </Stack>
      </Alert>
    }
     {survey.wfState === WorkState.PERCEPTION_SURVEY_CLOSED &&
      <Alert severity="info">
        <AlertTitle>Status: Closed to Students</AlertTitle>
        <Stack direction="column" spacing={2}>
          <Typography>
            If you want to re-open access to the survey, click the <strong>Open Survey</strong> button.
          </Typography>
          <Typography>If you are ready to allow no further access to the survey and complete the survey report generation
              process, click the <strong>Complete Survey</strong> button. Once you have completed the survey, you will not be
              able to re-open the survey.
          </Typography>
        </Stack>
      </Alert>
    }
    </>
  )
}

const PerceptionSurvey = () => {

  const errorHandler = useErrorHandler();

  let { id: surveyId } = useParams();
  surveyId = parseInt(surveyId);

  const activeFrameworkId = useSelector(selectActiveFrameworkId);
  const activeEvaluationId = useSelector(selectActiveEvaluationId);

  const { survey, error: getPerceptionSurveysError } = 
  useGetPerceptionSurveysForEvaluationQuery(activeEvaluationId, {
    selectFromResult: ({ data }) => ({
      survey: data?.find((survey) => survey.id === surveyId),
    }),
  });
  if (getPerceptionSurveysError) errorHandler(getPerceptionSurveysError);

  const [statementMap, setStatementMap] = useState({});
  const [nodesWithStatements, setNodesWithStatements] = useState([]);
  

  const { data: activeFramework, error: getFrameworkError } = 
    useGetFrameworkByIdQuery(activeFrameworkId);
  if (getFrameworkError) errorHandler(getFrameworkError);

  const { data: statements, error: getStatementsError } = 
    useGetPerceptionSurveyStatementsForFrameworkTagNameQuery(activeFramework.frameworkTagName, {skip: !activeFramework});
  if (getStatementsError) errorHandler(getStatementsError);

  const { data: checkedIds, error: getCheckedIdsError } = 
    useGetPerceptionSurveyStatementIdsQuery(surveyId);
  if (getCheckedIdsError) errorHandler(getCheckedIdsError);

  const [addStatement, {error: addStatementError}] = useAddStatementToSurveyMutation();
  if (addStatementError) errorHandler(addStatementError);
  
  const [removeStatement, {error: removeStatementError}] = useRemoveStatementFromSurveyMutation();
  if (removeStatementError) errorHandler(removeStatementError);


  useEffect(()=> {

    if (!survey || !statements || !activeFramework) return;
    
    const map = statements.reduce((acc, statement) => {
      const rubricRow = activeFramework.rubricRowMap[statement.rubricRowId];
      if (!acc[rubricRow.frameworkNodeShortName]) {
        acc[rubricRow.frameworkNodeShortName] = [];
      }
      acc[rubricRow.frameworkNodeShortName].push(statement);
      return acc;
    }, {});

    setStatementMap(map);

    let nodesWithStatements = [];

    for (const node of activeFramework.frameworkNodes) {
      if (map[node.shortName]) {
        nodesWithStatements.push(node);
      }
    };

    setNodesWithStatements(nodesWithStatements);

  }, [survey, statements, activeFramework]);

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
    <Stack direction="column" spacing={2}>
      {survey && <SurveyStatus survey={survey} />}
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Include</TableCell>
              <TableCell align="center">Rubric</TableCell>
              <TableCell align="left">Statement</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {nodesWithStatements.map((node, i) => {
            const statements = statementMap[node.shortName];
            return (
              <>
                <TableRow key={i}>
                  <TableCell align="left" colspan="3">{node.shortName}-{node.title}</TableCell>
                </TableRow>
                {statements.map((statement, j)=> {
                  const rubricRow = activeFramework.rubricRowMap[statement.rubricRowId];
                  const checked = checkedIds.includes(statement.id);
                  return (
                    <TableRow key={j}>
                      <TableCell align="center" >
                        <Checkbox
                          checked={checked}
                          onChange={()=>{toggleStatementChecked(statement.id)}}
                        />
                        </TableCell>
                        <TableCell align="center">{rubricRow.shortName}</TableCell>
                        <TableCell align="left">{statement.text}</TableCell>
                    </TableRow>
                  )})
                } 
              </>
            )})
          }
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
    </>
  )
}

export default PerceptionSurvey;
