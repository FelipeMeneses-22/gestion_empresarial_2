// src/models/detalle.model.js
const db = require("../config/db");

const Detalle = {
  // Obtener todos los detalles
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM detalles");
    return rows;
  },

  // Obtener detalle por ID (opcional pero útil)
  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM detalles WHERE id_detalle = ?",
      [id],
    );
    return rows[0];
  },

  // Crear detalle
  create: async ({ pedido_id, producto_id, cantidad }) => {
    const [result] = await db.query(
      `INSERT INTO detalles (pedido_id, producto_id, cantidad)
       VALUES (?, ?, ?)`,
      [pedido_id, producto_id, cantidad],
    );

    return {
      id: result.insertId,
      pedido_id,
      producto_id,
      cantidad,
    };
  },

  // Actualizar detalle (opcional)
  update: async (id, { pedido_id, producto_id, cantidad }) => {
    await db.query(
      `UPDATE detalles
       SET pedido_id = ?, producto_id = ?, cantidad = ?
       WHERE id_detalle = ?`,
      [pedido_id, producto_id, cantidad, id],
    );

    return {
      id,
      pedido_id,
      producto_id,
      cantidad,
    };
  },

  // Eliminar detalle (opcional)
  delete: async (id) => {
    await db.query("DELETE FROM detalles WHERE id_detalle = ?", [id]);
  },
};

module.exports = Detalle;
