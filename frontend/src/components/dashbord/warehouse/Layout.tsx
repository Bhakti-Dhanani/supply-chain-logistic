import React from 'react';
import WarehouseHeader from './Header';
import WarehouseSidebar from './Sidebar';
import { Box } from '@mui/material';

const WarehouseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <WarehouseSidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <WarehouseHeader />
        <Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default WarehouseLayout;
