import React from 'react';
import VendorLayout from './layout';

const VendorDashboard: React.FC = () => {
  return (
    <VendorLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
        <p>Welcome to the Vendor Dashboard. Here you can manage your products, view orders, and track shipments.</p>
      </div>
    </VendorLayout>
  );
};

export default VendorDashboard;