import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  Icon,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';

const SidebarItem = (props) => {
  const {
    active,
    icon,
    path,
    title,
  } = props;

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
          <Icon fontSize="small" style={{ marginLeft: active? '-4px': '0px', color: active ? '#FFF' : '#8095a8'}} >
            {icon}
          </Icon>
        </ListItemIcon>
        <ListItemText  primaryTypographyProps={{fontSize: '.813rem', marginLeft: active? '-4px': '0px', fontWeight: 600, color: active ? '#FFF': '#8095a8'}}  primary={title} />
      </ListItemButton>
    </ListItem>
  );
};

SidebarItem.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};

SidebarItem.defaultProps = {
  active: false,
};

export default SidebarItem;
