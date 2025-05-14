import React from 'react';
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
  Typography,
  ListItemButton
} from '@mui/material';
import {
  Assignment as OrdersIcon,
  LocalShipping as ShipmentsIcon,
  Notifications as NotificationsIcon,
  AccountCircle as ProfileIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const drawerWidth = 280;

const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    background: 'linear-gradient(195deg, #f8fafc 0%, #f1f5f9 100%)',
    borderRight: 'none',
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
});

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const VendorSidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  const menuItems = [
    { path: '/dashboards/vendor', icon: <OrdersIcon />, text: 'My Orders' },
    { path: 'shipments', icon: <ShipmentsIcon />, text: 'Shipments' },
  ];

  const secondaryItems = [
    { path: 'notifications', icon: <NotificationsIcon />, text: 'Notifications' },
    { path: 'profile', icon: <ProfileIcon />, text: 'My Profile' },
  ];

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <StyledDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '64px !important',
          px: 2,
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, #3a0ca3 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Vendor Portal
          </Typography>
        </Toolbar>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%',
          px: 1.5,
        }}>
          <List sx={{ py: 1 }}>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                component={Link}
                to={item.path}
                selected={isActive(item.path)}
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  margin: theme.spacing(0, 1.5),
                  padding: theme.spacing(1, 2),
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    transform: 'translateX(4px)',
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.main,
                    },
                    '& .MuiListItemText-primary': {
                      color: theme.palette.primary.main,
                    },
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(67, 97, 238, 0.15) !important',
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.main,
                    },
                    '& .MuiListItemText-primary': {
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {React.cloneElement(item.icon, { 
                    color: isActive(item.path) ? 'primary' : 'inherit' 
                  })}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: isActive(item.path) ? 600 : 400,
                  }} 
                />
              </ListItemButton>
            ))}
          </List>
          <Divider sx={{ my: 1, borderColor: 'rgba(0, 0, 0, 0.05)' }} />
          <List sx={{ py: 1 }}>
            {secondaryItems.map((item) => (
              <ListItemButton
                key={item.text}
                component={Link}
                to={`/dashboards/vendor/${item.path}`}
                selected={isActive(item.path)}
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  margin: theme.spacing(0, 1.5),
                  padding: theme.spacing(1, 2),
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    transform: 'translateX(4px)',
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.main,
                    },
                    '& .MuiListItemText-primary': {
                      color: theme.palette.primary.main,
                    },
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(67, 97, 238, 0.15) !important',
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.main,
                    },
                    '& .MuiListItemText-primary': {
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {React.cloneElement(item.icon, { 
                    color: isActive(item.path) ? 'primary' : 'inherit' 
                  })}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: isActive(item.path) ? 600 : 400,
                  }} 
                />
              </ListItemButton>
            ))}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ pb: 2 }}>
            <ListItemButton
              sx={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderRadius: theme.shape.borderRadius,
                margin: theme.spacing(0, 1.5),
                padding: theme.spacing(1, 2),
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  '& .MuiListItemIcon-root': {
                    color: 'error.main',
                  },
                  '& .MuiListItemText-primary': {
                    color: 'error.main',
                  },
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText 
                primary="Logout" 
                primaryTypographyProps={{ 
                  color: 'error',
                  fontWeight: 500,
                }} 
              />
            </ListItemButton>
          </Box>
        </Box>
      </StyledDrawer>
    </Box>
  );
};

export default VendorSidebar;
