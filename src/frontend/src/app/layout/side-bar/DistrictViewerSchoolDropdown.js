import { useState } from 'react';
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
} from '../../store/stateEval/userContextSlice';


const DistrictViewerSchoolDropDown = () => {

  const theme = useTheme();
  const dispatch = useDispatch();

  const workAreaContext = useSelector(selectActiveWorkAreaContext);

  const activeDistrictViewerSchoolCode = useSelector(selectActiveDistrictViewerSchoolCode);
  const [selectedDistrictViewerSchoolCode, setSelectedDistrictViewerSchoolCode] = useState(activeDistrictViewerSchoolCode?.schoolCode ?? "0");
  
  const { data: schools } = useGetSchoolsInDistrictQuery(workAreaContext.districtCode);
  
  const changeDistrictViewerSchool = async (schoolCode) => {
    setSelectedDistrictViewerSchoolCode(schoolCode);
    dispatch(setActiveDistrictViewerSchoolCode(schoolCode));
  }

  return (
    <>
     <TextField label="School" sx={{...getSelectStyles(theme)}}
        select
        value={selectedDistrictViewerSchoolCode}
        onChange={(e)=> {
          changeDistrictViewerSchool(parseInt(e.target.value, 10));
        }}
        >
          <MenuItem key="default" value="0">
            Select a school
          </MenuItem>
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