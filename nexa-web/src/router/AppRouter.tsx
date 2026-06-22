import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/LoginPage';
import AppLayout from '../components/layout/AppLayout';
import DashboardPage from '../pages/DashboardPage';
import ProyectosPage from '../pages/ProyectosPage';

import ProyectoDetailPage from '../pages/ProyectoDetailPage';
import ClientesPage from '../pages/ClientesPage';
import ClienteDetailPage from '../pages/ClienteDetailPage';
import ConsultoresPage from '../pages/ConsultoresPage';
import PerfilPage from '../pages/PerfilPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/proyectos" element={<ProyectosPage />} />
            <Route path="/proyectos/nuevo" element={<ProyectoDetailPage />} />
            <Route path="/proyectos/:id" element={<ProyectoDetailPage />} />
            <Route path="/proyectos/:id/editar" element={<ProyectoDetailPage />} />
            
            {/* Rutas solo para ADMIN */}
            <Route element={<PrivateRoute allowedRoles={['ADMIN']} />}>
              <Route path="/clientes" element={<ClientesPage />} />
              <Route path="/clientes/:id" element={<ClienteDetailPage />} />
              <Route path="/consultores" element={<ConsultoresPage />} />
            </Route>
          </Route>
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
