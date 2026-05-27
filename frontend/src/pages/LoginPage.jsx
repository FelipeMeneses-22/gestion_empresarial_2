import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUsuario } from '../services/auth.service';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: '', contrasena: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginUsuario(form);
      if (data.status === 'ok') {
        localStorage.setItem('usuarioActivo', JSON.stringify(data.usuario));
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        navigate('/home');
      } else {
        setError(data.message || 'Datos incorrectos.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="form-title">Formulario de Ingreso</h2>
      {error && <p className="alert-error">{error}</p>}

      <form className="form-wrap" onSubmit={handleSubmit}>
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
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
        <p style={{ textAlign: 'center', marginTop: '16px' }}>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </form>
    </div>
  );
}
