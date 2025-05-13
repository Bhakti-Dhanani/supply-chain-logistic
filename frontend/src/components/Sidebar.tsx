import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Toolbar } from '@mui/material';
import { Dashboard, Inventory, LocalShipping, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Inventory', icon: <Inventory />, path: '/inventory' },
    { text: 'Shipments', icon: <LocalShipping />, path: '/shipments' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem component="li" key={item.text} onClick={() => navigate(item.path)} style={{ cursor: 'pointer' }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
