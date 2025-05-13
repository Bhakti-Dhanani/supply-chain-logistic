import React from 'react';
import WarehouseLayout from '../Layout';

const InventoryPage: React.FC = () => {
  return (
    <WarehouseLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <p>Manage your inventory levels, track stock, and update product details here.</p>
      </div>
    </WarehouseLayout>
  );
};

export default InventoryPage;
