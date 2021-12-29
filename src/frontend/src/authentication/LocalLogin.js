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

import { submitLocalLogin } from '../app/store/stateEval/userContextSlice';

import {
  useGetLocalLoginUsersForDistrictQuery,
  useGetLocalLoginDistrictsQuery,
 } from '../app/core/apiSlice';

const LocalLogin = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [districtCode, setDistrictCode] = useState('');
  const [userId, setUserId] = useState('');

  const {
    data: districts,
  } = useGetLocalLoginDistrictsQuery();

  const {
    data: users
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
    dispatch(submitLocalLogin(user)).then(()=> {
      navigate("/app/dashboard", { replace: true });
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
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
      <Card
            elevation={16}
            sx={{ p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignContent: 'center',
           }}
          >
            <Stack spacing={3}
            >
              <Typography variant="h4">
                Log in
              </Typography>
              <TextField label="District" sx={{minWidth:'200px'}}
                select
                value={districtCode}
                onChange={(e) => { setDistrictCode(e.target.value); }}
              >
                {districts && districts.map((x) => (
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
               {users && users.map((x) => (
                    <MenuItem key={`${x.displayName} ${x.roleName}`} value={x.id}>
                      {x.displayName} ({x.roleName})
                    </MenuItem>
                  ))}
              </TextField>
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
