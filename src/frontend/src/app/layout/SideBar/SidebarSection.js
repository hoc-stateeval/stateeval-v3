import PropTypes from 'prop-types';
import { List, ListSubheader } from '@mui/material';
import SidebarItem from './SidebarItem';

const renderNavItems = ({ depth = 0, items, path }) => (
  <List disablePadding>
    {items.reduce((acc, item) => reduceChildRoutes({
      acc,
      item,
      depth,
      path
    }), [])}
  </List>
);

const reduceChildRoutes = ({ acc, item, depth, path }) => {
  const key = `${item.title}-${depth}`;
  const partialMatch = true; // path.includes(item.path);
  const exactMatch = path === item.path;

  if (item.children) {
    acc.push(
      <SidebarItem
        active={partialMatch}
        chip={item.chip}
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={partialMatch}
        path={item.path}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          items: item.children,
          path
        })}
      </SidebarItem>
    );
  } else {
    acc.push(
      <SidebarItem
        active={exactMatch}
        chip={item.chip}
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        path={item.path}
        title={item.title}
      />
    );
  }

  return acc;
};

const SidebarSection = (props) => {
  const { items, path, title} = props;

  const navItems = renderNavItems({ items, path });
  return (
    <List
    
      // subheader={(
      //   <ListSubheader
      //     disableGutters
      //     disableSticky
      //     sx={{
      //       color: 'neutral.500',
      //       fontSize: '0.75rem',
      //       fontWeight: 700,
      //       lineHeight: 2.5,
      //       ml: 4,
      //       textTransform: 'uppercase'
      //     }}
      //   >
      //     {title}
      //   </ListSubheader>
      // )}
      >
      {navItems}
    </List>
  );
};

SidebarSection.propTypes = {
  items: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default SidebarSection;
