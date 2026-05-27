import { useState, useEffect, useCallback } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../services/productos.service';
import { getCategorias } from '../services/categorias.service';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    nombre: '', descripcion: '', precio_venta: '',
    stock_actual: '', stock_minimo: '', estado: 1, id_categoria: ''
  });

  const fetchData = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const [prods, cats] = await Promise.all([getProductos(), getCategorias()]);
      setProductos(prods);
      setCategorias(cats);
    } catch {
      setError('Error al cargar los datos.');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const abrirNuevo = () => {
    setEditing(null);
    setForm({ nombre: '', descripcion: '', precio_venta: '', stock_actual: 0, stock_minimo: 0, estado: 1, id_categoria: categorias[0]?.id_categoria || '' });
    setShowForm(true);
  };

  const abrirEditar = (p) => {
    setEditing(p);
    setForm({
      nombre: p.nombre,
      descripcion: p.descripcion || '',
      precio_venta: p.precio_venta,
      stock_actual: p.stock_actual,
      stock_minimo: p.stock_minimo,
      estado: p.estado,
      id_categoria: p.id_categoria
    });
    setShowForm(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGuardar = async (e) => {
    e.preventDefault(); setError('');
    try {
      const payload = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio_venta: parseFloat(form.precio_venta),
        stock_actual: parseInt(form.stock_actual) || 0,
        stock_minimo: parseInt(form.stock_minimo) || 0,
        estado: parseInt(form.estado),
        id_categoria: parseInt(form.id_categoria)
      };
      if (editing) { await updateProducto(editing.id_producto, payload); }
      else { await createProducto(payload); }
      setShowForm(false); setEditing(null);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar.');
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return;
    try { await deleteProducto(id); await fetchData(); }
    catch (err) { setError(err.response?.data?.message || 'Error al eliminar.'); }
  };

  if (loading) return <p style={{ padding: '24px' }}>Cargando...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Productos</h2>
        <button onClick={abrirNuevo} style={s.btnNew}>+ Nuevo</button>
      </div>

      {error && <p className="alert-error">{error}</p>}

      {showForm && (
        <form onSubmit={handleGuardar} style={s.form}>
          <h3 style={{ marginTop: 0 }}>{editing ? 'Editar Producto' : 'Nuevo Producto'}</h3>
          <div className="form-group">
            <label className="form-label">Nombre *</label>
            <input name="nombre" className="form-control" value={form.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Descripción</label>
            <input name="descripcion" className="form-control" value={form.descripcion} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Precio de Venta *</label>
            <input name="precio_venta" type="number" step="0.01" min="0" className="form-control" value={form.precio_venta} onChange={handleChange} required />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Stock Actual</label>
              <input name="stock_actual" type="number" min="0" className="form-control" value={form.stock_actual} onChange={handleChange} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Stock Mínimo</label>
              <input name="stock_minimo" type="number" min="0" className="form-control" value={form.stock_minimo} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Categoría *</label>
            <select name="id_categoria" className="form-select" value={form.id_categoria} onChange={handleChange} required>
              <option value="">Selecciona una categoría</option>
              {categorias.map((c) => (
                <option key={c.id_categoria} value={c.id_categoria}>{c.nombre_categoria}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Estado</label>
            <select name="estado" className="form-select" value={form.estado} onChange={handleChange}>
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" style={s.btnSave}>{editing ? 'Actualizar' : 'Crear'}</button>
            <button type="button" style={s.btnCancel} onClick={() => { setShowForm(false); setEditing(null); }}>Cancelar</button>
          </div>
        </form>
      )}

      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>ID</th>
            <th style={s.th}>Nombre</th>
            <th style={s.th}>Precio Venta</th>
            <th style={s.th}>Stock</th>
            <th style={s.th}>Stock Mín.</th>
            <th style={s.th}>Categoría</th>
            <th style={s.th}>Estado</th>
            <th style={s.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr><td colSpan={8} style={{ textAlign: 'center', padding: '20px' }}>No hay productos.</td></tr>
          ) : productos.map((p) => (
            <tr key={p.id_producto}>
              <td style={s.td}>{p.id_producto}</td>
              <td style={s.td}>{p.nombre}</td>
              <td style={s.td}>${Number(p.precio_venta).toFixed(2)}</td>
              <td style={s.td}>{p.stock_actual}</td>
              <td style={s.td}>{p.stock_minimo}</td>
              <td style={s.td}>{p.nombre_categoria || p.id_categoria}</td>
              <td style={s.td}>{p.estado ? '✅ Activo' : '❌ Inactivo'}</td>
              <td style={s.td}>
                <button style={s.btnEdit} onClick={() => abrirEditar(p)}>Editar</button>
                <button style={s.btnDel} onClick={() => handleEliminar(p.id_producto)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const s = {
  btnNew: { padding: '8px 16px', background: '#00aaff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  form: { border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '24px', background: '#fafafa' },
  btnSave: { flex: 1, padding: '10px', background: '#00aaff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  btnCancel: { flex: 1, padding: '10px', background: 'transparent', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '8px' },
  th: { background: '#f4f2da', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #d2d0bd', fontWeight: '700' },
  td: { padding: '10px 14px', borderBottom: '1px solid #eee' },
  btnEdit: { marginRight: '8px', padding: '6px 12px', background: '#e6f4ff', color: '#0077cc', border: '1px solid #99ccee', borderRadius: '4px', cursor: 'pointer' },
  btnDel: { padding: '6px 12px', background: '#fff0f0', color: '#cc0000', border: '1px solid #ffaaaa', borderRadius: '4px', cursor: 'pointer' },
};
