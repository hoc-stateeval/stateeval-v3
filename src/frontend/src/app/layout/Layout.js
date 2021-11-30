import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from "@mui/material";
import Sidebar from './SideBar/Sidebar';
import Navbar from './Navbar';

const sidebarWidth = 220;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  backgroundColor: theme.palette.background.default,
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: `${sidebarWidth}px`
  }
}));

const Layout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <LayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <Box  sx={{
            height:'80px', 
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            backgroundColor:'#FFF'}}>

            <Container maxWidth="md">
              <Typography variant="h2">Page Title</Typography>
            </Container>
          </Box>

          <Box sx={{mt:3}}>
            <Container maxWidth="md">
              {children}
            </Container>
          </Box>
        </Box>
      </LayoutRoot>
      <Navbar sidebarWidth={sidebarWidth} onOpenSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar sidebarWidth={sidebarWidth}
        onClose={() => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;