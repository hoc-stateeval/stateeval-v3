import { useDispatch, useSelector } from 'react-redux';

import {
  MenuItem,
  TextField,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import { getSelectStyles } from './selectItemStyles';

import {
  useGetSchoolsInDistrictQuery,
 } from '../../core/apiSlice';

 import {
  selectActiveWorkAreaContext,
  setActiveDistrictViewerSchoolCode,
  selectActiveDistrictViewerSchoolCode,
  setActiveDistrictViewerEvaluatorId,
  setActiveEvaluation,
} from '../../store/stateEval/userContextSlice';


const DistrictViewerSchoolDropDown = () => {

  const theme = useTheme();
  const dispatch = useDispatch();

  const workAreaContext = useSelector(selectActiveWorkAreaContext);

  const activeDistrictViewerSchoolCode = useSelector(selectActiveDistrictViewerSchoolCode);
  
  const { data: schools } = useGetSchoolsInDistrictQuery(workAreaContext.districtCode);
  
  const changeDistrictViewerSchool = async (schoolCode) => {
    dispatch(setActiveDistrictViewerSchoolCode(schoolCode));
    dispatch(setActiveDistrictViewerEvaluatorId("0"));
    dispatch(setActiveEvaluation(null));
  }

  return (
    <>
     <TextField label="School" sx={{...getSelectStyles(theme)}}
        select
        value={activeDistrictViewerSchoolCode}
        onChange={(e)=> {
          changeDistrictViewerSchool(parseInt(e.target.value, 10));
        }}
        >
          {activeDistrictViewerSchoolCode==="0" &&
            <MenuItem key="default" value="0">
            Select a school
          </MenuItem>
          }
          {schools && schools.map((x) => (
            <MenuItem key={`dv-school-${x.id}`} value={x.schoolCode}>
              {x.schoolName}
            </MenuItem>
          ))}
      </TextField>
    </>
  );
};

export default DistrictViewerSchoolDropDown;