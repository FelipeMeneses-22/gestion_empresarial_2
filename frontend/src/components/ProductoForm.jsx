import { useState, useEffect } from 'react';

export default function ProductoForm({ producto, onSave, onCancel }) {
  const [form, setForm] = useState({ nombre: '', precio: '', stock: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (producto) {
      setForm({
        nombre: producto.nombre || '',
        precio: producto.precio || '',
        stock: producto.stock ?? '',
      });
    } else {
      setForm({ nombre: '', precio: '', stock: '' });
    }
    setError('');
  }, [producto]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.precio) {
      setError('Nombre y precio son obligatorios');
      return;
    }
    onSave({
      nombre: form.nombre.trim(),
      precio: parseFloat(form.precio),
      stock: form.stock !== '' ? parseInt(form.stock, 10) : 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.title}>{producto ? 'Editar Producto' : 'Nuevo Producto'}</h3>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.field}>
        <label style={styles.label}>Nombre</label>
        <input
          style={styles.input}
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre del producto"
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Precio</label>
        <input
          style={styles.input}
          name="precio"
          type="number"
          step="0.01"
          min="0"
          value={form.precio}
          onChange={handleChange}
          placeholder="0.00"
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Stock</label>
        <input
          style={styles.input}
          name="stock"
          type="number"
          min="0"
          value={form.stock}
          onChange={handleChange}
          placeholder="0"
        />
      </div>

      <div style={styles.buttons}>
        <button type="submit" style={styles.btnSave}>
          {producto ? 'Actualizar' : 'Crear'}
        </button>
        <button type="button" style={styles.btnCancel} onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: '400px',
    margin: '0 auto 24px',
    padding: '20px',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    background: 'var(--code-bg)',
  },
  title: { margin: '0 0 16px', fontSize: '18px' },
  error: { color: '#ff4d4f', fontSize: '14px', marginBottom: '12px' },
  field: { marginBottom: '12px', textAlign: 'left' },
  label: { display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 'bold' },
  input: {
    width: '100%',
    padding: '8px 10px',
    fontSize: '14px',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    background: 'var(--bg)',
    color: 'var(--text)',
    boxSizing: 'border-box',
  },
  buttons: { display: 'flex', gap: '8px', marginTop: '16px' },
  btnSave: {
    flex: 1,
    padding: '8px',
    background: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  btnCancel: {
    flex: 1,
    padding: '8px',
    background: 'transparent',
    color: 'var(--text)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};