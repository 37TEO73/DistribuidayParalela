import { useEffect, useState } from 'react';
import axios from 'axios';
import { usuarioApi } from '../../../api/usuarioApi';
import type { TipoUsuario, Usuario, UsuarioRequest } from '../../../types/Usuario';

const initialForm: UsuarioRequest = {
  userName: '',
  password: '',
  tipo: 'EMPLEADO',
};

function UsuarioListPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [form, setForm] = useState<UsuarioRequest>(initialForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const cargarUsuarios = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await usuarioApi.listarTodos();
      setUsuarios(data);
    } catch (err: unknown) {
      console.error(err);
      setError('No fue posible cargar los usuarios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void cargarUsuarios();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'tipo' ? (value as TipoUsuario) : value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleEdit = (usuario: Usuario) => {
    setError('');
    setSuccess('');
    setEditingId(usuario.id);
    setForm({
      userName: usuario.userName,
      password: '',
      tipo: usuario.tipo,
    });
  };

  const handleDelete = async (id: number) => {
    const confirmacion = window.confirm('¿Deseas eliminar este usuario?');

    if (!confirmacion) return;

    setError('');
    setSuccess('');

    try {
      await usuarioApi.eliminar(id);
      setSuccess('Usuario eliminado correctamente.');

      if (editingId === id) {
        resetForm();
      }

      await cargarUsuarios();
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'No fue posible eliminar el usuario.');
      } else {
        setError('No fue posible eliminar el usuario.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      if (editingId) {
        await usuarioApi.actualizar(editingId, form);
        setSuccess('Usuario actualizado correctamente.');
      } else {
        await usuarioApi.crear(form);
        setSuccess('Usuario creado correctamente.');
      }

      resetForm();
      await cargarUsuarios();
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'No fue posible guardar el usuario.');
      } else {
        setError('No fue posible guardar el usuario.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Gestión de usuarios</h2>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">
                {editingId ? 'Editar usuario' : 'Crear usuario'}
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userName"
                    value={form.userName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {!editingId && (
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}

                {editingId && (
                  <div className="alert alert-secondary">
                    La contraseña no se modifica desde esta pantalla.
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Tipo de usuario</label>
                  <select
                    className="form-select"
                    name="tipo"
                    value={form.tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="EMPLEADO">EMPLEADO</option>
                  </select>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary w-100" disabled={saving}>
                    {saving
                      ? 'Guardando...'
                      : editingId
                      ? 'Actualizar usuario'
                      : 'Guardar usuario'}
                  </button>

                  {editingId && (
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
                <h5 className="card-title mb-0">Listado de usuarios</h5>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => void cargarUsuarios()}
                >
                  Recargar
                </button>
              </div>

              {loading ? (
                <div className="alert alert-info">Cargando usuarios...</div>
              ) : usuarios.length === 0 ? (
                <div className="alert alert-warning">No hay usuarios registrados.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Tipo</th>
                        <th style={{ width: '180px' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                          <td>{usuario.id}</td>
                          <td>{usuario.userName}</td>
                          <td>{usuario.tipo}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => handleEdit(usuario)}
                              >
                                Editar
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => void handleDelete(usuario.id)}
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

              <div className="alert alert-secondary mt-3 mb-0">
                La contraseña no se muestra ni se edita desde esta pantalla.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsuarioListPage;