import { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useSelector } from "react-redux";

import {
  Paper,
  Radio,
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
  selectActiveWorkAreaContext,
} from "@user-context-slice";

import {
  useGetEvaluationByIdQuery,
} from "@api-slice";

import { PerceptionSurveyLevelOfAgreement } from "@lib/enums";

const StudentSurveyBody = ({checkedIds, allStatements}) => {
  const errorHandler = useErrorHandler();

  const activeEvaluationId = useSelector(selectActiveEvaluationId);
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);

  const { data:activeEvaluation, error: getEvaluationError } = useGetEvaluationByIdQuery(activeEvaluationId);
  if (getEvaluationError) errorHandler(getEvaluationError);

  const [results, setResults] = useState({});

  const getStatements = () => {
   return allStatements.filter((statement, i) => {
      const checked = checkedIds.includes(statement.id);
      return checked;
    });
  }

  const [statements, setStatements] = useState(getStatements());


  const setResult = (statementId, levelOfAgreement) => {
    let newResults = {...results};
    newResults[statementId] = levelOfAgreement;
    setResults(newResults);
  }

  const tableData = [
    {
      levelOfAgreementTitle: 'Strongly Disagree',
      levelOfAgreementValue: PerceptionSurveyLevelOfAgreement.STRONGLY_DISAGREE,
    },
    {
      levelOfAgreementTitle: 'Disagree',
      levelOfAgreementValue: PerceptionSurveyLevelOfAgreement.DISAGREE,
    },
    {
      levelOfAgreementTitle: 'Neither Agree nor Disagree',
      levelOfAgreementValue: PerceptionSurveyLevelOfAgreement.NEITHER,
    },
    {
      levelOfAgreementTitle: 'Agree',
      levelOfAgreementValue: PerceptionSurveyLevelOfAgreement.AGREE,
    },
    {
      levelOfAgreementTitle: 'Strongly Agree',
      levelOfAgreementValue: PerceptionSurveyLevelOfAgreement.STRONGLY_AGREE,
    }
  ]

  return (
    <>
      <Typography sx={{textAlign:'center'}} variant="h2">Student Survey for Secondary School</Typography>
      <Typography>
        The teacher of this class wants to get your opinions in order to improve your learning
        experience. For each statement below, please indicate your level of agreement by selecting
        one box, from strongly disagree to strongly agree. Keep in mind that <strong>your selections
            relate only for this teacher and this class</strong>
      </Typography>
      <Typography>
        <strong>School:</strong> {activeWorkAreaContext.schoolName}
      </Typography>
      <Typography>
        <strong>Teacher's Last Name:</strong> {activeEvaluation.evaluateeDisplayName}
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Statement</TableCell>
                {tableData.map((x,i)=>(
                  <TableCell align="center">{x.levelOfAgreementTitle}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {statements.map((statement, i) => {
              return (
                <TableRow key={i}>
                  <TableCell align="left">{i+1}</TableCell>
                  <TableCell align="left" sx={{width:'40%'}}>{statement.text}</TableCell>
                  {tableData.map((x,i)=>(
                  <TableCell align="center">
                    <Radio
                      name={i}
                      checked={results[statement.id]===x.levelOfAgreementValue}
                      onChange={()=>{setResult(statement.id, x.levelOfAgreementValue)}}
                      />
                  </TableCell>
                  ))}
                </TableRow>)
          })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default StudentSurveyBody;