import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Drawer,
  Link,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Scrollbar } from '../components/scrollbar';

import logo from '../../images/logo.jpg';

const content = (
  <>
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding:'5px'
        }}
      >
        <Box>
          <Button component={Link}
            disableRipple
            to="/"
            sx={{padding:'0'}}>
            <Box component="img"
              src={logo} alt="logo"/>
          </Button>
        </Box>
      </Box>

    </Scrollbar>
  </>
);

function Sidebar(props) {

  const { onClose, open, sidebarWidth } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: 0,
            color: '#FFFFFF',
            width: `${sidebarWidth}px`
          }
        }}
        variant="permanent"
      >
        <Typography variant="h4">{content}</Typography>
      </Drawer>
    );
  }
  
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: `${sidebarWidth}px`
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      <Typography variant="h4">{content}</Typography>
    </Drawer>
  );
}

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};

export default Sidebar;