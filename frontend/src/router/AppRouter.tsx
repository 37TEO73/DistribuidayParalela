import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/layout/PrivateRoute';
import AppLayout from '../components/layout/AppLayout';
import LoginPage from '../pages/auth/LoginPage';
import AdminHomePage from '../pages/admin/AdminHomePage';
import AutorListPage from '../pages/admin/autores/AutorListPage';
import LibroListPage from '../pages/admin/libros/LibroListPage';
import UsuarioListPage from '../pages/admin/usuarios/UsuarioListPage';
import EmpleadoHomePage from '../pages/empleado/EmpleadoHomePage';
import ReporteAutorPage from '../pages/empleado/ReporteAutorPage';
import NoAutorizadoPage from '../pages/NoAutorizadoPage';
import EstadisticasPage from '../pages/admin/estadisticas/EstadisticasPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/no-autorizado" element={<NoAutorizadoPage />} />

        <Route element={<PrivateRoute allowedRoles={['ADMIN']} />}>
          <Route element={<AppLayout />}>
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/admin/autores" element={<AutorListPage />} />
            <Route path="/admin/libros" element={<LibroListPage />} />
            <Route path="/admin/usuarios" element={<UsuarioListPage />} />
            <Route path="/admin/estadisticas" element={<EstadisticasPage />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles={['EMPLEADO', 'ADMIN']} />}>
          <Route element={<AppLayout />}>
            <Route path="/empleado" element={<EmpleadoHomePage />} />
            <Route path="/empleado/reporte" element={<ReporteAutorPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;