import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
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

const LocalLogin = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    loginUser({
        grant_type: 'password',
        userName: user.userName,
        password: 'password',
        client_id: 'ngSEAuthApp',
    }).then((response) => {
      const authenticatedUser = response.data.user;
      const workAreaContexts = response.data.workAreaContexts;
      const defaultWorkAreaContextId = response.data.defaultWorkAreaContextId;
      const defaultWorkArea = workAreaContexts.find(x => x.id === defaultWorkAreaContextId);
      dispatch(setCurrentUser({
        user: authenticatedUser,
        workAreaContexts: workAreaContexts,
      })).then(()=> {
        const defaultPath = getDefaultPathForWorkAreaContext(defaultWorkArea);
        navigate(defaultPath, true);
      });
    });
  };

  return (
    <>
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
    </>
  );
};

export default LocalLogin;
