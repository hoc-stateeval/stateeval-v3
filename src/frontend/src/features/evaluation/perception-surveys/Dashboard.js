import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { 
  Box,
  Button,
  Paper,
  Tab,
  Tabs,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography
 } from "@mui/material";

 import { AddCircleOutline as AddCircleOutlineIcon } from "@mui/icons-material"

import { 
  setPageTitle, 
  selectActiveWorkAreaContext,
  selectActiveEvaluationId,
 } from "@user-context-slice";
import {
  useGetPerceptionSurveysForEvaluationQuery,
  useCreatePerceptionSurveyMutation,
} from "@api-slice";

import { evaluationPaths } from '@routes/paths';
import TabPanel from "@components";

import CSTPImage from "../../../images/cstp.png";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const errorHandler = useErrorHandler();
  const evaluationId = useSelector(selectActiveEvaluationId);
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);

  const pageTitle = "Perception Surveys Dashboard";

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { data: surveys, error: getPerceptionSurveysError } = 
    useGetPerceptionSurveysForEvaluationQuery(evaluationId);
  if (getPerceptionSurveysError) {
    errorHandler(getPerceptionSurveysError);
  }

  const [createSurvey, {error: createSurveyError}] = 
    useCreatePerceptionSurveyMutation();
  if (createSurveyError) {
    errorHandler(createSurveyError);
  }

  const onChangeActiveTab = (event, activeTabIndex) => {
    setActiveTabIndex(activeTabIndex);
  };

  const onClickNewSurvey = async () => {
    const survey = await createSurvey(
      {
        evaluationId: evaluationId,
        schoolCode: activeWorkAreaContext.schoolCode,
        locationOrigin: window.location.origin.toLowerCase()
      }
    ).unwrap();
    const path = `${evaluationPaths.trMePerceptionSurveys}/${survey.id}`
    navigate(path);
  }

  // useEffect(() => {
  //   dispatch(setPageTitle(pageTitle));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTabIndex} onChange={onChangeActiveTab} aria-label="basic tabs example">
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Surveys" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={activeTabIndex} index={0} title="Perception Surveys Overview">
        <Stack direction="column" spacing={2}>
          <img style={{width: '200px'}} src={CSTPImage} alt="CSTP Logo" />
          <Typography variant="body1">
            Are you interested in hearing your students' perceptions of instruction, their learning and how they feel about class? Student perception surveys are a tool to do just that. After three years of developing our understanding and knowledge base about student perception surveys, testing various tools and working with Washington educators on what might be most useful, Washington State is launching a student perception survey feature in eVAL that is available and accessible to any Washington teacher. This intent of this survey feature is that it will be used as a reflective tool that allows teachers to better understand student perceptions and adjust practices to better support each student in the classroom.
            The Student Perception Survey items were collaboratively developed with and informed by educators, OSPI and CSTP with connections to each instructional framework. Survey items have been pre-tested and piloted by over 3,000 students in Washington. Teachers can self-select survey items they want to use with their students and receive results from students quickly, which teachers can then use to inform decisions and changes they may want to make to their instruction and practice.
            What teachers should know about this feature:
          </Typography>
          <ul>
              <li>
                <Typography variant="body1">Student responses are anonymous and teachers will see aggregate results that aren't identifiable.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">Survey items have been matched up to observable components and elements of each of the instructional frameworks. Teachers will want to select items from their district’s instructional framework and the appropriate grade levels. 
                </Typography>
              </li>
              <li>
                <Typography variant="body1">Survey items have been tested and piloted with WA students, are focused on the teaching and learning environment of the classroom and responses are based on a 5 point Likert scale (strongly disagree to strongly agree). 
                </Typography>
              </li>
              <li>
              <Typography variant="body1">While teachers can decide whether they share the results of the student perception surveys with their administrator, teachers should know that these results are better protected from a public records request if they are discussed with an evaluator. This doesn’t mean results must be shared, but the teacher must have a conversation about what they have noticed in the results that has created an interest in changing their practice, setting a new goal for the year, etc. 
                </Typography>
              </li>
              <li>
                <Typography variant="body1">This feature is electronically-based; therefore, students will need access to a device that has an internet connection.  
                </Typography>
              </li>
              <li>
                <Typography variant="body1">There are demographic questions students will be asked to respond to at the end of their survey. This information is for state use only and will not be shared with teachers or others.
                </Typography>
              </li>
          </ul>
        </Stack>
      </TabPanel>
      <TabPanel value={activeTabIndex} index={1} title="Perception Surveys">
        <Stack direction="column" spacing={2}>
        <Stack direction="row" sx={{ justifyContent: "flex-end" }} spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<AddCircleOutlineIcon />}
              onClick={onClickNewSurvey}
            >
              Add Survey
            </Button>
          </Stack>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Title
                </TableCell>
                <TableCell align="center">Survey Collection Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {surveys &&
                surveys.map((survey, i) => (
                    <TableRow key={i}>
                      <TableCell align="center">
                        {survey.title}
                      </TableCell>
                      <TableCell align="center">
                        {survey.statusDisplayString}
                      </TableCell>
                      <TableCell align="center">
                      <Button
                        component={RouterLink}
                        to={evaluationPaths.trMePerceptionSurveys}
                        color="secondary"
                        size="small"
                        variant="contained"
                      >
                        View
                      </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Stack>
      </TabPanel>
    </Box>
    </>
  );
};

export default Dashboard;
