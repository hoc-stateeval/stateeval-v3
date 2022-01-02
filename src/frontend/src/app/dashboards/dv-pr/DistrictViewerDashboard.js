import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Typography,
} from '@mui/material';

import {
  setPageTitle,
} from '../../store/stateEval/userContextSlice';

const DistrictAdminDashboard = () => {
  const dispatch = useDispatch();
  const pageTitle = "DA Dashboard";

  useEffect(()=> {
    dispatch(setPageTitle(pageTitle));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h2">{pageTitle}</Typography>
    </>
  );
};

export default DistrictAdminDashboard;