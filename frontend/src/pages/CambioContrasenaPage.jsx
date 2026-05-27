import { useState } from 'react';
import { cambiarContrasena } from '../services/auth.service';

export default function CambioContrasenaPage() {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(''); setError('');
    setLoading(true);
    try {
      const data = await cambiarContrasena({ correo });
      setMensaje(data.message || 'Solicitud enviada correctamente.');
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="form-title">Formulario de cambio de contraseña</h2>
      {mensaje && <p className="alert-success">{mensaje}</p>}
      {error && <p className="alert-error">{error}</p>}

      <form className="form-wrap" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="correo">Correo:</label>
          <input type="email" id="correo" className="form-control"
            placeholder="Ingresa tu correo"
            value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        </div>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}
