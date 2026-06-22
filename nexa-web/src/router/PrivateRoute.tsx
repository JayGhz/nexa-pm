import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { Rol } from '../types';

interface PrivateRouteProps {
  allowedRoles?: Rol[];
}

export default function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const { token, usuario } = useAuthStore();

  if (!token || !usuario) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(usuario.rol)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
