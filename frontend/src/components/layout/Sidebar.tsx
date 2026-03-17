import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import logoBiblioteca from '../../assets/biblioteca-en-linea.png';
import {
  FaChartPie,
  FaChartBar,
  FaBook,
  FaUsers,
  FaUserEdit,
  FaFileAlt,
  FaHome,
} from 'react-icons/fa';

function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-top">
          <img src={logoBiblioteca} alt="Logo Biblioteca" className="sidebar-logo" />
          <div>
            <h4 className="mb-0">SistemaBibliotecaSM</h4>
            <small>Gestión bibliotecaria</small>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {user?.tipo === 'ADMIN' && (
          <>
            <NavLink to="/admin" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <span className="sidebar-link-content">
                <FaChartPie className="sidebar-icon" />
                <span>Dashboard</span>
              </span>
            </NavLink>

            <NavLink to="/admin/autores" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <span className="sidebar-link-content">
                <FaUserEdit className="sidebar-icon" />
                <span>Autores</span>
              </span>
            </NavLink>

            <NavLink to="/admin/libros" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <span className="sidebar-link-content">
                <FaBook className="sidebar-icon" />
                <span>Libros</span>
              </span>
            </NavLink>

            <NavLink to="/admin/usuarios" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <span className="sidebar-link-content">
                <FaUsers className="sidebar-icon" />
                <span>Usuarios</span>
              </span>
            </NavLink>

            <NavLink to="/admin/estadisticas" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <span className="sidebar-link-content">
                <FaChartBar className="sidebar-icon" />
                <span>Estadísticas</span>
              </span>
            </NavLink>
          </>
        )}

        {user?.tipo === 'EMPLEADO' && (
          <>
            <NavLink to="/empleado" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <span className="sidebar-link-content">
                <FaHome className="sidebar-icon" />
                <span>Inicio</span>
              </span>
            </NavLink>

            <NavLink to="/empleado/reporte" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <span className="sidebar-link-content">
                <FaFileAlt className="sidebar-icon" />
                <span>Reporte de autores</span>
              </span>
            </NavLink>
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <span>Biblioteca escolar</span>
      </div>
    </aside>
  );
}

export default Sidebar;