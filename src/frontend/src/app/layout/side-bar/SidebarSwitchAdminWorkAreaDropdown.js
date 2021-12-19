import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
  MenuItem,
  TextField,
} from '@mui/material';

import {
  setActiveWorkAreaContext,
  selectActiveWorkAreaContext,
  selectWorkAreaContextsAll,
} from '../../store/stateEval/userContextSlice';

import { 
  DistrictAdminWorkAreas,
 } from '../../core/workAreas';


const SidebarSwitchAdminWorkAreaDropdown = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const workAreaContexts = useSelector(selectWorkAreaContextsAll);
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);

  const districtAdminWorkAreaContexts = workAreaContexts
          .filter(x=>x.districtCode === activeWorkAreaContext.districtCode &&
                  DistrictAdminWorkAreas.includes(x.tagName));

  const [selectedWorkAreaContextId, setSelectedWorkAreaContextId] = useState(activeWorkAreaContext.id);

  const changeActiveWorkAreaContext = async (e) => {
    const contextId = parseInt(e.target.value, 10);
    setSelectedWorkAreaContextId(contextId);
    const workArea = workAreaContexts.find((x) => x.id === contextId);
    await dispatch(setActiveWorkAreaContext(workArea));
    navigate("/app/dashboard");
  };

  return (
    <TextField
    size="small"
    sx={{ 
      width: 200, 
      "& .MuiSelect-select": {color: 'white', fontSize:'12px'}
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