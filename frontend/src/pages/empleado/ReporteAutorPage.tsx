import { useState } from 'react';
import apiClient from '../../api/apiClient';

type LibroReporte = {
  isbn: string;
  titulo: string;
  editorial: string;
  genero: string;
  anioPublicacion: number;
};

type ReporteAutor = {
  cedula: string;
  nombreCompleto: string;
  nacionalidad: string;
  libros: LibroReporte[];
};

function ReporteAutorPage() {
  const [cedula, setCedula] = useState('');
  const [reporte, setReporte] = useState<ReporteAutor | null>(null);
  const [error, setError] = useState('');

  const buscarReporte = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setReporte(null);

    try {
      const response = await apiClient.get<ReporteAutor>(`/api/reportes/autores/${cedula}`);
      setReporte(response.data);
    } catch (err) {
      console.error(err);
      setError('No se encontró el autor o no fue posible consultar el reporte.');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Reporte de autor por cédula</h2>

      <form onSubmit={buscarReporte} className="card mb-4">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Cédula del autor</label>
            <input
              type="text"
              className="form-control"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Buscar
          </button>
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {reporte && (
        <div className="card">
          <div className="card-body">
            <h4>{reporte.nombreCompleto}</h4>
            <p><strong>Cédula:</strong> {reporte.cedula}</p>
            <p><strong>Nacionalidad:</strong> {reporte.nacionalidad}</p>

            <h5 className="mt-4">Libros</h5>

            {reporte.libros.length === 0 ? (
              <div className="alert alert-warning">Este autor no tiene libros registrados.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ISBN</th>
                      <th>Título</th>
                      <th>Editorial</th>
                      <th>Género</th>
                      <th>Año</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reporte.libros.map((libro) => (
                      <tr key={libro.isbn}>
                        <td>{libro.isbn}</td>
                        <td>{libro.titulo}</td>
                        <td>{libro.editorial}</td>
                        <td>{libro.genero}</td>
                        <td>{libro.anioPublicacion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReporteAutorPage;