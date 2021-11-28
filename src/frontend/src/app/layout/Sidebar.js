import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Link,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Scrollbar } from '../components/scrollbar';
import SidebarSection from './SidebarSection';

import logo from '../../images/logo.jpg';
import HomeIcon  from '@mui/icons-material/Home';
import { selectCurrentUser, selectActiveWorkAreaContext } from '../store/stateEval/userContextSlice';

const navSections = [
  {
    title: 'Evaluation',
    workAreaTags: ['PR_TR'],
    items: [
      {
        title: 'Dashboard',
        icon: <HomeIcon fontSize="small" />,
        path: '/app/dashboard',
      },
      {
        title: 'Artifacts',
        icon: <HomeIcon fontSize="small" />,
        path: '/app/evaluation/artifacts',
      },
      // {
      //   title: 'YTD Evidence',
      //   icon: <HomeIcon fontSize="small" />,
      //   path: '/evaluation/ytd',
      // },
      // {
      //   title: 'Student Growth',
      //   icon: <HomeIcon fontSize="small" />,
      //   path: '/evaluation/sg',
      // },
      // {
      //   title: 'Observations',
      //   icon: <HomeIcon fontSize="small" />,
      //   path: '/evaluation/observations',
      // },
      // {
      //   title: 'Self-Assessments',
      //   icon: <HomeIcon fontSize="small" />,
      //   path: '/evaluation/self-assessments',
      // },
      // {
      //   title: 'Summative Evaluation',
      //   icon: <HomeIcon fontSize="small" />,
      //   path: '/evaluation/summative-eval',
      // },
      // {
      //   title: 'Setup',
      //   icon: <HomeIcon fontSize="small" />,
      //   path: '/evaluation/setup',
      //   children: [
      //     {
      //       title: 'Prompt Bank',
      //       path: '/evaluation/setup/prompt-bank',
      //     },
      //     {
      //       title: 'Settings',
      //       path: '/evaluation/setup/settings',
      //     },
      //     {
      //       title: 'Assignments',
      //       path: '/evaluation/setup/assignments',
      //     },
      //     {
      //       title: 'User Groups',
      //       path: '/evaluation/setup/user-groups',
      //     },
      //   ],
      // },
      // {
      //   title: 'Report Archives',
      //   icon: <HomeIcon fontSize="small" />,
      //   path: '/evaluation/report-archives',
      // },
      // {
      //   title: 'Resources',
      //   icon: <HomeIcon fontSize="small" />,
      //   path: '/evaluation/resources',
      // },
    ],
  },
  // {
  //   title: 'Training',
  //   workAreaTags: ['PR_TR', 'PR_PR', 'PR_ME', 'TR_ME', 'DTE', 'DE'],
  //   items: [
  //     {
  //       title: 'Dashboard',
  //       icon: <HomeIcon fontSize="small" />,
  //       path: '/training/dashboard',
  //     },
  //     {
  //       title: 'Videos',
  //       icon: <HomeIcon fontSize="small" />,
  //       children: [
  //         {
  //           title: 'BERC Videos',
  //           path: '/training/berc-videos',
  //         },
  //         {
  //           title: 'National Board Videos',
  //           path: '/training/national-board-videos',
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export const getNavSectionsForWorkArea = (workAreaTag) => {
  const result = navSections.filter(x=>x.workAreaTags.includes(workAreaTag));
  return result;
}

const buildContent = (location, currentWorkAreaContext, currentUser, workAreaTag) => (
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
        }}
      >
        <Box sx={{p:3}}>
          <Button component={Link}
            disableRipple
            to="/"
            sx={{padding:'0'}}>
            <Box component="img"
              src={logo} alt="logo"/>
          </Button>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box
         sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems:'center',
        }}>
          <Avatar alt="profile image" src={currentUser?.profileImageURL} />
          <Typography>{currentUser?.displayName}</Typography>
          <Typography>{currentWorkAreaContext.districtName}</Typography>
          {currentWorkAreaContext.schoolName ?
          (<Typography>{currentWorkAreaContext.schoolName}</Typography>) :(<></>)}
          <Typography>{currentWorkAreaContext.title}</Typography>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ flexGrow: 1 }}>
            {getNavSectionsForWorkArea(workAreaTag).map((section) => (
              <SidebarSection
                key={section.title}
                path={location.pathname}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2
                  }
                }}
                {...section} />
            ))}
        </Box>
      </Box>
    </Scrollbar>
  </>
);

const Sidebar = (props) => {
  const location = useLocation();

  const currentUser = useSelector(selectCurrentUser);
  const currentWorkAreaContext = useSelector(selectActiveWorkAreaContext);

  //const location = useLocation();
  const { sidebarWidth } = props;
  // const { onClose, open, sidebarWidth } = props;
 // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const workAreaTag = 'PR_TR';

  //if (lgUp) {
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
        {buildContent(location, currentWorkAreaContext, currentUser, workAreaTag)}
      </Drawer>
    );
  //}
  
  // return (
  //   <Drawer
  //     anchor="left"
  //     onClose={onClose}
  //     open={open}
  //     PaperProps={{
  //       sx: {
  //         backgroundColor: 'neutral.900',
  //         color: '#FFFFFF',
  //         width: `${sidebarWidth}px`
  //       }
  //     }}
  //     sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
  //     variant="temporary"
  //   >
  //     <Typography variant="h4">{buildContent(location, currentWorkAreaContext, currentUser, workAreaTag)}</Typography>
  //   </Drawer>
  // );
}

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};

export default Sidebar;