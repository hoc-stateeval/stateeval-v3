import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import { useDispatch } from 'react-redux';
import {
  Alert,
  Button,
  Card,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { setCurrentUser } from '../app/store/stateEval/userContextSlice';

import {
  useGetLocalLoginUsersForDistrictQuery,
  useGetLocalLoginDistrictsQuery,
  useLoginUserMutation,
 } from '../app/core/apiSlice';

import { 
  getDefaultPathForWorkAreaContext
 } from '../app/core/workAreas';

const ErrorFallback = ({error}) => {
  return (
    <Alert severity="error">
      Something went wrong:{error.message}
    </Alert>
  );
}

const LocalLogin = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleError = useErrorHandler()

  const [districtCode, setDistrictCode] = useState('');
  const [userId, setUserId] = useState('');

  const [loginUser] = useLoginUserMutation()

  const {
    data: districts,
  } = useGetLocalLoginDistrictsQuery();

  const {
    data: users,
  } = useGetLocalLoginUsersForDistrictQuery(districtCode, {skip: districtCode===''});

  useEffect(() => {
    if (districts) {
      setDistrictCode(districts[0].districtCode);
    }
  }, [districts]);

  useEffect(() => {
    if (users) {
      setUserId(users[0].id);
    }
  }, [users]);

  const onClickLogin = async (e) => {
    const user = users.find((x) => x.id === userId);
    const data = await loginUser({
      grant_type: 'password',
      userName: user.userName,
      password: 'password',
      client_id: 'ngSEAuthApp',
    }).unwrap();

    const authenticatedUser = data.user;
    const workAreaContexts = data.workAreaContexts;
    const defaultWorkAreaContextId = data.defaultWorkAreaContextId;
    const defaultWorkArea = workAreaContexts.find(x => x.id === defaultWorkAreaContextId);
    dispatch(setCurrentUser({
      user: authenticatedUser,
      workAreaContexts: workAreaContexts,
    })).then(()=> {
      const defaultPath = getDefaultPathForWorkAreaContext(defaultWorkArea);
      navigate(defaultPath);
    });

    // loginUser({
    //     grant_type: 'password',
    //     userName: user.userName,
    //     password: 'password',
    //     client_id: 'ngSEAuthApp',
    // }).then((response) => {
    //   const authenticatedUser = response.data.data.user;
    //   const workAreaContexts = response.data.data.workAreaContexts;
    //   const defaultWorkAreaContextId = response.data.data.defaultWorkAreaContextId;
    //   const defaultWorkArea = workAreaContexts.find(x => x.id === defaultWorkAreaContextId);
    //   dispatch(setCurrentUser({
    //     user: authenticatedUser,
    //     workAreaContexts: workAreaContexts,
    //   })).then(()=> {
    //     const defaultPath = getDefaultPathForWorkAreaContext(defaultWorkArea);
    //     navigate(defaultPath);
    //   }).catch((error)=> {
    //     throw new Error(error);
    //   })
    // });
  };

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh'}}
        >
          <Grid item xs={3}>
          <Card
                elevation={16}
                sx={{ p: 4,
                  minWidth: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignContent: 'center',
              }}
              >
                <Stack spacing={3}
                >
                  <Typography variant="h4" sx={{textAlign:'center'}}>
                    Log in
                  </Typography>
                  {(districts &&  users)?
                  (
                  <>
                  <TextField label="District" sx={{minWidth:'200px'}}
                    select
                    value={districtCode}
                    onChange={(e) => { setDistrictCode(e.target.value); }}
                  >
                    {districts.map((x) => (
                          <MenuItem key={x.districtCode} value={x.districtCode}>
                            {x.name}
                          </MenuItem>
                        ))}
                  </TextField>
                  <TextField label="User" sx={{minWidth:'200px'}}
                    select
                    value={userId}
                    onChange={(e) => { setUserId(parseInt(e.target.value, 10)); }}
                  >
                  {users.map((x) => (
                        <MenuItem key={`${x.displayName} ${x.roleName}`} value={x.id}>
                          {x.displayName} ({x.roleName})
                        </MenuItem>
                      ))}
                  </TextField>
                  </>)
                  : (
                    <div>Loading...</div>
                  )}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={onClickLogin}
                >
                  Login
                </Button>
                </Stack>
              </Card>
          </Grid>
        </Grid>
      </ErrorBoundary>
    </>
  );
};

export default LocalLogin;
