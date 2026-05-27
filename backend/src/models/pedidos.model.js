// src/models/pedidos.model.js
const db = require("../config/db");

const Pedido = {
  // Obtener todos los pedidos
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM pedidos");
    return rows;
  },

  // Obtener pedido por ID (opcional)
  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM pedidos WHERE id_pedido = ?",
      [id]
    );
    return rows[0];
  },

  // Crear pedido
  create: async ({ usuario_id, total }) => {
    const [result] = await db.query(
      `INSERT INTO pedidos (usuario_id, total)
       VALUES (?, ?)`,
      [usuario_id, total]
    );

    return {
      id: result.insertId,
      usuario_id,
      total,
    };
  },

  // Actualizar pedido (opcional)
  update: async (id, { usuario_id, total }) => {
    await db.query(
      `UPDATE pedidos
       SET usuario_id = ?, total = ?
       WHERE id_pedido = ?`,
      [usuario_id, total, id]
    );

    return {
      id,
      usuario_id,
      total,
    };
  },

  // Eliminar pedido (opcional)
  delete: async (id) => {
    await db.query(
      "DELETE FROM pedidos WHERE id_pedido = ?",
      [id]
    );
  },
};

module.exports = Pedido;