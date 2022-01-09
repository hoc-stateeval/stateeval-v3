import { Link as RouterLink } from 'react-router-dom';
import { 
  Icon,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getListItemButtonStyles, getListItemTextStyles } from '../../listItemStyles';

export const SidebarItem = (props) => {

  const theme = useTheme();
  const {
    active,
    icon,
    path,
    title,
  } = props;

const listItemButtonStyles = getListItemButtonStyles(active, theme);

const listItemIconStyles = { 
  marginLeft: active? '-4px': '0px', 
  color: active ? '#FFF' : `${theme.palette.neutral[400]}`,
};

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
        <ListItemIcon sx={{minWidth:'25px'}}>
          <Icon fontSize="small" style={listItemIconStyles} >
            {icon}
          </Icon>
        </ListItemIcon>
        <ListItemText  primaryTypographyProps={listItemTextStyles}  primary={title} />
      </ListItemButton>
    </ListItem>
  );
};



