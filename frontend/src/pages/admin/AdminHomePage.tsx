import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { autorApi } from '../../api/autorApi';
import { libroApi } from '../../api/libroApi';
import { usuarioApi } from '../../api/usuarioApi';
import { FaUsers, FaBook, FaUserShield, FaArrowRight, FaSyncAlt, FaChartBar } from 'react-icons/fa';
type DashboardMetrics = {
  totalAutores: number;
  totalLibros: number;
  totalUsuarios: number;
};

function AdminHomePage() {
  const { user } = useAuth();

  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalAutores: 0,
    totalLibros: 0,
    totalUsuarios: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cargarMetricas = async () => {
    setLoading(true);
    setError('');

    try {
      const [autores, libros, usuarios] = await Promise.all([
        autorApi.listarTodos(),
        libroApi.listarTodos(),
        usuarioApi.listarTodos(),
      ]);

      setMetrics({
        totalAutores: autores.length,
        totalLibros: libros.length,
        totalUsuarios: usuarios.length,
      });
    } catch (err) {
      console.error(err);
      setError('No fue posible cargar las métricas del dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void cargarMetricas();
  }, []);

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-start flex-wrap gap-3">
        <div>
          <h2 className="page-title">Dashboard de administrador</h2>
          <p className="page-subtitle">
            Gestiona autores, libros y usuarios del sistema.
          </p>
        </div>

        <button className="btn btn-outline-primary dashboard-refresh-btn" onClick={() => void cargarMetricas()}>
          <FaSyncAlt />
          <span>Recargar métricas</span>
        </button>
      </div>

      <div className="alert alert-success">
        Sesión iniciada como <strong>{user?.userName}</strong>.
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="metric-card metric-card-authors">
            <div className="metric-icon-wrap">
              <FaUsers className="metric-icon" />
            </div>
            <div className="metric-label">Total de autores</div>
            <div className="metric-value">{loading ? '...' : metrics.totalAutores}</div>
            <div className="metric-helper">Autores registrados en el sistema</div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="metric-card metric-card-books">
            <div className="metric-icon-wrap">
              <FaBook className="metric-icon" />
            </div>
            <div className="metric-label">Total de libros</div>
            <div className="metric-value">{loading ? '...' : metrics.totalLibros}</div>
            <div className="metric-helper">Libros asociados al catálogo</div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="metric-card metric-card-users">
            <div className="metric-icon-wrap">
              <FaUserShield className="metric-icon" />
            </div>
            <div className="metric-label">Total de usuarios</div>
            <div className="metric-value">{loading ? '...' : metrics.totalUsuarios}</div>
            <div className="metric-helper">Usuarios con acceso al sistema</div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="dashboard-card dashboard-card-feature">
            <div className="dashboard-card-icon authors">
              <FaUsers />
            </div>
            <h5>Autores</h5>
            <p>Administra el catálogo de autores registrados.</p>
            <Link to="/admin/autores" className="btn btn-primary dashboard-action-btn">
              <span>Gestionar autores</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-card dashboard-card-feature">
            <div className="dashboard-card-icon books">
              <FaBook />
            </div>
            <h5>Libros</h5>
            <p>Administra los libros y su relación con autores.</p>
            <Link to="/admin/libros" className="btn btn-primary dashboard-action-btn">
              <span>Gestionar libros</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-card dashboard-card-feature">
            <div className="dashboard-card-icon users">
              <FaUserShield />
            </div>
            <h5>Usuarios</h5>
            <p>Administra usuarios y roles del sistema.</p>
            <Link to="/admin/usuarios" className="btn btn-primary dashboard-action-btn">
              <span>Gestionar usuarios</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
        
        <div className="col-md-4">
        <div className="dashboard-card dashboard-card-feature">
          <div className="dashboard-card-icon reports">
            <FaChartBar />
          </div>
          <h5>Estadísticas</h5>
          <p>Visualiza gráficos sobre autores y libros registrados.</p>
          <Link to="/admin/estadisticas" className="btn btn-primary dashboard-action-btn">
            <span>Ver estadísticas</span>
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>

      
    </div>
  );
}

export default AdminHomePage;