import React from 'react';
import VendorHeader from '../../../components/dashbord/vendor/Header';
import VendorSidebar from '../../../components/dashbord/vendor/Sidebar';
import Box from '@mui/material/Box';

interface VendorLayoutProps {
  children: React.ReactNode;
}

const VendorLayout: React.FC<VendorLayoutProps> = ({ children }) => {
  // For mobile sidebar toggle, you can add state/logic as needed
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen((open) => !open);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
      <VendorSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <VendorHeader onMenuClick={handleDrawerToggle} />
        <Box component="main" sx={{ flex: 1, p: 3, mt: { xs: 7, md: 8 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default VendorLayout;
