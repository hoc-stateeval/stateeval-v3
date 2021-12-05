import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { Scrollbar } from '../../components/Scrollbar';
import SidebarSection from './SidebarSection';
import SidebarProfile from './SidebarProfile';
import buildNavSectionsForWorkArea from './buildNavSectionsForWorkArea';
import { selectCurrentUser, selectActiveWorkAreaContext } from '../../store/stateEval/userContextSlice';
import SidebarLogo from './SidebarLogo';
import SidebarAvatar from './SidebarAvatar';
import SidebarEvaluatingDropdown from './SidebarEvaluatingDropdown';

const Sidebar = ({ onClose, open, sidebarWidth }) => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  const currentWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const navSections = buildNavSectionsForWorkArea(currentWorkAreaContext.tagName);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const buildContent = () => (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%'
          }
        }}
      >
        <Stack sx={{pt:2}} spacing={2}>
          <SidebarLogo/>
          <SidebarAvatar currentUser={currentUser} />
          <SidebarProfile currentUser={currentUser} currentWorkAreaContext={currentWorkAreaContext} />
          <SidebarEvaluatingDropdown currentWorkAreaContext={currentWorkAreaContext} />

          <Box sx={{ flexGrow: 1 }}>
              {navSections.map((section) => (
                <SidebarSection
                  key={section.title}
                  path={location.pathname}
                  {...section} />
              ))}
          </Box>
        </Stack>
      </Scrollbar>
    </>
  );

  const paperProps = {
      sx: {
        backgroundColor: 'neutral.900',
        width: `${sidebarWidth}px`
      }
  };

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={ paperProps }
        variant="permanent"
      >
        {buildContent()}
      </Drawer>
    );
  }
  
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={ paperProps}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {buildContent()}
    </Drawer>
  );
}

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};

export default Sidebar;