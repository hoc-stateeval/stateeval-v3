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
  List,
  ListSubheader,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import SidebarEvaluatingDropdown from './SidebarEvaluatingDropdown';

import { DistrictViewerSchoolWorkAreas, WorkAreas} from '../../core/workAreas';
import { getListSubheaderStyles } from './listItemStyles';
import { getSelectStyles } from './selectItemStyles';

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

const SidebarWorkAreaContext = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const workAreaContexts = useSelector(selectWorkAreaContextsAll);
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
 
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
  }

  useEffect(()=> {
    navigate("/app/dashboard");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWorkAreaContextId])

  const changeDistrictViewerSchool = async (schoolCode) => {
    setSelectedDistrictViewerSchoolCode(schoolCode);
    await dispatch(setActiveDistrictViewerSchool(schoolCode));
  }

  const changeDistrictViewerEvaluator = async (evaluatorId) => {
    setSelectedDistrictViewerEvaluatorId(evaluatorId);
    await dispatch(setActiveDistrictViewerEvaluator(evaluatorId));
  }

  const buildEvaluatorLabel = () => {
    if (activeWorkAreaContext.tagName === WorkAreas.DV_PR_PR) {
      return "Head Principal";
    }
    else if (activeWorkAreaContext.tagName === WorkAreas.DV_PR_TR) {
      return "Principal";
    }
    else if (activeWorkAreaContext.tagName === WorkAreas.DV_DTE) {
      return "DTE";
    }
    else if (activeWorkAreaContext.tagName === WorkAreas.DV_DE) {
      return "District Evaluator";
    }
    return "Evaluator";
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
        <TextField label="Work Area"  sx={{...getSelectStyles(theme, 'white')}}
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
          
          <TextField label={buildEvaluatorLabel()} sx={{...getSelectStyles(theme)}}
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
          <SidebarEvaluatingDropdown workAreaContext={activeWorkAreaContext} />
          }
      </Stack>
    </List>
    </>
  );
};

export default SidebarWorkAreaContext;