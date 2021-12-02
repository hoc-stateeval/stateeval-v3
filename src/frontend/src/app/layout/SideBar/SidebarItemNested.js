import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getListItemButtonStyles, getListItemTextStyles } from './listItemStyles';


const SidebarItemNested = (props) => {
  const theme = useTheme();
  const {
    active,
    path,
    title,
  } = props;

  const listItemButtonStyles = getListItemButtonStyles(active, theme);
  const listItemTextStyles = getListItemTextStyles(active, theme);

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
        sx={listItemButtonStyles}>
        <ListItemText  primaryTypographyProps={{...listItemTextStyles, paddingLeft: '20px'}}  primary={title} />
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
