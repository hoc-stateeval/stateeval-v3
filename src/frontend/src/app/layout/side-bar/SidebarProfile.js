import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const SidebarProfile = ({ currentWorkAreaContext}) => {

  const theme = useTheme();
  const dispatch = useDispatch();
  const workAreaContexts = useSelector(selectWorkAreaContextsAll);
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const [districts, setDistricts] = useState([]);
  const [schools, setSchools] = useState([]);
  const [selectedDistrictCode, setSelectedDistrictCode] = useState('');
  const [selectedSchoolCode, setSelectedSchoolCode] = useState('');
  const [filteredWorkAreaContexts, setFilteredWorkAreaContexts] = useState([]);
  const [selectedWorkAreaContextId, setSelectedWorkAreaContextId] = useState('');
  const evaluations = useSelector(selectEvaluationsAll);
  const activeEvaluationId = useSelector(selectActiveEvaluationId);

  useEffect(() => {
    const changeSchool = () => {
      const finalWorkAreas = workAreaContexts.filter(
        (x) => x.districtCode === selectedDistrictCode && x.schoolCode === selectedSchoolCode
      );
      setFilteredWorkAreaContexts(finalWorkAreas);
      setSelectedWorkAreaContextId(activeWorkAreaContext.id);
    };

    changeSchool();
  }, [workAreaContexts, selectedDistrictCode, selectedSchoolCode, activeWorkAreaContext.id]);

  useEffect(() => {
    const changeDistrict = () => {
      const distinctSchools = [];
      for (let i = 0; i < workAreaContexts.length; ++i) {
        const workAreaContext = workAreaContexts[i];
        if (
          workAreaContext.districtCode === selectedDistrictCode &&
          !distinctSchools.find((x) => x.schoolCode === workAreaContext.schoolCode)
        ) {
          distinctSchools.push({
            districtCode: workAreaContext.districtCode,
            schoolCode: workAreaContext.schoolCode,
            schoolName: workAreaContext.schoolName ? workAreaContext.schoolName : 'District Wide',
          });
        }
      }
      setSchools(distinctSchools);
      setSelectedSchoolCode(activeWorkAreaContext.schoolCode);
    };
    if (selectedDistrictCode !== '') changeDistrict();
  }, [workAreaContexts, selectedDistrictCode, activeWorkAreaContext.schoolCode]);

  useEffect(() => {
    const initDistricts = () => {
      const distinctDistricts = [];
      for (let i = 0; i < workAreaContexts.length; ++i) {
        const workAreaContext = workAreaContexts[i];
        if (!distinctDistricts.find((x) => x.districtCode === workAreaContext.districtCode)) {
          distinctDistricts.push({
            districtCode: workAreaContext.districtCode,
            districtName: workAreaContext.districtName,
          });
        }
      }

      setDistricts(distinctDistricts);
      setSelectedDistrictCode(activeWorkAreaContext.districtCode);
    };
    if (workAreaContexts.length > 0) initDistricts();
  }, [workAreaContexts, activeWorkAreaContext.districtCode]);

  const handleClickChangeWorkArea = async () => {
    const workArea = workAreaContexts.find((x) => x.id === selectedWorkAreaContextId);
    await dispatch(setActiveWorkAreaContext(workArea));
  };

  const changeSelectedEvaluation = (e) => {
    const evaluationId = parseInt(e.target.value, 10);
    dispatch(setActiveEvaluationId(evaluationId));
  };

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
            setSelectedDistrictCode(e.target.value);
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
                setSelectedSchoolCode(e.target.value);
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
            onChange={(e) => {
              setSelectedWorkAreaContextId(parseInt(e.target.value, 10));
            }}
          >
            {filteredWorkAreaContexts.map((x) => (
            <MenuItem key={x.id} value={x.id}>
              {x.title}
            </MenuItem>
          ))}
          </TextField>

          {activeWorkAreaContext.isEvaluator && 
          <TextField label="Evaluating" sx={{...getSelectStyles(theme, !activeEvaluationId?'red':'white')}}
            select
            value={activeEvaluationId || "0"}
            onChange={changeSelectedEvaluation}
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