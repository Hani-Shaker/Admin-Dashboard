import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ComingSoon from './pages/ComingSoon';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ComingSoon title="Products" />} />
          <Route path="products/add" element={<ComingSoon title="Add Product" />} />
          <Route path="settings" element={<ComingSoon title="Settings" />} />
          <Route path="orders" element={<ComingSoon title="Orders" />} />
          <Route path="users" element={<ComingSoon title="Users" />} />
          <Route path="carts" element={<ComingSoon title="Carts" />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
