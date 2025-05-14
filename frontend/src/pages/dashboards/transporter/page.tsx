import React from 'react';
import TransporterLayout from './layout';

const TransporterDashboard: React.FC = () => {
  return (
    <TransporterLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Transporter Dashboard</h1>
        <p>Welcome to the Transporter Dashboard. Here you can manage delivery routes, track shipments, and update delivery statuses.</p>
      </div>
    </TransporterLayout>
  );
};

export default TransporterDashboard;