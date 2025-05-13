import React from 'react';
import WarehouseLayout from './Layout';

const WarehouseDashboard: React.FC = () => {
  return (
    <WarehouseLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Warehouse Dashboard</h1>
        <p>Welcome to the Warehouse Dashboard. Here you can manage stock levels, process incoming shipments, and organize inventory.</p>
      </div>
    </WarehouseLayout>
  );
};

export default WarehouseDashboard;