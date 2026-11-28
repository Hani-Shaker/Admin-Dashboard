import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

export default function ProtectedRoute() {
  const { token, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="grid min-h-screen place-items-center"><Spinner /></div>;
  }
  if (!token || user?.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
