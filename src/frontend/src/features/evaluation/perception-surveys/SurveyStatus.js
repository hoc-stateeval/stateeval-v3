import {
  Alert,
  AlertTitle,
  Button,
  Stack,
  Typography
} from "@mui/material";

import { WorkState } from "@lib/enums";
import copyToClipboard from "@lib/utils/copyToClipboard";

const SurveyStatus = ({survey, checkedIds}) => {

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
     {survey.wfState === WorkState.PERCEPTION_SURVEY_BUILDING && checkedIds.length===0 &&
      <Alert severity="warning">
        <AlertTitle>Status: Incomplete</AlertTitle>
        <Typography>
          This survey must have at least one statement included before it can be previewed or opened.
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

export default SurveyStatus;