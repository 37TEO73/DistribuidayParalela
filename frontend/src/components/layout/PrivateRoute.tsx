import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import type { RolUsuario } from '../../types/Auth';

interface PrivateRouteProps {
  allowedRoles: RolUsuario[];
}

function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.tipo)) {
    return <Navigate to="/no-autorizado" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;