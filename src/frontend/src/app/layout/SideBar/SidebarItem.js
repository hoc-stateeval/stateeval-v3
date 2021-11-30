import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon  from '@mui/icons-material/Home';
import PropTypes from 'prop-types';
import { 
  Box, 
  Button,
  Collapse, 
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import ExpandMoreIcon  from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Title } from '@mui/icons-material';


const SidebarItem = (props) => {
  const {
    active,
    children,
    chip,
    depth,
    icon,
    info,
    open: openProp,
    path,
    title,
    ...other
  } = props;
  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 24;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  // Branch
  if (children) {
    return (
      <ListItem
        disableGutters
        sx={{
          display: 'block',
          mb: 0.5,
          py: 0,
          px: 2
        }}
        {...other}>
        <Button
          endIcon={!open
            ? <ChevronRightIcon fontSize="small" />
            : <ExpandMoreIcon fontSize="small" />}
          disableRipple
          onClick={handleToggle}
          startIcon={icon}
          sx={{
            color: active ? 'secondary.main' : 'neutral.300',
            justifyContent: 'flex-start',
            pl: `${paddingLeft}px`,
            pr: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)'
            },
            '& .MuiButton-startIcon': {
              color: active ? 'secondary.main' : 'neutral.400'
            },
            '& .MuiButton-endIcon': {
              color: 'neutral.400'
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
          {info}
        </Button>
        <Collapse
          in={open}
          sx={{ mt: 0.5 }}
        >
          {children}
        </Collapse>
      </ListItem>
    );
  }

  const styles = {
    activeStyles: {
      borderLeft: '4px solid #19aa8d',
      backgroundColor: '#293846',
    }
  }
  // Leaf
  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0
      }}
    >
      <ListItemButton component={RouterLink} to={path}
      sx={{
        borderLeft: active ? '4px solid #19aa8d': '',
        backgroundColor: active ? '#293846': '#2f4050',
        color: '#8095a8',
        '&:hover': {
          color: '#FFF',
          textDecoration: 'none'
        }
      }}>
        <ListItemIcon sx={{minWidth:'25px'}}>
          <HomeIcon fontSize="small" style={{ color: '#FFF'}} />
        </ListItemIcon>
        <ListItemText  primaryTypographyProps={{fontSize: '.688rem'}}  primary={title} />
      </ListItemButton>
    </ListItem>
  );
};

SidebarItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  depth: PropTypes.number.isRequired,
  icon: PropTypes.node,
  info: PropTypes.node,
  open: PropTypes.bool,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};

SidebarItem.defaultProps = {
  active: false,
  open: false
};

export default SidebarItem;
