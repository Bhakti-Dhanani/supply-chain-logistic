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
  LocalShipping as LocalShippingIcon,
  Assignment as AssignmentsIcon,
  AltRoute as RoutesIcon,
  History as HistoryIcon,
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

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
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
}));

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  const menuItems = [
    { path: '/dashboards/transporter', icon: <LocalShippingIcon />, text: 'Dashboard' },
    { path: 'assignments', icon: <AssignmentsIcon />, text: 'Assignments' },
    { path: 'routes', icon: <RoutesIcon />, text: 'Route Planning' },
    { path: 'history', icon: <HistoryIcon />, text: 'Delivery History' },
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
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer',
              p: 1,
              borderRadius: 1,
            }}
          >
            <LocalShippingIcon 
              color="primary" 
              sx={{ 
                fontSize: '2rem',
                mr: 1,
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, #3a0ca3 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              LogisticsPro
            </Typography>
          </Box>
        </Toolbar>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%',
          px: 1.5,
        }}>
          <List sx={{ py: 1 }}>
            {menuItems.map((item) => (
              <StyledListItem
                key={item.text}
                // @ts-expect-error: styled ListItemButton with Link
                component={Link}
                to={item.path}
                selected={isActive(item.path)}
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
              </StyledListItem>
            ))}
          </List>
          
          <Divider sx={{ 
            my: 1, 
            borderColor: 'rgba(0, 0, 0, 0.05)',
          }} />
          
          <List sx={{ py: 1 }}>
            {secondaryItems.map((item) => (
              <StyledListItem
                key={item.text}
                // @ts-expect-error: styled ListItemButton with Link
                component={Link}
                to={`/dashboards/transporter/${item.path}`}
                selected={isActive(item.path)}
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
              </StyledListItem>
            ))}
          </List>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ pb: 2 }}>
            <StyledListItem
              sx={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
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
            </StyledListItem>
          </Box>
        </Box>
      </StyledDrawer>
    </Box>
  );
};

export default Sidebar;