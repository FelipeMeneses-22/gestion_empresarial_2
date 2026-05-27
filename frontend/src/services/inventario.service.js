import api from '../api/axiosConfig';

export const getMovimientos = async () => {
  const res = await api.get('/inventario');
  return res.data;
};

export const getMovimientoById = async (id) => {
  const res = await api.get(`/inventario/${id}`);
  return res.data;
};

/**
 * Campos que espera el backend:
 * id_producto, id_usuario, tipo, cantidad, cantidad_mov (opcional), fecha (opcional)
 */
export const createMovimiento = async (data) => {
  const res = await api.post('/inventario', data);
  return res.data;
};

export const updateMovimiento = async (id, data) => {
  const res = await api.put(`/inventario/${id}`, data);
  return res.data;
};

export const deleteMovimiento = async (id) => {
  const res = await api.delete(`/inventario/${id}`);
  return res.data;
};
