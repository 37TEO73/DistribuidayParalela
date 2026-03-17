import { useEffect, useState } from 'react';
import axios from 'axios';
import { autorApi } from '../../../api/autorApi';
import { libroApi } from '../../../api/libroApi';
import type { Autor } from '../../../types/Autor';
import type { Libro, LibroRequest } from '../../../types/Libro';

const initialForm: LibroRequest = {
  isbn: '',
  titulo: '',
  editorial: '',
  genero: '',
  anioPublicacion: new Date().getFullYear(),
  autorCedula: '',
};

function LibroListPage() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [form, setForm] = useState<LibroRequest>(initialForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingIsbn, setEditingIsbn] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const cargarLibros = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await libroApi.listarTodos();
      setLibros(data);
    } catch (err: unknown) {
      console.error(err);
      setError('No fue posible cargar los libros.');
    } finally {
      setLoading(false);
    }
  };

  const cargarAutores = async () => {
    try {
      const data = await autorApi.listarTodos();
      setAutores(data);
    } catch (err: unknown) {
      console.error(err);
      setError('No fue posible cargar los autores.');
    }
  };

  useEffect(() => {
    void cargarLibros();
    void cargarAutores();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'anioPublicacion' ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingIsbn(null);
  };

  const handleEdit = (libro: Libro) => {
    setError('');
    setSuccess('');
    setEditingIsbn(libro.isbn);
    setForm({
      isbn: libro.isbn,
      titulo: libro.titulo,
      editorial: libro.editorial,
      genero: libro.genero,
      anioPublicacion: libro.anioPublicacion,
      autorCedula: libro.autor?.cedula ?? '',
    });
  };

  const handleDelete = async (isbn: string) => {
    const confirmacion = window.confirm('¿Deseas eliminar este libro?');

    if (!confirmacion) return;

    setError('');
    setSuccess('');

    try {
      await libroApi.eliminar(isbn);
      setSuccess('Libro eliminado correctamente.');

      if (editingIsbn === isbn) {
        resetForm();
      }

      await cargarLibros();
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'No fue posible eliminar el libro.');
      } else {
        setError('No fue posible eliminar el libro.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      if (editingIsbn) {
        await libroApi.actualizar(editingIsbn, form);
        setSuccess('Libro actualizado correctamente.');
      } else {
        await libroApi.crear(form);
        setSuccess('Libro creado correctamente.');
      }

      resetForm();
      await cargarLibros();
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'No fue posible guardar el libro.');
      } else {
        setError('No fue posible guardar el libro.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Gestión de libros</h2>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">
                {editingIsbn ? 'Editar libro' : 'Crear libro'}
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">ISBN</label>
                  <input
                    type="text"
                    className="form-control"
                    name="isbn"
                    value={form.isbn}
                    onChange={handleChange}
                    required
                    disabled={!!editingIsbn}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Editorial</label>
                  <input
                    type="text"
                    className="form-control"
                    name="editorial"
                    value={form.editorial}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Género</label>
                  <input
                    type="text"
                    className="form-control"
                    name="genero"
                    value={form.genero}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Año de publicación</label>
                  <input
                    type="number"
                    className="form-control"
                    name="anioPublicacion"
                    value={form.anioPublicacion}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Autor</label>
                  <select
                    className="form-select"
                    name="autorCedula"
                    value={form.autorCedula}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione un autor</option>
                    {autores.map((autor) => (
                      <option key={autor.cedula} value={autor.cedula}>
                        {autor.nombreCompleto} - {autor.cedula}
                      </option>
                    ))}
                  </select>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary w-100" disabled={saving}>
                    {saving
                      ? 'Guardando...'
                      : editingIsbn
                      ? 'Actualizar libro'
                      : 'Guardar libro'}
                  </button>

                  {editingIsbn && (
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
                <h5 className="card-title mb-0">Listado de libros</h5>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => void cargarLibros()}
                >
                  Recargar
                </button>
              </div>

              {loading ? (
                <div className="alert alert-info">Cargando libros...</div>
              ) : libros.length === 0 ? (
                <div className="alert alert-warning">No hay libros registrados.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle">
                    <thead>
                      <tr>
                        <th>ISBN</th>
                        <th>Título</th>
                        <th>Editorial</th>
                        <th>Género</th>
                        <th>Año</th>
                        <th>Autor</th>
                        <th style={{ width: '180px' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {libros.map((libro) => (
                        <tr key={libro.isbn}>
                          <td>{libro.isbn}</td>
                          <td>{libro.titulo}</td>
                          <td>{libro.editorial}</td>
                          <td>{libro.genero}</td>
                          <td>{libro.anioPublicacion}</td>
                          <td>{libro.autor?.nombreCompleto ?? 'Sin autor'}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => handleEdit(libro)}
                              >
                                Editar
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => void handleDelete(libro.isbn)}
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

export default LibroListPage;