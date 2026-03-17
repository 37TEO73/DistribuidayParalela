import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { FaSignOutAlt, FaShieldAlt, FaUserTie } from 'react-icons/fa';

function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <div>
          <small className="text-muted">
            Bienvenido, {user?.userName}
          </small>
        </div>
      </div>

      <div className="topbar-actions">
        <span className="topbar-role-badge">
          {user?.tipo === 'ADMIN' ? <FaShieldAlt /> : <FaUserTie />}
          <span>{user?.tipo}</span>
        </span>

        <button className="btn btn-outline-danger btn-sm topbar-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;