// src/models/detalles.model.js
const db = require("../config/db");

const Detalle = {
  // Obtener todos los detalles con info de producto y pedido
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT d.*, pr.nombre AS nombre_producto
      FROM detalle_pedido d
      LEFT JOIN productos pr ON d.id_producto = pr.id_producto
    `);
    return rows;
  },

  // Obtener detalles por pedido
  getByPedido: async (id_pedido) => {
    const [rows] = await db.query(
      `SELECT d.*, pr.nombre AS nombre_producto
       FROM detalle_pedido d
       LEFT JOIN productos pr ON d.id_producto = pr.id_producto
       WHERE d.id_pedido = ?`,
      [id_pedido]
    );
    return rows;
  },

  // Obtener detalle por ID
  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM detalle_pedido WHERE id_detalle = ?",
      [id]
    );
    return rows[0];
  },

  // Crear detalle
  create: async ({ id_pedido, id_producto, cantidad, precio_unitario, sub_total }) => {
    const [result] = await db.query(
      `INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario, sub_total)
       VALUES (?, ?, ?, ?, ?)`,
      [id_pedido, id_producto, cantidad, precio_unitario, sub_total]
    );
    return { id: result.insertId, id_pedido, id_producto, cantidad, precio_unitario, sub_total };
  },

  // Actualizar detalle
  update: async (id, { id_pedido, id_producto, cantidad, precio_unitario, sub_total }) => {
    await db.query(
      `UPDATE detalle_pedido
       SET id_pedido = ?, id_producto = ?, cantidad = ?, precio_unitario = ?, sub_total = ?
       WHERE id_detalle = ?`,
      [id_pedido, id_producto, cantidad, precio_unitario, sub_total, id]
    );
    return { id, id_pedido, id_producto, cantidad, precio_unitario, sub_total };
  },

  // Eliminar detalle
  delete: async (id) => {
    await db.query("DELETE FROM detalle_pedido WHERE id_detalle = ?", [id]);
  },
};

module.exports = Detalle;
