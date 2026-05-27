import api from '../api/axiosConfig';

export const getProductos = async () => {
  const res = await api.get('/productos');
  return res.data;
};

export const getProductoById = async (id) => {
  const res = await api.get(`/productos/${id}`);
  return res.data;
};

/**
 * Campos que espera el backend:
 * nombre, descripcion, precio_venta, stock_actual, stock_minimo, estado, id_categoria
 */
export const createProducto = async (data) => {
  const res = await api.post('/productos', data);
  return res.data;
};

export const updateProducto = async (id, data) => {
  const res = await api.put(`/productos/${id}`, data);
  return res.data;
};

export const deleteProducto = async (id) => {
  const res = await api.delete(`/productos/${id}`);
  return res.data;
};
