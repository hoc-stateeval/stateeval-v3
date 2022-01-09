import { Link as RouterLink } from 'react-router-dom';
import { 
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getListItemButtonStyles, getListItemTextStyles } from '../../listItemStyles';


export const SidebarItemNested = (props) => {
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
        <ListItemText  primaryTypographyProps={{...listItemTextStyles, paddingLeft: '25px'}}  primary={title} />
      </ListItemButton>
    </ListItem>
  );
};

