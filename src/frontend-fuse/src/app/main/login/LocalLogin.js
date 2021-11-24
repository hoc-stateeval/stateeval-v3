import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { styled, darken } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { submitLocalLogin } from 'app/auth/store/loginSlice';

const Root = styled('div')(({ theme }) => ({
  '& .login-leftSection': {},

  '& .login-rightSection': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function LocalLogin() {
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

  const onClickLogin = (e) => {
    const user = users.find((x) => x.id === userId);
    dispatch(submitLocalLogin(user));
  };

  return (
    <Root className="flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
      >
        <Card
          className="login-leftSection flex flex-col w-full max-w-sm items-center justify-center shadow-0"
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center mb-48">
                <img className="logo-icon w-48" src="assets/images/logos/fuse.svg" alt="logo" />
                <div className="border-l-1 mr-4 w-1 h-40" />
                <div>
                  <Typography className="text-24 font-semibold logo-text" color="inherit">
                    FUSE
                  </Typography>
                  <Typography
                    className="text-16 tracking-widest -mt-8 font-700"
                    color="textSecondary"
                  >
                    REACT
                  </Typography>
                </div>
              </div>
            </motion.div>
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
                      {x.displayName}
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
          </CardContent>
        </Card>

        <div className="login-rightSection flex hidden md:flex flex-1 items-center justify-center p-64">
          <div className="max-w-320">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <Typography
                color="inherit"
                className="text-32 sm:text-44 font-semibold leading-tight"
              >
                Welcome <br />
                to the <br /> FUSE React!
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <Typography variant="subtitle1" color="inherit" className="mt-32 font-medium">
                Powerful and professional admin template for Web Applications, CRM, CMS, Admin
                Panels and more.
              </Typography>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Root>
  );
}

export default LocalLogin;
