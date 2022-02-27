import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useErrorHandler } from "react-error-boundary";
import { MenuItem, TextField } from "@mui/material";

import {
  setActiveWorkAreaContext,
  selectActiveWorkAreaContext,  
} from "@user-context-slice";

import {
  DistrictAdminWorkAreas,
  getDefaultPathForWorkAreaContext,
} from "@lib/eval-helpers";

import {
  useGetWorkAreaContextsForUserQuery
} from "@api-slice";

const SidebarSwitchAdminWorkAreaDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorHandler = useErrorHandler();

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const [selectedWorkAreaContextId, setSelectedWorkAreaContextId] = useState(activeWorkAreaContext.id);

  const { data: workAreaContexts, isSuccess: getWorkAreaContextsIsSuccess, error: getWorkAreaContextsError } = 
    useGetWorkAreaContextsForUserQuery(activeWorkAreaContext.userId);
  if (getWorkAreaContextsError) errorHandler(getWorkAreaContextsError);

  const districtAdminWorkAreaContexts = [];
  if (getWorkAreaContextsIsSuccess) {
      workAreaContexts.filter(
      (x) =>
        x.districtCode === activeWorkAreaContext.districtCode &&
        DistrictAdminWorkAreas.includes(x.tagName)
    );
  }

  const changeActiveWorkAreaContext = async (e) => {
    const contextId = parseInt(e.target.value, 10);
    setSelectedWorkAreaContextId(contextId);
    const workArea = workAreaContexts.find((x) => x.id === contextId);
    await dispatch(setActiveWorkAreaContext(workArea));
    navigate(getDefaultPathForWorkAreaContext(workArea), true);
  };

  return (
    <TextField
      size="small"
      sx={{
        width: 200,
        "& .MuiSelect-select": { color: "white", fontSize: "12px" },
      }}
      select
      value={selectedWorkAreaContextId}
      onChange={changeActiveWorkAreaContext}
    >
      {districtAdminWorkAreaContexts.map((x) => (
        <MenuItem key={x.id} value={x.id}>
          {x.title}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SidebarSwitchAdminWorkAreaDropdown;
