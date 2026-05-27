import api from '../api/axiosConfig';

export const getComprobantes = async () => {
  const res = await api.get('/comprobante');
  return res.data;
};

export const getComprobanteById = async (id) => {
  const res = await api.get(`/comprobante/${id}`);
  return res.data;
};

/**
 * Campos que espera el backend:
 * id_pedido, numero_factura, metodo_pago, impuestos (opcional), fecha_emision (opcional)
 */
export const createComprobante = async (data) => {
  const res = await api.post('/comprobante', data);
  return res.data;
};

export const updateComprobante = async (id, data) => {
  const res = await api.put(`/comprobante/${id}`, data);
  return res.data;
};

export const deleteComprobante = async (id) => {
  const res = await api.delete(`/comprobante/${id}`);
  return res.data;
};
