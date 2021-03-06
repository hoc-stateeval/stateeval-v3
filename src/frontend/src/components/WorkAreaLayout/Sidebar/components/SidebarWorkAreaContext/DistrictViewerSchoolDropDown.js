import { useDispatch, useSelector } from "react-redux";
import { useErrorHandler } from "react-error-boundary";

import { MenuItem, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { getSelectStyles } from "./styles/selectItemStyles";

import { useGetSchoolsInDistrictQuery } from "@api-slice";

import {
  selectActiveWorkAreaContext,
  setActiveDistrictViewerSchoolCode,
  selectActiveDistrictViewerSchoolCode,
  setActiveDistrictViewerEvaluatorId,
  setActiveEvaluationId,
} from "@user-context-slice";

const DistrictViewerSchoolDropDown = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const errorHandler = useErrorHandler();

  const workAreaContext = useSelector(selectActiveWorkAreaContext);

  const activeDistrictViewerSchoolCode = useSelector(selectActiveDistrictViewerSchoolCode);

  const { data: schools, error: getSchoolsError } = 
    useGetSchoolsInDistrictQuery(workAreaContext.districtCode);
  if (getSchoolsError) errorHandler(getSchoolsError);

  const changeDistrictViewerSchool = async (schoolCode) => {
    dispatch(setActiveDistrictViewerSchoolCode(schoolCode));
    dispatch(setActiveDistrictViewerEvaluatorId("0"));
    dispatch(setActiveEvaluationId(null));
  };

  return (
    <>
      <TextField
        label="School"
        sx={{ ...getSelectStyles(theme) }}
        select
        value={activeDistrictViewerSchoolCode}
        onChange={(e) => {
          changeDistrictViewerSchool(parseInt(e.target.value, 10));
        }}
      >
        {activeDistrictViewerSchoolCode === "0" && (
          <MenuItem key="default" value="0">
            Select a school
          </MenuItem>
        )}
        {schools &&
          schools.map((x) => (
            <MenuItem key={`dv-school-${x.id}`} value={x.schoolCode}>
              {x.schoolName}
            </MenuItem>
          ))}
      </TextField>
    </>
  );
};

export default DistrictViewerSchoolDropDown;
