
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectStateFramework,
  selectInstructionalFramework,
  selectActiveFrameworkId,
  setActiveFrameworkId,
} from '../../../store/stateEval/userContextSlice';

function FrameworkSwitcher() {
  const dispatch = useDispatch();
  const stateFramework = useSelector(selectStateFramework);
  const instructionalFramework = useSelector(selectInstructionalFramework);
  const activeFrameworkId = useSelector(selectActiveFrameworkId);

  const changeSelectedFramework = (e) => {
    const frameworkId = parseInt(e.target.value, 10);
    dispatch(setActiveFrameworkId(frameworkId));
  };

  return (
    <>
      <Select
        value={activeFrameworkId}
        onChange={changeSelectedFramework}
        displayEmpty
        name="framework"
        classes={{ select: 'py-8' }}
      >
        {stateFramework && (
          <MenuItem key={stateFramework.id} value={stateFramework.id}>
            {stateFramework.name}
          </MenuItem>
        )}
        {instructionalFramework && (
          <MenuItem key={instructionalFramework.id} value={instructionalFramework.id}>
            {instructionalFramework.name}
          </MenuItem>
        )}
      </Select>
    </>
  );
}

export default FrameworkSwitcher;


