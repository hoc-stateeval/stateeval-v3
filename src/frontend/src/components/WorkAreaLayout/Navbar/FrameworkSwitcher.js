import { useSelector, useDispatch } from "react-redux";
import { useErrorHandler } from "react-error-boundary";

import { MenuItem, TextField } from "@mui/material";

import {
  selectActiveWorkAreaContext,
  selectActiveFrameworkId,
  setActiveFrameworkId,
} from "@user-context-slice";

import {
  useGetFrameworkByIdQuery,
} from "@api-slice";

const FrameworkSwitcher = () => {
  const dispatch = useDispatch();
  const errorHandler = useErrorHandler();

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const activeFrameworkId = useSelector(selectActiveFrameworkId);

  const { data: stateFramework, error: getStateFrameworkError } = 
    useGetFrameworkByIdQuery(activeWorkAreaContext.stateFrameworkId);
  if (getStateFrameworkError) errorHandler(getStateFrameworkError);

  const { data: instructionalFramework, error: getInstructionalFrameworkError } = 
    useGetFrameworkByIdQuery(activeWorkAreaContext.instructionalFrameworkId, 
        {skip: !activeWorkAreaContext.instructionalFrameworkId});
  if (getInstructionalFrameworkError) errorHandler(getInstructionalFrameworkError);

  const changeSelectedFramework = (e) => {
    const frameworkId = parseInt(e.target.value, 10);
    dispatch(setActiveFrameworkId(frameworkId));
  };

  if (!stateFramework || (activeWorkAreaContext.instructionalFrameworkId && !instructionalFramework)) {
    return (<></>);
  }

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
