import { useState } from 'react'
import { useErrorHandler } from 'react-error-boundary';

import {
  Checkbox,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import {
  useAddStatementToSurveyMutation,
  useRemoveStatementFromSurveyMutation
} from "@api-slice";

const SurveyBuilder = ({activeFramework, survey, checkedIds, statementMap}) => {
  const errorHandler = useErrorHandler();

  const [showFilter, setShowFilter] = useState("all");
  const [addStatement, {error: addStatementError}] = useAddStatementToSurveyMutation();
  if (addStatementError) errorHandler(addStatementError);

  const [removeStatement, {error: removeStatementError}] = useRemoveStatementFromSurveyMutation();
  if (removeStatementError) errorHandler(removeStatementError);

  const buildContent = () => {
    let content = [];
    for (const rubricRowId in statementMap) {
      const statementsForRubricRow = statementMap[rubricRowId];
      const rubricRow = activeFramework.rubricRowMap[rubricRowId];
      const frameworkNode = activeFramework.frameworkNodeMap[rubricRow.frameworkNodeId];
      content.push(
        <TableContainer key={rubricRowId} component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
          <TableRow>
              <TableCell align="left" colSpan="2">{frameworkNode.shortName} - {frameworkNode.title} : {rubricRow.shortName} - {rubricRow.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Include</TableCell>
              <TableCell align="left">Statement</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {statementsForRubricRow.map((statement, i) => {
            const checked = checkedIds.includes(statement.id);
            const show = showFilter === 'all' || checked;
              return  show ? (
                <TableRow key={i}>
                  <TableCell align="left" >
                    <Checkbox
                      checked={checked}
                      onChange={()=>{toggleStatementChecked(statement.id)}}
                    />
                    </TableCell>
                    <TableCell align="left">{statement.text}</TableCell>
                </TableRow>) : (<></>)
          })}
          </TableBody>
        </Table>
      </TableContainer>
        );
    }
    return content;
  }
  const toggleStatementChecked = (statementId) => {

    if (checkedIds.find(x=>x === statementId)) {
      removeStatement({surveyId: survey.id, statementId});
    }
    else {
      addStatement({surveyId: survey.id, statementId});
    }
  }

  const changeShowFilter = (event, newState) => {
    setShowFilter(newState);
  }

  const content = buildContent();

  return (
    <>
      <ToggleButtonGroup
        color="secondary"
        value={showFilter}
        exclusive
        onChange={changeShowFilter}
      >
        <ToggleButton value="all">Show All</ToggleButton>
        <ToggleButton value="selected">Show Selected Only</ToggleButton>
      </ToggleButtonGroup>
      {content}
    </>
    )
}
export default SurveyBuilder;