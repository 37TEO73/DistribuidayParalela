import { Link } from 'react-router-dom';

function NoAutorizadoPage() {
  return (
    <div className="container py-5">
      <div className="alert alert-danger">
        <h4>No autorizado</h4>
        <p>No tienes permisos para acceder a esta ruta.</p>
        <Link to="/login" className="btn btn-primary">
          Volver al login
        </Link>
      </div>
    </div>
  );
}

export default NoAutorizadoPage;