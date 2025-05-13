import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Menu, 
  MenuItem, 
  Avatar,
  Box,
  Badge,
  Divider,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  AccountCircle,
  Logout,
  Person,
  Settings,
  Warehouse,
  Notifications
} from '@mui/icons-material';
import { deepPurple } from '@mui/material/colors';

const WarehouseHeader: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notifications] = React.useState(3); // Mock notification count

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <AppBar 
      position="fixed"
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Warehouse sx={{ 
            fontSize: 32, 
            mr: 2,
            color: 'primary.main'
          }} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              letterSpacing: 1,
              display: { xs: 'none', sm: 'block' }
            }}
          >
            SUPPLY CHAIN LOGISTICS
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Badge badgeContent={notifications} color="error">
              <Notifications sx={{ color: 'action.active' }} />
            </Badge>
          </IconButton>

          <IconButton onClick={handleMenu} color="inherit" sx={{ p: 0.5 }}>
            <Avatar 
              sx={{ 
                bgcolor: deepPurple[500],
                width: 40, 
                height: 40,
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s'
                }
              }}
            >
              <AccountCircle sx={{ fontSize: 28 }} />
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                mt: 1.5,
                minWidth: 200,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default WarehouseHeader;