import { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel, 
  Paper,
  Radio,
  RadioGroup,
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
  useSubmitPerceptionSurveyResponsesMutation
} from "@api-slice";

import { PerceptionSurveyLevelOfAgreement, WorkState } from "@lib/enums";
import getNewGuid from "@lib/utils/getNewGuid";
import { Ethnicities } from "@lib/eval-helpers";
import tableData from "./studentSurveyTableData";

const setLocalStorage = (survey) => {
  localStorage.setItem(`perception-survey-${survey.id}`, 'true');
}

const surveyHasAlreadyBeenSubmitted = (survey) => {
  return localStorage.getItem(`perception-survey-${survey.id}`) === 'true';
}
const StudentSurveyBody = ({survey, statements}) => {

  const errorHandler = useErrorHandler();

  const initializeResults = () => {
    let results = {};
    for (const statement of statements) {
      results[statement.id] = PerceptionSurveyLevelOfAgreement.UNDEFINED;
    }
    return results;
  }

  const [submitted, setSubmitted] = useState(surveyHasAlreadyBeenSubmitted(survey));
  const [results, setResults] = useState(initializeResults());
  const [gender, setGender] = useState('0');
  const [ethnicities, setEthnicities] = useState(Ethnicities.reduce((acc, next)=> {
    acc[next.name] = false;
    return acc;
  }, {}));

  const [submitSurveyAPI, {error: submitError}] = useSubmitPerceptionSurveyResponsesMutation();
  if (submitError) errorHandler(submitError);

  const changeEthnicities = (event) => {
    setEthnicities({
      ...ethnicities,
      [event.target.name]: event.target.checked,
    });
  };

  const setResult = (statementId, levelOfAgreement) => {
    let newResults = {...results};
    newResults[statementId] = levelOfAgreement;
    setResults(newResults);
  }

  const changeGender = (newValue) => {
    setGender(newValue);
  }

  const submitSurvey = async () => {

    let responses = [];
    let respondentId = getNewGuid();

    for (const statementId in results) {
      responses.push(
        {
          surveyId: survey.id,
          statementId: statementId,
          levelOfAgreement: results[statementId],
          respondentId: respondentId
        }
      )
    }
    await submitSurveyAPI({
      surveyId: survey.id,
      responses: responses,
      ethnicities: ethnicities,
      gender: gender

    });
    setSubmitted(true);
    setLocalStorage(survey);
  }

  if (submitted) {
    return <Typography>Thank you for participating in this survey.</Typography>;
  }
  else {
    if (survey.wfState === WorkState.PERCEPTION_SURVEY_CLOSED) {
      return <Typography>This survey is temporarily closed.</Typography>
    }
    else if (survey.wfState === WorkState.PERCEPTION_SURVEY_COMPLETE) {
      return <Typography>This survey is no longer available.</Typography>
    }
    else {
      return (    
        <Stack direction="column" spacing={3}>
          <Typography sx={{textAlign:'center'}} variant="h2">Student Survey for Secondary School</Typography>
          <Typography>
            The teacher of this class wants to get your opinions in order to improve your learning
            experience. For each statement below, please indicate your level of agreement by selecting
            one box, from strongly disagree to strongly agree. Keep in mind that <strong>your selections
                relate only for this teacher and this class</strong>
          </Typography>

          <TableContainer component={Paper}>
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Statement</TableCell>
                    {tableData.map((x,i)=>(
                      <TableCell key={i} align="center">{x.levelOfAgreementTitle}</TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
              {statements.map((statement, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell align="left">{i+1}</TableCell>
                      <TableCell align="left" sx={{width:'40%'}}>{statement.text}</TableCell>
                      {tableData.map((x,j)=>(
                      <TableCell key={j} align="center">
                        <Radio
                          name={j.toString()}
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
          <Typography>
            <strong>Demographic Information:</strong> (This information is for state use only and will not be shared with teachers or others.)
          </Typography>
          <Stack direction="column" spacing={2}>
            <FormControl>
              <FormLabel id="gender-radio-buttons-group-label"><strong>Gender</strong></FormLabel>
              <RadioGroup row
                sx={{ml:3}}
                aria-labelledby="gender-radio-buttons-group-label"
                defaultValue="0"
                value={gender}
                onChange={(e) => {
                  changeGender(e.target.value);
                }}
                name="gender-radio-buttons-group"
              >
                <FormControlLabel value="F" control={<Radio />} label="Female" />
                <FormControlLabel value="M" control={<Radio />} label="Male" />
                <FormControlLabel value="O" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel component="legend"><strong>Race/Ethnic Group (select all that apply):</strong></FormLabel>
              <FormGroup sx={{ml:3}}>
                {Ethnicities.map((x,i)=> {
                  return (
                    <FormControlLabel key={i}
                      control={
                        <Checkbox checked={ethnicities[x]} onChange={changeEthnicities} name={x.name} />
                      }
                      label={x.name}
                    />
                  )
                })}
              </FormGroup>
            </FormControl>
            <Box sx={{textAlign: 'center'}}>
              <Button onClick={submitSurvey}>Submit Survey</Button>
            </Box>
          </Stack>
      </Stack>)
    }
  }
}

export default StudentSurveyBody;