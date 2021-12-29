import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { 
  Box, 
  Button,
  Card, 
  Container, 
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { submitLocalLogin } from '../app/store/stateEval/userContextSlice';

import { 
  useGetLocalLoginUsersForDistrictQuery,
  useGetLocalLoginDistrictsQuery,
 } from '../app/core/apiSlice';

const LocalLogin = () => {

  const [districtCode, setDistrictCode] = useState('');
  const [userId, setUserId] = useState('');

  const { 
    data: districts,
    isSuccess,
    isLoading,
    isError,
    error
  } = useGetLocalLoginDistrictsQuery();

  useEffect(() => {
    if (districts) {
      setDistrictCode(districts[0].districtCode);
    }
  }, [districts]);

  const { 
    data: users 
  } = useGetLocalLoginUsersForDistrictQuery(districtCode, {skip: districtCode===''});

  useEffect(() => {
    if (users) {
      setUserId(users[0].id);
    }
  }, [users]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeDistrict = (e) => {
    setDistrictCode(e.target.value);
  };

  const onChangeUser = (e) => {
    setUserId(parseInt(e.target.value, 10));
  };

  const onClickLogin = async (e) => {
    const user = users.find((x) => x.id === userId);
    dispatch(submitLocalLogin(user)).then(()=> {
      navigate("/app/dashboard", { replace: true });
    });
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: '60px',
              md: '120px'
            }
          }}
        >
          <Card
            elevation={16}
            sx={{ p: 4 }}
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h4">
                Log in
              </Typography>
            </Box>
            <Box sx={{mt: 3, mb:3}}>
              <TextField label="District" sx={{minWidth:'200px'}}
                select
                value={districtCode}
                onChange={onChangeDistrict}
              >
                {districts && districts.map((x) => (
                      <MenuItem key={x.districtCode} value={x.districtCode}>
                        {x.name}
                      </MenuItem>
                    ))}
              </TextField>
            </Box>
            <Box sx={{mt: 3, mb:3}}>
              <TextField label="User" sx={{minWidth:'200px'}}
                select
                value={userId}
                onChange={onChangeUser}
              >
               {users && users.map((x) => (
                    <MenuItem key={`${x.displayName} ${x.roleName}`} value={x.id}>
                      {x.displayName} ({x.roleName})
                    </MenuItem>
                  ))}
              </TextField>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                mt: 3
              }}
            >
            <Button
              variant="contained"
              color="secondary"
              onClick={onClickLogin}
            >
              Login
            </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default LocalLogin;
