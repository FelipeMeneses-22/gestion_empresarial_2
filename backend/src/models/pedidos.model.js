// src/models/pedidos.model.js
const db = require("../config/db");

const Pedido = {
  // Obtener todos los pedidos con info del usuario
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT p.*, u.nombre AS nombre_usuario
      FROM pedidos p
      LEFT JOIN usuarios u ON p.id_usuario = u.id_usuario
    `);
    return rows;
  },

  // Obtener pedido por ID
  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT p.*, u.nombre AS nombre_usuario
       FROM pedidos p
       LEFT JOIN usuarios u ON p.id_usuario = u.id_usuario
       WHERE p.id_pedido = ?`,
      [id]
    );
    return rows[0];
  },

  // Crear pedido
  create: async ({ id_usuario, fecha, total, estado }) => {
    const fechaValue = fecha || new Date().toISOString().split('T')[0];
    const estadoValue = estado || 'pendiente';
    const [result] = await db.query(
      `INSERT INTO pedidos (id_usuario, fecha, total, estado)
       VALUES (?, ?, ?, ?)`,
      [id_usuario, fechaValue, total, estadoValue]
    );
    return { id: result.insertId, id_usuario, fecha: fechaValue, total, estado: estadoValue };
  },

  // Actualizar pedido
  update: async (id, { id_usuario, fecha, total, estado }) => {
    await db.query(
      `UPDATE pedidos SET id_usuario = ?, fecha = ?, total = ?, estado = ?
       WHERE id_pedido = ?`,
      [id_usuario, fecha, total, estado, id]
    );
    return { id, id_usuario, fecha, total, estado };
  },

  // Eliminar pedido
  delete: async (id) => {
    await db.query("DELETE FROM pedidos WHERE id_pedido = ?", [id]);
  },
};

module.exports = Pedido;
