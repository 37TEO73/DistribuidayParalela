import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { FaFileAlt, FaArrowRight } from 'react-icons/fa';

function EmpleadoHomePage() {
  const { user } = useAuth();

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Panel de empleado</h2>
          <p className="page-subtitle">
            Desde aquí puedes consultar el reporte de autores por cédula.
          </p>
        </div>
      </div>

      <div className="alert alert-info">
        Sesión iniciada como <strong>{user?.userName}</strong>.
      </div>

      <div className="dashboard-card dashboard-card-feature employee-card" style={{ maxWidth: '560px' }}>
        <div className="dashboard-card-icon reports">
          <FaFileAlt />
        </div>
        <h5>Reporte de autores</h5>
        <p>
          Consulta un autor por cédula y visualiza sus libros registrados en el sistema.
        </p>
        <Link to="/empleado/reporte" className="btn btn-primary dashboard-action-btn">
          <span>Generar reporte</span>
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default EmpleadoHomePage;