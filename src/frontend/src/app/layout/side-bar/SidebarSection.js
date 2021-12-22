import PropTypes from 'prop-types';
import { List, ListSubheader } from '@mui/material';
import SidebarItem from './SidebarItem';
import SidebarItemCollapse from './SidebarItemCollapse';
import SidebarItemNested from './SidebarItemNested';

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
  const activeChild = path.includes(item.path);
  const activeItem = path === item.path;

  if (item.children) {
    acc.push(
      <SidebarItemCollapse
        active={activeChild}
        key={key}
        icon={item.icon}
        open={activeChild}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          items: item.children,
          path
        })}
      </SidebarItemCollapse>
    );
  }
  else if (depth===0) {
    acc.push(
      <SidebarItem
        active={activeItem||activeChild}
        icon={item.icon}
        key={key}
        path={item.path}
        title={item.title}
      />
    );
  }
  else {
    acc.push(
      <SidebarItemNested
        active={activeItem}
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
      subheader={(
        <ListSubheader variant="sideBar"
          disableGutters
          disableSticky
          sx={{
            color: 'secondary.main',
            fontSize: '0.75rem',
            fontWeight: 700,
            lineHeight: 2.5,
            pl: 2,
            textTransform: 'uppercase'
          }}
        >
          {title}
        </ListSubheader>
      )}
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
