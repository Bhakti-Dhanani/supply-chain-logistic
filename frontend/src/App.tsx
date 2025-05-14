import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SelectRole from './pages/SelectRole';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/dashboards/admin/page';
import VendorDashboard from './pages/dashboards/vendor/page';
import WarehouseDashboard from './pages/dashboards/warehouse/page';
import TransporterDashboard from './pages/dashboards/transporter/page';
import InventoryPage from './pages/dashboards/warehouse/inventory/page';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<SelectRole />} />
        <Route path="/register/details" element={<Register />} />
        <Route path="/dashboards/admin" element={<AdminDashboard />} />
        <Route path="/dashboards/vendor" element={<VendorDashboard />} />
        <Route path="/dashboards/warehouse" element={<WarehouseDashboard />} />
        <Route path="/dashboards/transporter" element={<TransporterDashboard />} />
        <Route path="/dashboards/warehouse/inventory" element={<InventoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
