import {
  Box,
  Button,
  Link,
} from '@mui/material';
import logo from '@images/logo.jpg';

const SidebarLogo = () => {
  return (
    <>
     <Box sx={{pl:2}}>
            <Button component={Link}
              variant="text"
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

export default SidebarLogo;

