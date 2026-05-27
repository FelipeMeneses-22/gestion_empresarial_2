import api from '../api/axiosConfig';

export const getDetalles = async () => {
  const res = await api.get('/detalle');
  return res.data;
};

export const getDetallesByPedido = async (id_pedido) => {
  const res = await api.get(`/detalle/pedido/${id_pedido}`);
  return res.data;
};

/**
 * Campos que espera el backend:
 * id_pedido, id_producto, cantidad, precio_unitario, sub_total (se calcula si no viene)
 */
export const createDetalle = async (data) => {
  const res = await api.post('/detalle', data);
  return res.data;
};

export const updateDetalle = async (id, data) => {
  const res = await api.put(`/detalle/${id}`, data);
  return res.data;
};

export const deleteDetalle = async (id) => {
  const res = await api.delete(`/detalle/${id}`);
  return res.data;
};
