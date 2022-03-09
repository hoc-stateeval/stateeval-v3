import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";
import {errorHandler} from "react-error-boundary"


import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import {
  useGetPerceptionSurveyStatementsForFrameworkTagNameQuery,
  useGetFrameworkByIdQuery
} from "@api-slice"

//live share moment

import {selectActiveFrameworkId} from "@user-context-slice"

const PerceptionSurvey = () => {
  const [statementMap, setStatementMap] = useState({})
  const [nodesWithStatements, setNodesWithStatements] = useState([]);
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

    const map = statements.reduce((acc, statement)=>{
      const rubricRow=activeFramework.rubricRowMap[statement.rubricRowId]
      if(!acc[rubricRow.frameworkNodeShortName]){
        acc[rubricRow.frameworkNodeShortName]=[]
      }
      acc[rubricRow.frameworkNodeShortName].push(statement)
      return acc
    },{})

    let nodesWithStatements = [];

    for(const node of activeFramework.frameworkNodes) {
      if(map[node.shortName]){
        nodesWithStatements.push(node);
        setNodesWithStatements(nodesWithStatements);
      }
    }

  }, [activeFramework, statements])

  return (
    <>
      <h1>Perception Survey</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            {nodesWithStatements.map((node, i) => {
              const statements = statementMap[node.shortName];
              return (
                <>
                <TableRow key={i}>
                  <TableCell align="left">{node.shortName}-{node.title}</TableCell> 
                </TableRow>
                {statements.map((statement, j) => {
                    const rubricRow = activeFramework.rubricRowMap[statement.rubricRowId]
                    return (
                      <TableRow key={j}>
                         <TableCell align="left">{rubricRow.shortName}-{statement.text}</TableCell> 
                      </TableRow>
                    )
                  })}
                </>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PerceptionSurvey;