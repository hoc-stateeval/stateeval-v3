import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';

const SidebarItemNested = (props) => {
  const {
    active,
    path,
    title,
  } = props;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        // pl:4,
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
        <ListItemText  primaryTypographyProps={{fontSize: '.813rem', paddingLeft: '20px', fontWeight: 600, color: active ? '#FFF': '#8095a8'}}  primary={title} />
      </ListItemButton>
    </ListItem>
  );
};

SidebarItemNested.propTypes = {
  active: PropTypes.bool,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};

SidebarItemNested.defaultProps = {
  active: false,
};

export default SidebarItemNested;
