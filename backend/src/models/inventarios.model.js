// src/models/inventario.model.js
const db = require("../config/db");

const Inventario = {
  // Obtener todos los movimientos
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM inventario");
    return rows;
  },

  // Obtener movimiento por ID (opcional pero útil)
  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM inventario WHERE id_inventario = ?",
      [id]
    );
    return rows[0];
  },

  // Crear movimiento de inventario
  create: async ({ producto_id, tipo, cantidad }) => {
    const [result] = await db.query(
      `INSERT INTO inventario (producto_id, tipo, cantidad)
       VALUES (?, ?, ?)`,
      [producto_id, tipo, cantidad]
    );

    return {
      id: result.insertId,
      producto_id,
      tipo,
      cantidad,
    };
  },

  // Actualizar movimiento (opcional)
  update: async (id, { producto_id, tipo, cantidad }) => {
    await db.query(
      `UPDATE inventario
       SET producto_id = ?, tipo = ?, cantidad = ?
       WHERE id_inventario = ?`,
      [producto_id, tipo, cantidad, id]
    );

    return {
      id,
      producto_id,
      tipo,
      cantidad,
    };
  },

  // Eliminar movimiento (opcional)
  delete: async (id) => {
    await db.query(
      "DELETE FROM inventario WHERE id_inventario = ?",
      [id]
    );
  },
};

module.exports = Inventario;