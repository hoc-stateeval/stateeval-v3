import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { 
  Box, 
  Button,
  Card, 
  Container, 
  FormControl,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import { submitLocalLogin } from '../app/store/stateEval/userContextSlice';


const LocalLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [districts, setDistricts] = useState([]);
  const [districtCode, setDistrictCode] = useState('');
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/local-login/districts');
      const data = await response.data;
      setDistricts(data);
      setDistrictCode(data[0].districtCode);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (districtCode) {
        const response = await axios.get('/api/local-login/users', { districtCode });
        const data = await response.data;
        setUsers(data);
        setUserId(data[0].id);
      }
    })();
  }, [districtCode]);

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
            <Box
              sx={{
                flexGrow: 1,
                mt: 3
              }}
            >
            <div className="mb-28">
              <FormControl className="" variant="filled">
                <Select
                  value={districtCode}
                  onChange={onChangeDistrict}
                  displayEmpty
                  name="district"
                  classes={{ select: 'py-8' }}
                >
                  {districts.map((x) => (
                    <MenuItem key={x.districtCode} value={x.districtCode}>
                      {x.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="mb-28">
              <FormControl className="" variant="filled">
                <Select
                  value={userId}
                  onChange={onChangeUser}
                  displayEmpty
                  name="user"
                  classes={{ select: 'py-8' }}
                >
                  {users.map((x) => (
                    <MenuItem key={x.id} value={x.id}>
                      {x.displayName} ({x.roleName})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Button
              variant="contained"
              color="primary"
              className="w-full mx-auto mt-16"
              aria-label="LOG IN"
              value="legacy"
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
