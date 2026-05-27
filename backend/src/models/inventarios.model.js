// src/models/inventarios.model.js
const db = require("../config/db");

const Inventario = {
  // Obtener todos los movimientos con info de producto y usuario
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT m.*, pr.nombre AS nombre_producto, u.nombre AS nombre_usuario
      FROM movimientos_inventario m
      LEFT JOIN productos pr ON m.id_producto = pr.id_producto
      LEFT JOIN usuarios u ON m.id_usuario = u.id_usuario
    `);
    return rows;
  },

  // Obtener movimiento por ID
  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT m.*, pr.nombre AS nombre_producto, u.nombre AS nombre_usuario
       FROM movimientos_inventario m
       LEFT JOIN productos pr ON m.id_producto = pr.id_producto
       LEFT JOIN usuarios u ON m.id_usuario = u.id_usuario
       WHERE m.id_movimiento = ?`,
      [id]
    );
    return rows[0];
  },

  // Crear movimiento de inventario
  create: async ({ id_producto, id_usuario, tipo, cantidad, cantidad_mov, fecha }) => {
    const fechaValue = fecha || new Date().toISOString().split('T')[0];
    const cantidad_movValue = cantidad_mov || cantidad;
    const [result] = await db.query(
      `INSERT INTO movimientos_inventario (id_producto, id_usuario, tipo, cantidad, cantidad_mov, fecha)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_producto, id_usuario, tipo, cantidad, cantidad_movValue, fechaValue]
    );
    return { id: result.insertId, id_producto, id_usuario, tipo, cantidad, cantidad_mov: cantidad_movValue, fecha: fechaValue };
  },

  // Actualizar movimiento
  update: async (id, { id_producto, id_usuario, tipo, cantidad, cantidad_mov, fecha }) => {
    await db.query(
      `UPDATE movimientos_inventario
       SET id_producto = ?, id_usuario = ?, tipo = ?, cantidad = ?, cantidad_mov = ?, fecha = ?
       WHERE id_movimiento = ?`,
      [id_producto, id_usuario, tipo, cantidad, cantidad_mov, fecha, id]
    );
    return { id, id_producto, id_usuario, tipo, cantidad, cantidad_mov, fecha };
  },

  // Eliminar movimiento
  delete: async (id) => {
    await db.query("DELETE FROM movimientos_inventario WHERE id_movimiento = ?", [id]);
  },
};

module.exports = Inventario;
