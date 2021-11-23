import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from "@mui/material";
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const sidebarWidth = 240;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: `${sidebarWidth}px`
  }
}));

function Layout(props) {
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
          <Box sx={{
              backgroundColor:'white',
              height:'100px',
            }}>
              <Container maxWidth="md">
                <Typography variant="h2">Page Title</Typography>
              </Container>
            </Box>
          {children}
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