import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Typography,
} from '@mui/material';

import {
  setPageTitle,
} from '../../../store/stateEval/userContextSlice';

const DistrictViewerDashboard = () => {
  const dispatch = useDispatch();
  const pageTitle = "DV Dashboard";

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

export default DistrictViewerDashboard;