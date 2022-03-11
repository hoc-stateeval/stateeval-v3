import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useErrorHandler } from "react-error-boundary"

import {
  Divider,
  Stack,
  Typography
} from "@mui/material";

import {
  useGetObservationsForEvaluationQuery
} from "@api-slice";

import {  
  selectActiveEvaluationId,
} from "@user-context-slice";

const Settings = () => {

  const { id } = useParams();
  const observationId = parseInt(id);
  const errorHandler = useErrorHandler();

  const evaluationId = useSelector(selectActiveEvaluationId);

  const { observation, error: getObservationsError } = 
  useGetObservationsForEvaluationQuery(evaluationId, {
    selectFromResult: ({ data }) => ({
      observation: data?.find((observation) => observation.id === observationId),
    }),
  });
  if (getObservationsError) errorHandler(getObservationsError);

  return (
    <>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <Typography><strong>Evaluator</strong></Typography>
          <Typography>{observation?.evaluatorDisplayName}</Typography>
        </Stack>
      </Stack>
      <Divider orientation="vertical" />
      <Stack direction="column" spacing={2}>
      </Stack>
    </>
  )
}

export default Settings;