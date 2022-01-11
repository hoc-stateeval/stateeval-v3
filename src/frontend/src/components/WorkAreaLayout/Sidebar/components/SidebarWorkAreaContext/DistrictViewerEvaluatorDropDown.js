import { useDispatch, useSelector } from "react-redux";

import { MenuItem, TextField } from "@mui/material";

import { useTheme } from "@mui/material/styles";

import { WorkArea } from "@lib/enums";
import { DistrictViewerSchoolEvaluatorWorkAreas } from "@lib/eval-helpers";
import { getSelectStyles } from "./styles/selectItemStyles";

import { useGetEvaluatorsForDistrictViewerQuery } from "@api-slice";

import {
  setActiveDistrictViewerEvaluatorId,
  selectActiveWorkAreaContext,
  selectActiveDistrictViewerEvaluatorId,
  selectActiveDistrictViewerSchoolCode,
} from "@user-context-slice";

const buildEvaluatorLabel = (tagName) => {
  if (tagName === WorkArea.DV_PR_PR) {
    return "Head Principal";
  } else if (tagName === WorkArea.DV_PR_TR) {
    return "Principal";
  } else if (tagName === WorkArea.DV_DE) {
    return "District Evaluator";
  } else if (tagName === WorkArea.DV_DTE) {
    return "District-wide Teacher Evaluator";
  } else if (tagName === WorkArea.DV_CT) {
    return "Consulting Teacher";
  }
  return "Evaluator";
};

const DistrictViewerEvaluatorDropDown = ( {schoolCode}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const activeDistrictViewerEvaluatorId = useSelector(
    selectActiveDistrictViewerEvaluatorId
  );

  const waitOnDependencies =
    DistrictViewerSchoolEvaluatorWorkAreas.includes(
      activeWorkAreaContext.tagName
    ) && schoolCode === "0";
  const { data: evaluators } = useGetEvaluatorsForDistrictViewerQuery(
    {
      workAreaContextId: activeWorkAreaContext.id,
      schoolCode: schoolCode,
    },
    { skip: waitOnDependencies }
  );

  const changeDistrictViewerEvaluator = async (evaluatorId) => {
    dispatch(setActiveDistrictViewerEvaluatorId(evaluatorId));
  };
  return (
    <>
      <TextField
        label={buildEvaluatorLabel(activeWorkAreaContext.tagName)}
        sx={{
          ...getSelectStyles(
            theme,
            activeDistrictViewerEvaluatorId === "0" ? "red" : "white"
          ),
        }}
        select
        value={activeDistrictViewerEvaluatorId}
        onChange={(e) => {
          changeDistrictViewerEvaluator(parseInt(e.target.value, 10));
        }}
      >
        {activeDistrictViewerEvaluatorId === "0" && (
          <MenuItem key="default" value="0">
            Select an Evaluator
          </MenuItem>
        )}
        {!waitOnDependencies &&
          evaluators &&
          evaluators.map((x) => (
            <MenuItem key={`dv-evaluator-${x.id}`} value={x.id}>
              {x.displayName}
            </MenuItem>
          ))}
      </TextField>
    </>
  );
};

export default DistrictViewerEvaluatorDropDown;
