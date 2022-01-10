import { useSelector, useDispatch } from "react-redux";
import { MenuItem, TextField } from "@mui/material";

import {
  selectStateFramework,
  selectInstructionalFramework,
  selectActiveFrameworkId,
  setActiveFrameworkId,
} from "@user-context-slice";

const FrameworkSwitcher = () => {
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
      <TextField
        size="small"
        sx={{
          width: 200,
        }}
        select
        value={activeFrameworkId}
        onChange={changeSelectedFramework}
      >
        {stateFramework && (
          <MenuItem key={stateFramework.id} value={stateFramework.id}>
            {stateFramework.name}
          </MenuItem>
        )}
        {instructionalFramework && (
          <MenuItem
            key={instructionalFramework.id}
            value={instructionalFramework.id}
          >
            {instructionalFramework.name}
          </MenuItem>
        )}
      </TextField>
    </>
  );
};

export default FrameworkSwitcher;
