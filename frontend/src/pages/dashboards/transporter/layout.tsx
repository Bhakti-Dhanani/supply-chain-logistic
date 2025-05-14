import React from 'react';
import Header from '../../../components/dashbord/transporter/Header';
import Sidebar from '../../../components/dashbord/transporter/Sidebar';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface TransporterLayoutProps {
  children: React.ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#4361ee',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  transitions: {
    duration: {
      enteringScreen: 300,
      leavingScreen: 300,
    },
  },
});

const TransporterLayout: React.FC<TransporterLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        minHeight: '100vh', 
        backgroundColor: 'background.default',
        transition: 'all 0.3s ease',
      }}>
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'margin 0.3s ease',
        }}>
          <Header 
            onMenuClick={handleDrawerToggle} 
            currentRoute={location.pathname}
          />
          <Box 
            component={motion.main}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            sx={{ 
              flex: 1, 
              p: { xs: 2, md: 3 },
              marginTop: { xs: '56px', sm: '64px' },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TransporterLayout;