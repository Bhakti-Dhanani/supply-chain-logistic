import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Badge,
  Avatar,
  Tooltip,
  useTheme
} from '@mui/material';
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

const Header: React.FC<HeaderProps> = ({ onMenuClick, currentRoute }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const getRouteTitle = () => {
    if (currentRoute?.includes('assignments')) return 'Assignments';
    if (currentRoute?.includes('routes')) return 'Route Planning';
    if (currentRoute?.includes('history')) return 'Delivery History';
    return 'Dashboard';
  };

  return (
    <StyledAppBar
      position="fixed"
      sx={{
        left: { md: 280 }, // Sidebar width
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
            ml: 0, // Remove left margin since logo is gone
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
              onClick={() => navigate('/dashboards/transporter/notifications')}
              sx={{
                color: theme.palette.text.secondary,
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor: 'rgba(67, 97, 238, 0.1)',
                }
              }}
            >
              <StyledBadge badgeContent={4} color="error">
                <NotificationsIcon />
              </StyledBadge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Profile">
            <IconButton
              component={motion.div}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboards/transporter/profile')}
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
                alt="User Avatar"
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

export default Header;