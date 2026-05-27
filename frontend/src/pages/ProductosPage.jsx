import { useState, useEffect, useCallback } from 'react';
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from '../services/productos.service';
import ProductoList from '../components/ProductoList';
import ProductoForm from '../components/ProductoForm';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProductos = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProductos();
      setProductos(data);
    } catch {
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  const handleSave = async (formData) => {
    setError('');
    try {
      if (editing) {
        await updateProducto(editing.id, formData);
      } else {
        await createProducto(formData);
      }
      setEditing(null);
      setShowForm(false);
      await fetchProductos();
    } catch {
      setError('Error al guardar el producto');
    }
  };

  const handleEdit = (producto) => {
    setEditing(producto);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return;
    setError('');
    try {
      await deleteProducto(id);
      await fetchProductos();
    } catch {
      setError('Error al eliminar el producto');
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
  };

  if (loading) return <p style={{ padding: '24px' }}>Cargando...</p>;

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Productos</h2>
        <button
          style={styles.btnNew}
          onClick={() => { setEditing(null); setShowForm(true); }}
        >
          + Nuevo
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {showForm && (
        <ProductoForm
          producto={editing}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <ProductoList
        productos={productos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

const styles = {
  btnNew: {
    padding: '8px 16px',
    background: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: { color: '#ff4d4f', background: '#ff4d4f22', padding: '10px', borderRadius: '4px', marginBottom: '16px' },
};