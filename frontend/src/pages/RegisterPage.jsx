import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUsuario } from '../services/auth.service';

// rol en BD es TINYINT: 1=Administrador, 2=Gerente, 3=Asistente
export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', correo: '', contrasena: '', rol: 2 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await registerUsuario({ ...form, rol: parseInt(form.rol) });
      alert('Usuario registrado correctamente');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="form-title">Registro de Usuario</h2>
      {error && <p className="alert-error">{error}</p>}

      <form className="form-wrap" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nombre:</label>
          <input type="text" name="nombre" className="form-control"
            value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Correo:</label>
          <input type="email" name="correo" className="form-control"
            value={form.correo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Contraseña:</label>
          <input type="password" name="contrasena" className="form-control"
            value={form.contrasena} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Rol:</label>
          <select name="rol" className="form-select" value={form.rol} onChange={handleChange}>
            <option value={1}>Administrador</option>
            <option value={2}>Gerente</option>
            <option value={3}>Asistente</option>
          </select>
        </div>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
        <p style={{ textAlign: 'center', marginTop: '16px' }}>
          ¿Ya tienes cuenta? <Link to="/login">Ingresa</Link>
        </p>
      </form>
    </div>
  );
}
