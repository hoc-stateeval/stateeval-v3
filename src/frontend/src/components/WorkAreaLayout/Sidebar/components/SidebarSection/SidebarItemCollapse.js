import { useState } from 'react';
import {
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
        "& .MuiListItemButton-root": { paddingTop:.5, paddingBottom:.5 },
        py: 0,
      }}>
        <ListItemButton onClick={handleToggle}
        sx={{
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
      <Collapse
        in={open}
        sx={{ mt: 0.5 }}
      >
        {props.children}
      </Collapse>
    </ListItem>
  );
};

export default SidebarItemCollapse;
