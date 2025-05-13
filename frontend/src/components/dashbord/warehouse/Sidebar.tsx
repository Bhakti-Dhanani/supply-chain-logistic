import React, { useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Drawer, 
  Toolbar, 
  Divider,
  Box,
  Typography,
  useTheme,
  styled,
  IconButton
} from '@mui/material';
import { 
  Dashboard, 
  Inventory, 
  LocalShipping, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Warehouse
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: 240,
    backgroundColor: theme.palette.background.default,
    borderRight: 'none',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const WarehouseSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard/warehouse' },
    { text: 'Inventory', icon: <Inventory />, path: '/dashboards/warehouse/inventory' },
    { text: 'Shipments', icon: <LocalShipping />, path: '/warehouse/shipments' },
    { text: 'Settings', icon: <Settings />, path: '/warehouse/settings' },
  ];

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <StyledDrawer variant="permanent" open={open}>
      <Toolbar>
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Warehouse sx={{ 
              color: theme.palette.primary.main, 
              mr: 1, 
              fontSize: 28 
            }} />
            {open && (
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Warehouse
              </Typography>
            )}
          </Box>
          <IconButton onClick={toggleDrawer} size="small">
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ pt: 0 }}>
        {menuItems.map((item) => (
          <ListItem 
            component="li"
            key={item.text} 
            disablePadding
            sx={{
              mb: 0.5,
              backgroundColor: location.pathname === item.path ? theme.palette.action.selected : 'inherit',
              '&:hover': {
                backgroundColor: location.pathname === item.path ? theme.palette.action.selected : theme.palette.action.hover,
              }
            }}
          >
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                py: 1.5,
                px: 3,
                borderRadius: 1,
                mx: 1,
              }}
            >
              <ListItemIcon sx={{ minWidth: '40px', color: 'inherit' }}>
                {React.cloneElement(item.icon, {
                  color: location.pathname === item.path ? 
                    'primary' : 'inherit'
                })}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 
                    'medium' : 'normal'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 'auto' }} />
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Supply Chain v1.0
        </Typography>
      </Box>
    </StyledDrawer>
  );
};

export default WarehouseSidebar;