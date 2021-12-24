import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
  selectWorkAreaContextsAll,
  setActiveWorkAreaContext,
  selectActiveWorkAreaContext,
  selectEvaluationsAll,
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

import { 
  DistrictViewerSchoolWorkAreas, WorkAreas
} from '../../core/workAreas';
import { RoleType } from '../../core/roleType';
import { get } from '../../core/api';
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

  const districts = initDistricts(workAreaContexts);
  const [selectedDistrictCode, setSelectedDistrictCode] = useState(activeWorkAreaContext.districtCode);
  const [schools, setSchools] = useState(getSchoolsForDistrict(workAreaContexts, selectedDistrictCode));
  const [selectedSchoolCode, setSelectedSchoolCode] = useState(activeWorkAreaContext.schoolCode);

  const [filteredWorkAreaContexts, setFilteredWorkAreaContexts] = useState(getFilteredWorkAreaContexts(workAreaContexts, selectedSchoolCode));
  const [selectedWorkAreaContextId, setSelectedWorkAreaContextId] = useState(activeWorkAreaContext.id);
  const [selectedEvaluationId, setSelectedEvaluationId] = useState("0");

  const [districtViewerSchools, setDistrictViewerSchools] = useState([]);
  const [selectedDistrictViewerSchoolCode, setSelectedDistrictViewerSchoolCode] = useState("0");
  const [districtViewerEvaluators, setDistrictViewerEvaluators] = useState([]);
  const [selectedDistrictViewerEvaluatorId, setSelectedDistrictViewerEvaluatorId] = useState("0");

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

  const changeDistrictViewerSchool = (schoolCode) => {
    setSelectedDistrictViewerSchoolCode(schoolCode);
  }

  const changeDistrictViewerEvaluator = (evaluatorId) => {
    setSelectedDistrictViewerEvaluatorId(evaluatorId);
  }

  useEffect(()=> {
    (async () => {
      if (DistrictViewerSchoolWorkAreas.includes(activeWorkAreaContext.tagName)) {
        const response = await get(`districts/${activeWorkAreaContext.districtCode}/schools`);
        const data = await response.data;
        setDistrictViewerSchools(data);
      }
    })();
  }, [activeWorkAreaContext.districtCode]);

  const getEvaluatorsForDistrictViewer = async () => {
    const urlRoot = `districts/${activeWorkAreaContext.districtCode}`;
    let url = "";
    if (activeWorkAreaContext.tagName === WorkAreas.DV_PR_TR) {
      url = `${urlRoot}/usersinrole/${selectedDistrictViewerSchoolCode}/${RoleType.PR}`
    }
    else if (activeWorkAreaContext.tagName === WorkAreas.DV_PR_PR) {
      url = `${urlRoot}/usersinrole/${selectedDistrictViewerSchoolCode}/${RoleType.HEAD_PR}`
    }
    else if (activeWorkAreaContext.tagName === WorkAreas.DV_DTE) {
      url = `${urlRoot}/usersinrole/${RoleType.DTE}`
    }
    else if (activeWorkAreaContext.tagName === WorkAreas.DE_PR) {
      url = `${urlRoot}/usersinrole/${RoleType.DE_PR}`
    }

    const response = await get(url);
    return response.data;

  }
  useEffect(()=> {
    (async () => {
      if (selectedDistrictViewerSchoolCode==="0") {
        setSelectedDistrictViewerEvaluatorId("0");
      }
      else {
        const evaluators = await getEvaluatorsForDistrictViewer(activeWorkAreaContext);;
        setDistrictViewerEvaluators(evaluators);
      }
    })();
  }, [selectedDistrictViewerSchoolCode]);


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
                <MenuItem key={x.id} value={x.schoolCode}>
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
                <MenuItem key={x.id} value={x.id}>
                  {x.displayName}
                </MenuItem>
              ))}
          </TextField>
          </>
          }

          {activeWorkAreaContext.isEvaluator && 
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