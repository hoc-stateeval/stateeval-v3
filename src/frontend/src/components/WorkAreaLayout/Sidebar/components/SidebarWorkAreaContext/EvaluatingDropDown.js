import { useDispatch, useSelector } from "react-redux";
import { MenuItem, TextField } from "@mui/material";

import {
  setActiveEvaluationId,
  selectActiveEvaluationId,
  selectActiveWorkAreaContext,
} from "@user-context-slice";

import { useTheme } from "@mui/material/styles";
import { getSelectStyles } from "./styles/selectItemStyles";

const EvaluatingDropDown = ({ evaluatees }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const workAreaContext = useSelector(selectActiveWorkAreaContext);
  const activeEvaluationId = useSelector(selectActiveEvaluationId);

  const changeEvaluation = async (evaluationId) => {
    const evaluatee = evaluatees.find((x) => x.evaluationId === evaluationId);
    dispatch(setActiveEvaluationId(evaluatee.evaluationId));
  };
  return (
    <>
      {evaluatees && (
        <TextField
          label="Evaluating"
          sx={{
            ...getSelectStyles(
              theme,
              activeEvaluationId === "0" ? "red" : "white"
            ),
          }}
          select
          value={activeEvaluationId}
          onChange={(e) => {
            changeEvaluation(parseInt(e.target.value, 10));
          }}
        >
          {activeEvaluationId === "0" && (
            <MenuItem key="default" value="0">
              Select a {workAreaContext.evaluateeTerm}
            </MenuItem>
          )}
          {evaluatees.map((x, i) => (
            <MenuItem key={i} value={x.evaluationId}>
              {x.displayName}
            </MenuItem>
          ))}
        </TextField>
      )}
    </>
  );
};

export default EvaluatingDropDown;
