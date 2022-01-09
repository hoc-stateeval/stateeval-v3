import {
  Box,
  Button,
  Link,
} from '@mui/material';
import logo from '../../../../../images/logo.jpg';

export const SidebarLogo = () => {
  return (
    <>
     <Box sx={{pl:2}}>
            <Button component={Link}
              disableRipple
              sx={{p:'0'}}
              to="/">
              <Box component="img"
                src={logo} alt="logo"/>
            </Button>
          </Box>
    </>
  );
}

