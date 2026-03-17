import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/useAuth';
import logoBiblioteca from '../../assets/biblioteca-en-linea.png';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    userName: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(form);

      if (user.tipo === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/empleado');
      }
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Credenciales inválidas o error al iniciar sesión.');
      } else {
        setError('Credenciales inválidas o error al iniciar sesión.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-xl-10">
            <div className="login-shell">
              <div className="row g-0">
                <div className="login-brand-panel">
                  <div className="login-brand-logo-wrap">
                    <img src={logoBiblioteca} alt="Logo Biblioteca" className="login-brand-logo" />
                  </div>

                  <span className="login-badge">Acceso seguro</span>

                  <h1 className="login-brand-title">Sistema_BibliotecaSM</h1>

                  <p className="login-brand-text">
                    Plataforma de gestión bibliotecaria para administrar autores,
                    libros, usuarios y reportes institucionales de forma organizada.
                  </p>

                  <div className="login-feature-list">
                    <div className="login-feature-item">
                      <span className="login-feature-dot"></span>
                      Gestión de autores y libros
                    </div>
                    <div className="login-feature-item">
                      <span className="login-feature-dot"></span>
                      Control de usuarios por rol
                    </div>
                    <div className="login-feature-item">
                      <span className="login-feature-dot"></span>
                      Reportes por cédula para empleados
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="login-form-panel">
                    <div className="login-form-wrapper">
                      <h2 className="login-form-title">Iniciar sesión</h2>
                      <p className="login-form-subtitle">
                        Ingresa tus credenciales para acceder al sistema.
                      </p>

                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label className="form-label">Usuario</label>
                          <input
                            type="text"
                            className="form-control login-input"
                            name="userName"
                            value={form.userName}
                            onChange={handleChange}
                            placeholder="Ingresa tu usuario"
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Contraseña</label>
                          <input
                            type="password"
                            className="form-control login-input"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Ingresa tu contraseña"
                            required
                          />
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <button
                          type="submit"
                          className="btn btn-primary w-100 login-submit-btn"
                          disabled={loading}
                        >
                          {loading ? 'Ingresando...' : 'Ingresar al sistema'}
                        </button>
                      </form>

                      <div className="login-footer-note">
                        Acceso disponible según el rol asignado: administrador o empleado.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>رى
    </div>
  );
}

export default LoginPage;