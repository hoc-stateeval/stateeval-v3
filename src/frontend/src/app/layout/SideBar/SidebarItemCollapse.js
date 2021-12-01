import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Collapse,
  Icon,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon  from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const SidebarItemCollapse = (props) => {
  const {
    active,
    icon,
    open: openProp,
    title,
  } = props;
  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'block',
        mb: 0.5,
        py: 0,
        // px: 2
      }}>
        <ListItemButton onClick={handleToggle}
        sx={{
          // borderLeft: active ? '4px solid #19aa8d': '',
          backgroundColor: active ? '#293846': '#2f4050',
          color: '#8095a8',
          '&:hover': {
            color: '#FFF',
            textDecoration: 'none'
          }
        }}>
        <ListItemIcon sx={{minWidth:'25px'}}>
          <Icon fontSize="small" style={{ color: active ? '#FFF' : '#8095a8'}} >
            {icon}
          </Icon>
        </ListItemIcon>
        <ListItemText  primaryTypographyProps={{fontSize: '.813rem', fontWeight: 600, color: active ? '#FFF': '#8095a8'}}  primary={title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      {/* <Button
        // endIcon={!open
        //   ? <ChevronRightIcon fontSize="small" />
        //   : <ExpandMoreIcon fontSize="small" />}
        disableRipple
        onClick={handleToggle}
        startIcon={icon}
        sx={{
          color: active ? '#FFF' : '#8095a8',
          justifyContent: 'flex-start',
          // pl: `${paddingLeft}px`,
          pr: 3,
          textAlign: 'left',
          textTransform: 'none',
          width: '100%',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255, 0.08)'
          },
          '& .MuiButton-startIcon': {
            color: active ? '#FFF' : '#8095a8'
          },
          '& .MuiButton-endIcon': {
            color: 'neutral.400'
          }
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {title}
        </Box>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button> */}
      <Collapse
        in={open}
        sx={{ mt: 0.5 }}
      >
        {props.children}
      </Collapse>
    </ListItem>
  );
};

SidebarItemCollapse.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  icon: PropTypes.node,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired
};

SidebarItemCollapse.defaultProps = {
  active: false,
  open: false
};

export default SidebarItemCollapse;
