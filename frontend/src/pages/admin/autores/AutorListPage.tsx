import { useEffect, useState } from 'react';
import axios from 'axios';
import { autorApi } from '../../../api/autorApi';
import type { Autor, AutorRequest } from '../../../types/Autor';

const initialForm: AutorRequest = {
  cedula: '',
  nombreCompleto: '',
  nacionalidad: '',
};

function AutorListPage() {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [form, setForm] = useState<AutorRequest>(initialForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingCedula, setEditingCedula] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const cargarAutores = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await autorApi.listarTodos();
      setAutores(data);
    } catch (err: unknown) {
      console.error(err);
      setError('No fue posible cargar los autores.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void cargarAutores();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingCedula(null);
  };

  const handleEdit = (autor: Autor) => {
    setError('');
    setSuccess('');
    setEditingCedula(autor.cedula);
    setForm({
      cedula: autor.cedula,
      nombreCompleto: autor.nombreCompleto,
      nacionalidad: autor.nacionalidad,
    });
  };

  const handleDelete = async (cedula: string) => {
    const confirmacion = window.confirm('¿Deseas eliminar este autor?');

    if (!confirmacion) return;

    setError('');
    setSuccess('');

    try {
      await autorApi.eliminar(cedula);
      setSuccess('Autor eliminado correctamente.');

      if (editingCedula === cedula) {
        resetForm();
      }

      await cargarAutores();
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            'No fue posible eliminar el autor. Puede tener libros asociados.'
        );
      } else {
        setError('No fue posible eliminar el autor.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      if (editingCedula) {
        await autorApi.actualizar(editingCedula, form);
        setSuccess('Autor actualizado correctamente.');
      } else {
        await autorApi.crear(form);
        setSuccess('Autor creado correctamente.');
      }

      resetForm();
      await cargarAutores();
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'No fue posible guardar el autor.');
      } else {
        setError('No fue posible guardar el autor.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Gestión de autores</h2>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">
                {editingCedula ? 'Editar autor' : 'Crear autor'}
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Cédula</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cedula"
                    value={form.cedula}
                    onChange={handleChange}
                    required
                    disabled={!!editingCedula}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombreCompleto"
                    value={form.nombreCompleto}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Nacionalidad</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nacionalidad"
                    value={form.nacionalidad}
                    onChange={handleChange}
                    required
                  />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary w-100" disabled={saving}>
                    {saving
                      ? 'Guardando...'
                      : editingCedula
                      ? 'Actualizar autor'
                      : 'Guardar autor'}
                  </button>

                  {editingCedula && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetForm}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Listado de autores</h5>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => void cargarAutores()}>
                  Recargar
                </button>
              </div>

              {loading ? (
                <div className="alert alert-info">Cargando autores...</div>
              ) : autores.length === 0 ? (
                <div className="alert alert-warning">No hay autores registrados.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle">
                    <thead>
                      <tr>
                        <th>Cédula</th>
                        <th>Nombre completo</th>
                        <th>Nacionalidad</th>
                        <th style={{ width: '180px' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {autores.map((autor) => (
                        <tr key={autor.cedula}>
                          <td>{autor.cedula}</td>
                          <td>{autor.nombreCompleto}</td>
                          <td>{autor.nacionalidad}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => handleEdit(autor)}
                              >
                                Editar
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => void handleDelete(autor.cedula)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AutorListPage;