import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../store/stateEval/userContextSlice';

import { FrameworkSwitcher } from '../../shared-components';

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderBottomColor: theme.palette.divider,
  borderBottomStyle: 'solid',
  borderBottomWidth: 1,
  boxShadow: 'none'
}));

const Navbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const { onOpenSidebar, sidebarWidth, ...other } = props;

  const onClickLogout = async () => {
    await dispatch(logout());
    navigate("/localLogin", true);
  };

  return (
    <>
     <NavbarRoot
        sx={{
          left: {
            lg: `${sidebarWidth}px`
          },
          width: {
            lg: `calc(100% - ${sidebarWidth}px)`
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" sx={{alignItems: 'center'}} spacing={2}>
            <FrameworkSwitcher />
            <Button variant="outlined" 
              startIcon={<LogoutIcon />}
              onClick={onClickLogout}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </NavbarRoot>
    </>
  );
}

Navbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default Navbar;