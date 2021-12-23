import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
  selectWorkAreaContextsAll,
  setActiveWorkAreaContext,
  selectActiveWorkAreaContext,
  selectEvaluationsAll,
  selectActiveEvaluationId,
  setActiveEvaluationId,
} from '../../store/stateEval/userContextSlice';
import {
  List,
  ListSubheader,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { getListSubheaderStyles } from './listItemStyles';

const getSelectStyles = (theme, highlight) => {
  const defaultColor = theme.palette.neutral[400];
  return {
    width: '190px',
    "& .MuiOutlinedInput-root": {
      '& fieldset': {
        color: defaultColor,
        borderColor: defaultColor,
      },
    },
    '& label': {
      color: theme.palette.secondary.dark,
      borderColor: defaultColor,
    },
    "& .MuiSelect-icon": { 
      color: defaultColor,
    },
    "& .MuiSelect-select": { 
      padding: "4px 8px",
      fontSize:'11px',
      color: highlight || 'defaultColor',
    },
  };
};

const initDistricts = (workAreaContexts) => {
  return workAreaContexts.reduce((acc, next) => {
    if (!acc.find((x) => x.districtCode === next.districtCode)) {
      acc.push({
        districtCode: next.districtCode,
        districtName: next.districtName,
      });
    }
    return acc;
  }, []);
};

const getSchoolsForDistrict = (workAreaContexts, districtCode) => {
  return workAreaContexts.reduce((acc, next) => {
    if (next.districtCode === districtCode && !acc.find((x) => x.schoolCode === next.schoolCode)) {
      acc.push({
        districtCode: next.districtCode,
        schoolCode: next.schoolCode,
        schoolName: next.schoolName  || 'District Wide',
      });
    }
    return acc;
  }, []);
}

const getFilteredWorkAreaContexts = (workAreaContexts, schoolCode) => {
  return  workAreaContexts.filter(
    (x) => x.schoolCode === schoolCode
  );
}

const SidebarProfile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const workAreaContexts = useSelector(selectWorkAreaContextsAll);
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const evaluations = useSelector(selectEvaluationsAll);
  const activeEvaluationId = useSelector(selectActiveEvaluationId);

  const districts = initDistricts(workAreaContexts);
  const [selectedDistrictCode, setSelectedDistrictCode] = useState(activeWorkAreaContext.districtCode);
  const [schools, setSchools] = useState(getSchoolsForDistrict(workAreaContexts, selectedDistrictCode));
  const [selectedSchoolCode, setSelectedSchoolCode] = useState(activeWorkAreaContext.schoolCode);

  const [filteredWorkAreaContexts, setFilteredWorkAreaContexts] = useState(getFilteredWorkAreaContexts(workAreaContexts, selectedSchoolCode));
  const [selectedWorkAreaContextId, setSelectedWorkAreaContextId] = useState(activeWorkAreaContext.id);
  const [selectedEvaluationId, setSelectedEvaluationId] = useState("0");

  // useEffect(() => {
  //   const schools = getSchoolsForDistrict(workAreaContexts, selectedDistrictCode);
  //   setSchools(schools);
  //   setSelectedSchoolCode(schools[0].schoolCode);
  // }, [workAreaContexts, selectedDistrictCode]);

  // useEffect(() => {
  //   const filteredContexts = getFilteredWorkAreaContexts(workAreaContexts, selectedSchoolCode);
  //   setFilteredWorkAreaContexts(filteredContexts);
  //   setSelectedWorkAreaContextId(filteredContexts[0].id);
  // }, [workAreaContexts, selectedSchoolCode]);

  // useEffect(()=> {
  //   (async () => {
  //     const workArea = workAreaContexts.find((x) => x.id === selectedWorkAreaContextId);
  //     await dispatch(setActiveWorkAreaContext(workArea));
  //     navigate("/app/dashboard");
  //   })();
  // }, [workAreaContexts, selectedWorkAreaContextId, navigate, dispatch])

  // useEffect(()=> {
  //   (async () => {
  //     await dispatch(setActiveEvaluationId(selectedEvaluationId));
  //     navigate("/app/dashboard");
  //   })();
  // }, [selectedEvaluationId, navigate, dispatch]);

  const changeDistrict = (districtCode) => {
    setSelectedDistrictCode(districtCode);

    const schools = getSchoolsForDistrict(workAreaContexts, districtCode);
    setSchools(schools);
    changeSchool(schools[0].schoolCode);
  }

  const changeSchool = (schoolCode) => {
    setSelectedSchoolCode(schoolCode);

    const filteredContexts = getFilteredWorkAreaContexts(workAreaContexts, schoolCode);
    setFilteredWorkAreaContexts(filteredContexts);
    changeWorkAreaContext(filteredContexts[0].id);
  }

  const changeWorkAreaContext = async (id) => {
      const workArea = workAreaContexts.find((x) => x.id === id);
      setSelectedWorkAreaContextId(workArea.id);
      await dispatch(setActiveWorkAreaContext(workArea));
      navigate("/app/dashboard");
  }
  
  return (
    <>
    <List sx={{pl:2}}
      subheader={(
        <ListSubheader variant="sideBar"
          disableGutters
          disableSticky
          sx={{ ...getListSubheaderStyles()
          }}
        >
          Work-area
        </ListSubheader>
      )}
    >
      <Stack spacing={3} sx={{color: theme => theme.palette.neutral[400]}}>
        <TextField label="District" sx={{...getSelectStyles(theme)}}
          select
          value={selectedDistrictCode}
          onChange={(e) => {
            changeDistrict(e.target.value);
          }}
        >
          {districts.map((x) => (
            <MenuItem key={x.districtCode} value={x.districtCode}>
              {x.districtName}
            </MenuItem>
          ))}
        </TextField>

          {selectedSchoolCode &&
          <TextField label="School" sx={{...getSelectStyles(theme)}}
              select
              value={selectedSchoolCode}
              onChange={(e) => {
                changeSchool(e.target.value);
              }}
            >
              {schools.map((x) => (
                <MenuItem key={x.schoolCode} value={x.schoolCode}>
                  {x.schoolName}
                </MenuItem>
              ))}
            </TextField>
        }
        <TextField label="Work Area"  sx={{...getSelectStyles(theme)}}
            select
            value={selectedWorkAreaContextId}
            onChange={(e)=> {
              changeWorkAreaContext(parseInt(e.target.value, 10));
            }}
          >
            {filteredWorkAreaContexts.map((x) => (
            <MenuItem key={x.id} value={x.id}>
              {x.title}
            </MenuItem>
          ))}
          </TextField>

          {activeWorkAreaContext.isEvaluator && 
          <TextField label="Evaluating" sx={{...getSelectStyles(theme, !selectedEvaluationId?'red':'white')}}
            select
            value={selectedEvaluationId || "0"}
            onChange={(e)=> {
              setSelectedEvaluationId(parseInt(e.target.value, 10));
            }}
            >
              <MenuItem key="default" value="0">
                Select a {activeWorkAreaContext.evaluateeTerm}
              </MenuItem>
              {evaluations.map((x) => (
                <MenuItem key={x.id} value={x.id}>
                  {x.evaluateeDisplayName}
                </MenuItem>
              ))}
      </TextField>}
      </Stack>
    </List>
    </>
  );
};

export default SidebarProfile;