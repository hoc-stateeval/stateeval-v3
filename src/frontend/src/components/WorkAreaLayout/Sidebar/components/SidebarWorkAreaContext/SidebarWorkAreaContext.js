import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useErrorHandler } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import { List, ListSubheader, MenuItem, Stack, TextField } from "@mui/material";

import { useTheme } from "@mui/material/styles";

import {
  selectActiveWorkAreaContext,
  setActiveWorkAreaContext,
} from "@user-context-slice";

import {
  useGetWorkAreaContextsForUserQuery
} from "@api-slice";

import {
  DistrictViewerSchoolEvaluatorWorkAreas,
  DistrictViewerDistrictEvaluatorWorkAreas,
  EvaluatorWorkAreas,
  getDefaultPathForWorkAreaContext,
} from "@lib/eval-helpers";

import DistrictViewerDistrictEvaluatorOptions from "./DistrictViewerDistrictEvaluatorOptions";
import DistrictViewerSchoolEvaluatorOptions from "./DistrictViewerSchoolEvaluatorOptions";
import EvaluatingDropDown from "./EvaluatingDropDown";

import { getListSubheaderStyles } from "./styles/listItemStyles";
import { getSelectStyles } from "./styles/selectItemStyles";

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
    if (
      next.districtCode === districtCode &&
      !acc.find((x) => x.schoolCode === next.schoolCode)
    ) {
      acc.push({
        districtCode: next.districtCode,
        schoolCode: next.schoolCode,
        schoolName: next.schoolName || "District Wide",
      });
    }
    return acc;
  }, []);
};

const getFilteredWorkAreaContexts = (workAreaContexts, schoolCode) => {
  return workAreaContexts.filter((x) => x.schoolCode === schoolCode);
};

const SidebarWorkAreaContext = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
 
  const [selectedDistrictCode, setSelectedDistrictCode] = useState(activeWorkAreaContext.districtCode);
  const [selectedSchoolCode, setSelectedSchoolCode] = useState(activeWorkAreaContext.schoolCode);
  const [selectedWorkAreaContextId, setSelectedWorkAreaContextId] = useState(activeWorkAreaContext.id);
  const [districts, setDistricts] = useState([]);
  const [schools, setSchools] = useState([]);
  const [filteredWorkAreaContexts, setFilteredWorkAreaContexts] = useState([]);

  const { data: workAreaContexts, error: getWorkAreaContextsError } = 
    useGetWorkAreaContextsForUserQuery(activeWorkAreaContext.userId);
  if (getWorkAreaContextsError) errorHandler(getWorkAreaContextsError);

  useEffect(()=> {
    if (!workAreaContexts) return;

    setSchools(getSchoolsForDistrict(workAreaContexts, selectedDistrictCode));
    setDistricts(initDistricts(workAreaContexts));
  }, [workAreaContexts, selectedDistrictCode]);

  useEffect(()=> {
    if (!workAreaContexts) return;

    setFilteredWorkAreaContexts(getFilteredWorkAreaContexts(workAreaContexts, selectedSchoolCode));
  }, [workAreaContexts, selectedSchoolCode]);

  const changeDistrict = (districtCode) => {
    setSelectedDistrictCode(districtCode);

    const schools = getSchoolsForDistrict(workAreaContexts, districtCode);
    setSchools(schools);
    changeSchool(schools[0].schoolCode);
  };

  const changeSchool = (schoolCode) => {
    setSelectedSchoolCode(schoolCode);

    const filteredContexts = getFilteredWorkAreaContexts(
      workAreaContexts,
      schoolCode
    );
    setFilteredWorkAreaContexts(filteredContexts);
    changeWorkAreaContext(filteredContexts[0].id);
  };

  const changeWorkAreaContext = async (id) => {
    const workAreaContext = workAreaContexts.find((x) => x.id === id);
    setSelectedWorkAreaContextId(workAreaContext.id);
    await dispatch(setActiveWorkAreaContext(workAreaContext));

    const defaultPath = getDefaultPathForWorkAreaContext(workAreaContext);
    navigate(defaultPath);
  };

  // show settings section for those work areas that have extra configuration
  // for example, PR_TR has the EvaluatingDropdown to select the teacher
  // to evaluate
  const showWorkAreaSettings =
    DistrictViewerDistrictEvaluatorWorkAreas.includes(
      activeWorkAreaContext.tagName
    ) ||
    DistrictViewerSchoolEvaluatorWorkAreas.includes(
      activeWorkAreaContext.tagName
    ) ||
    EvaluatorWorkAreas.includes(activeWorkAreaContext.tagName);

  if (districts.length===0 || schools.length===0) {
    return (<></>)
  }

  return (
    <>
      <List
        sx={{ pl: 2 }}
        subheader={
          <ListSubheader
            variant="sideBar"
            disableGutters
            disableSticky
            sx={{ ...getListSubheaderStyles() }}
          >
            Work-area
          </ListSubheader>
        }
      >
        <Stack
          spacing={3}
          sx={{ color: (theme) => theme.palette.neutral[400] }}
        >
          <TextField
            label="District"
            sx={{ ...getSelectStyles(theme) }}
            select
            value={selectedDistrictCode}
            onChange={(e) => {
              changeDistrict(e.target.value);
            }}
          >
            {districts.map((x) => (
              <MenuItem
                key={`workarea-${x.districtCode}`}
                value={x.districtCode}
              >
                {x.districtName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
              label="School"
              sx={{ ...getSelectStyles(theme) }}
              select
              value={selectedSchoolCode}
              onChange={(e) => {
                changeSchool(e.target.value);
              }}
            >
              {schools.map((x) => (
                <MenuItem
                  key={`workarea-school${x.schoolCode}`}
                  value={x.schoolCode}
                >
                  {x.schoolName}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            label="Work Area"
            sx={{ ...getSelectStyles(theme, "white") }}
            select
            value={selectedWorkAreaContextId}
            onChange={(e) => {
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
      
      {showWorkAreaSettings && (
        <List
          sx={{ pl: 2 }}
          subheader={
            <ListSubheader
              variant="sideBar"
              disableGutters
              disableSticky
              sx={{ ...getListSubheaderStyles() }}
            >
              Work Area Settings
            </ListSubheader>
          }
        >
          <Stack
            spacing={3}
            sx={{ color: (theme) => theme.palette.neutral[400] }}
          >
            {DistrictViewerDistrictEvaluatorWorkAreas.includes(
              activeWorkAreaContext.tagName
            ) && (
              <DistrictViewerDistrictEvaluatorOptions
                workAreaContext={activeWorkAreaContext}
              />
            )}
            {DistrictViewerSchoolEvaluatorWorkAreas.includes(
              activeWorkAreaContext.tagName
            ) && (
              <DistrictViewerSchoolEvaluatorOptions
                workAreaContext={activeWorkAreaContext}
              />
            )}
            {EvaluatorWorkAreas.includes(activeWorkAreaContext.tagName) && (
              <EvaluatingDropDown evaluatees={activeWorkAreaContext.evaluatees} />
            )}
          </Stack>
        </List>
      )}
    </>
  );
};

export default SidebarWorkAreaContext;
