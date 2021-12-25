import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
  selectWorkAreaContextsAll,
  setActiveWorkAreaContext,
  selectActiveWorkAreaContext,
  selectActiveDistrictViewerSchool,
  selectActiveDistrictViewerEvaluator,
  selectEvaluationsAll,
  setActiveEvaluationId,
  selectDistrictViewerSchoolsAll,
  selectDistrictViewerEvaluatorsAll,
  setActiveDistrictViewerEvaluator,
  setActiveDistrictViewerSchool,
} from '../../store/stateEval/userContextSlice';
import {
  Divider,
  List,
  ListSubheader,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import { DistrictViewerSchoolWorkAreas} from '../../core/workAreas';
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

  const activeDistrictViewerSchool = useSelector(selectActiveDistrictViewerSchool);
  const activeDistrictViewerEvaluator = useSelector(selectActiveDistrictViewerEvaluator);

  const districts = initDistricts(workAreaContexts);

  const districtViewerSchools = useSelector(selectDistrictViewerSchoolsAll);
  const districtViewerEvaluators = useSelector(selectDistrictViewerEvaluatorsAll);

  const [selectedDistrictCode, setSelectedDistrictCode] = useState(activeWorkAreaContext.districtCode);
  const [schools, setSchools] = useState(getSchoolsForDistrict(workAreaContexts, selectedDistrictCode));
  const [selectedSchoolCode, setSelectedSchoolCode] = useState(activeWorkAreaContext.schoolCode);

  const [filteredWorkAreaContexts, setFilteredWorkAreaContexts] = useState(getFilteredWorkAreaContexts(workAreaContexts, selectedSchoolCode));
  const [selectedWorkAreaContextId, setSelectedWorkAreaContextId] = useState(activeWorkAreaContext.id);

  const [selectedDistrictViewerSchoolCode, setSelectedDistrictViewerSchoolCode] = useState(activeDistrictViewerSchool?.schoolCode ?? "0");
  const [selectedDistrictViewerEvaluatorId, setSelectedDistrictViewerEvaluatorId] = useState(activeDistrictViewerEvaluator?.id ?? "0");

  const [selectedEvaluationId, setSelectedEvaluationId] = useState("0");

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
      setSelectedEvaluationId("0");
      await dispatch(setActiveWorkAreaContext(workArea));
  }

  useEffect(()=> {
    navigate("/app/dashboard");
  }, [selectedWorkAreaContextId, selectedEvaluationId])
  
  const changeEvaluation = async (id) => {
    setSelectedEvaluationId(id);
    await dispatch(setActiveEvaluationId(id));
  }

  const changeDistrictViewerSchool = async (schoolCode) => {
    setSelectedDistrictViewerSchoolCode(schoolCode);
    await dispatch(setActiveDistrictViewerSchool(schoolCode));
  }

  const changeDistrictViewerEvaluator = async (evaluatorId) => {
    setSelectedDistrictViewerEvaluatorId(evaluatorId);
    await dispatch(setActiveDistrictViewerEvaluator(evaluatorId));
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
            <MenuItem key={`workarea-${x.districtCode}`} value={x.districtCode}>
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
                <MenuItem key={`workarea-school${x.schoolCode}`} value={x.schoolCode}>
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
            <MenuItem key={`workarea-${x.id}`} value={x.id}>
              {x.title}
            </MenuItem>
          ))}
          </TextField>
      </Stack>
    </List>
    <List sx={{pl:2}}
      subheader={(
        <ListSubheader variant="sideBar"
          disableGutters
          disableSticky
          sx={{ ...getListSubheaderStyles()
          }}
        >
          Work Area Settings
        </ListSubheader>
      )}
    >
      <Stack spacing={3} sx={{color: theme => theme.palette.neutral[400]}}>
      {(DistrictViewerSchoolWorkAreas.includes(activeWorkAreaContext.tagName)) && 
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
              {districtViewerSchools.map((x) => (
                <MenuItem key={`dv-school-${x.id}`} value={x.schoolCode}>
                  {x.schoolName}
                </MenuItem>
              ))}
          </TextField>
          
          <TextField label="Evaluator" sx={{...getSelectStyles(theme)}}
            select
            value={selectedDistrictViewerEvaluatorId}
            onChange={(e)=> {
              changeDistrictViewerEvaluator(parseInt(e.target.value, 10));
            }}
            >
              <MenuItem key="default" value="0">
                Select an evaluator
              </MenuItem>
              {districtViewerEvaluators.map((x) => (
                <MenuItem key={`dv-evaluator-${x.id}`} value={x.id}>
                  {x.displayName}
                </MenuItem>
              ))}
          </TextField>
          </>
          }

          {(activeWorkAreaContext.isEvaluator || selectedDistrictViewerEvaluatorId!=="0") && 
          <TextField label="Evaluating" sx={{...getSelectStyles(theme, selectedEvaluationId==="0"?'red':'white')}}
            select
            value={selectedEvaluationId}
            onChange={(e)=> {
              changeEvaluation(parseInt(e.target.value, 10))
            }}
            >
              <MenuItem key="default" value="0">
                Select a {activeWorkAreaContext.evaluateeTerm}
              </MenuItem>
              {evaluations.map((x) => (
                <MenuItem key={`evaluation-${x.id}`} value={x.id}>
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