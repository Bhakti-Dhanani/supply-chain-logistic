import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Avatar, Tooltip, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledAppBar = styled(AppBar)({
  backdropFilter: 'blur(8px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 3,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

interface HeaderProps {
  onMenuClick: () => void;
  currentRoute?: string;
}

const VendorHeader: React.FC<HeaderProps> = ({ onMenuClick, currentRoute }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const getRouteTitle = () => {
    if (currentRoute?.includes('orders')) return 'My Orders';
    if (currentRoute?.includes('shipments')) return 'Shipments';
    if (currentRoute?.includes('profile')) return 'Profile';
    return 'Vendor Dashboard';
  };

  return (
    <StyledAppBar
      position="fixed"
      sx={{
        left: { md: 280 },
        width: { md: 'calc(100% - 280px)' },
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 3 } }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ 
            mr: 2, 
            display: { md: 'none' },
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: 'rgba(67, 97, 238, 0.1)',
            }
          }}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="subtitle1"
          sx={{
            ml: 0,
            fontWeight: 600,
            color: theme.palette.text.secondary,
          }}
        >
          {getRouteTitle()}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          '& > *': {
            transition: 'transform 0.2s ease, background-color 0.2s ease',
          }
        }}>
          <Tooltip title="Notifications">
            <IconButton 
              component={motion.div}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboards/vendor/notifications')}
              sx={{
                color: theme.palette.text.secondary,
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor: 'rgba(67, 97, 238, 0.1)',
                }
              }}
            >
              <StyledBadge badgeContent={2} color="error">
                <NotificationsIcon />
              </StyledBadge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Profile">
            <IconButton
              component={motion.div}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboards/vendor/profile')}
              sx={{
                p: 0,
                '&:hover': {
                  '& .MuiAvatar-root': {
                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                  }
                }
              }}
            >
              <Avatar 
                alt="Vendor Avatar"
                src="/static/images/avatar.jpg"
                sx={{ 
                  width: 36, 
                  height: 36,
                  transition: 'all 0.3s ease',
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default VendorHeader;
