// src/models/comprobantes.model.js
const db = require("../config/db");

const Comprobante = {
  // Obtener todos los comprobantes con info del pedido
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT c.*, p.total AS total_pedido, p.estado AS estado_pedido
      FROM comprobantes c
      LEFT JOIN pedidos p ON c.id_pedido = p.id_pedido
    `);
    return rows;
  },

  // Obtener comprobante por ID
  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT c.*, p.total AS total_pedido, p.estado AS estado_pedido
       FROM comprobantes c
       LEFT JOIN pedidos p ON c.id_pedido = p.id_pedido
       WHERE c.id_comprobante = ?`,
      [id]
    );
    return rows[0];
  },

  // Obtener comprobante por pedido
  getByPedido: async (id_pedido) => {
    const [rows] = await db.query(
      "SELECT * FROM comprobantes WHERE id_pedido = ?",
      [id_pedido]
    );
    return rows[0];
  },

  // Crear comprobante
  create: async ({ id_pedido, numero_factura, metodo_pago, impuestos, fecha_emision }) => {
    const fechaValue = fecha_emision || new Date().toISOString().split('T')[0];
    const impuestosValue = impuestos || 0;
    const metodoValue = metodo_pago || 'efectivo';
    const [result] = await db.query(
      `INSERT INTO comprobantes (id_pedido, numero_factura, metodo_pago, impuestos, fecha_emision)
       VALUES (?, ?, ?, ?, ?)`,
      [id_pedido, numero_factura, metodoValue, impuestosValue, fechaValue]
    );
    return {
      id: result.insertId,
      id_pedido,
      numero_factura,
      metodo_pago: metodoValue,
      impuestos: impuestosValue,
      fecha_emision: fechaValue
    };
  },

  // Actualizar comprobante
  update: async (id, { id_pedido, numero_factura, metodo_pago, impuestos, fecha_emision }) => {
    await db.query(
      `UPDATE comprobantes
       SET id_pedido = ?, numero_factura = ?, metodo_pago = ?, impuestos = ?, fecha_emision = ?
       WHERE id_comprobante = ?`,
      [id_pedido, numero_factura, metodo_pago, impuestos, fecha_emision, id]
    );
    return { id, id_pedido, numero_factura, metodo_pago, impuestos, fecha_emision };
  },

  // Eliminar comprobante
  delete: async (id) => {
    await db.query("DELETE FROM comprobantes WHERE id_comprobante = ?", [id]);
  },
};

module.exports = Comprobante;
