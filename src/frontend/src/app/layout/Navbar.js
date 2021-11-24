import { useRef, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar
} from '@mui/material';
import { styled } from '@mui/material/styles';

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderBottomColor: theme.palette.divider,
  borderBottomStyle: 'solid',
  borderBottomWidth: 1,
  boxShadow: 'none'
}));


function Navbar(props) {
  const { onOpenSidebar, sidebarWidth, ...other } = props;

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
        </Toolbar>
      </NavbarRoot>
    </>
  );
}

Navbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default Navbar;