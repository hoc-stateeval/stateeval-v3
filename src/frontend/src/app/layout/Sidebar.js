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
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Scrollbar } from '../components/Scrollbar';
import SidebarSection from './SidebarSection';
import ChangeWorkAreaDialog from './ChangeWorkAreaDialog';
import SidebarProfile from './SidebarProfile';
import { EvaluationWorkAreas } from '../core/workAreas';

import logo from '../../images/logo.jpg';
import HomeIcon  from '@mui/icons-material/Home';
import { selectCurrentUser, selectActiveWorkAreaContext } from '../store/stateEval/userContextSlice';
import backgroundImg from '../../images/header-profile.png';

const navSections = [
  {
    title: 'Evaluation',
    workAreaTags: EvaluationWorkAreas,
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
      {
        title: 'TR_ME only',
        icon: <HomeIcon fontSize="small" />,
        path: '/app/evaluation/tr_me',
        workAreaTags: ['TR_ME'],
      },
      {
        title: 'PR_TR only',
        icon: <HomeIcon fontSize="small" />,
        path: '/app/evaluation/pr_tr',
        workAreaTags: ['PR_TR'],
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

  const result = navSections.reduce( (acc, nextSection) => {
    if (nextSection.workAreaTags.includes(workAreaTag)) {
      let section = {...nextSection};
      section.items = section.items.filter(x=>(!x.workAreaTags?x:x.workAreaTags.includes(workAreaTag)));
      acc.push(section);
    }
    return acc;
  }, []);

  return result;
}

const Sidebar = ({ onClose, open, sidebarWidth }) => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  const currentWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const styles = {
    profile: {
      color: '#dfe4ed',
      background: `url(${backgroundImg})`,
      // padding: '25px 5px 5px 25px',
      fontSize: '.688rem',
      paddingTop:'20px',
    },
    workArea: {
      color: '#8095a8',
      fontSize: '.688rem',
    },
  }

  const buildContent = () => (
    <>
      <Scrollbar
        // sx={{
        //   height: '100%',
        //   '& .simplebar-content': {
        //     height: '100%'
        //   }
        // }}
      >
        <Box sx={{pt:2}}>
          <Stack spacing={1}>
            <Box sx={{pl:2}}>
              <Button component={Link}
                disableRipple
                sx={{p:'0'}}
                to="/">
                <Box component="img"
                  src={logo} alt="logo"/>
              </Button>
            </Box>
            <Box sx={{...styles.profile}}>
              <Box sx={{pl:2, pb:2}}>
                <Avatar alt="profile image" src={currentUser?.profileImageURL} />
                <Typography sx={{fontSize:'.688rem', mt: 1, fontWeight: 600}} >{currentUser?.displayName}</Typography>
              </Box>           
            </Box>
            <Box
             sx={{
              pl:2,
              display: 'flex',
              flexDirection: 'column',
              alignItems:'left',
            }}>
              <SidebarProfile currentUser={currentUser} currentWorkAreaContext={currentWorkAreaContext} />
              <ChangeWorkAreaDialog />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                {getNavSectionsForWorkArea(currentWorkAreaContext.tagName).map((section) => (
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
          </Stack>
        </Box>
      </Scrollbar>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'primary.main',
            width: `${sidebarWidth}px`
          }
        }}
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
      PaperProps={{
        sx: {
          backgroundColor: 'primary.main',
          width: `${sidebarWidth}px`
        }
      }}
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