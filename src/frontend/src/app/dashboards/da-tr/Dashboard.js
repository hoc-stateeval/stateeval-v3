import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useErrorHandler } from 'react-error-boundary';
import {
  Typography,
} from '@mui/material';

import {
  setPageTitle,
} from '../../store/stateEval/userContextSlice';

import {
  selectActiveWorkAreaContext,
} from '../../store/stateEval/userContextSlice';

import {
  useGetSchoolsInDistrictQuery,
 } from '../../core/apiSlice';

const Dashboard = () => {

  const dispatch = useDispatch();
  const pageTitle = "DA TR Dashboard";

  const workAreaContext = useSelector(selectActiveWorkAreaContext);

  const { data: schools, error } = useGetSchoolsInDistrictQuery('10000');
  useErrorHandler(error);
 
  useEffect(()=> {
    dispatch(setPageTitle(pageTitle));
   // throw Error("something happened");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h2">{pageTitle}</Typography>
    </>
  );
};

export default Dashboard;