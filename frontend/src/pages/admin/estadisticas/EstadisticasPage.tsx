import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { estadisticaApi } from '../../../api/estadisticaApi';
import type { EstadisticaAutor } from '../../../types/Estadistica';

const COLORS = ['#2563eb', '#7c3aed', '#0f766e', '#ea580c', '#dc2626', '#0891b2'];

function EstadisticasPage() {
  const [data, setData] = useState<EstadisticaAutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cargarEstadisticas = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await estadisticaApi.obtenerLibrosPorAutor();
      setData(response);
    } catch (err) {
      console.error(err);
      setError('No fue posible cargar las estadísticas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void cargarEstadisticas();
  }, []);

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-start flex-wrap gap-3">
        <div>
          <h2 className="page-title">Estadísticas</h2>
          <p className="page-subtitle">
            Visualiza la cantidad de libros asociados a cada autor.
          </p>
        </div>

        <button className="btn btn-outline-primary" onClick={() => void cargarEstadisticas()}>
          Recargar
        </button>
      </div>

      {loading && <div className="alert alert-info">Cargando estadísticas...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="dashboard-card">
          {data.length === 0 ? (
            <div className="alert alert-warning mb-0">
              No hay datos suficientes para generar el gráfico.
            </div>
          ) : (
            <>
              <h5 className="mb-4">Libros por autor</h5>

              <div style={{ width: '100%', height: 420 }}>
                <ResponsiveContainer>
                  <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="nombreCompleto"
                      angle={-20}
                      textAnchor="end"
                      interval={0}
                      height={80}
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="totalLibros" radius={[8, 8, 0, 0]}>
                      {data.map((entry, index) => (
                        <Cell key={entry.cedula} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default EstadisticasPage;