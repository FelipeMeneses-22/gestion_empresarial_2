// src/models/comprobante.model.js
const db = require("../config/db");

const Comprobante = {
  // Obtener todos los comprobantes
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM comprobantes");
    return rows;
  },

  // Obtener comprobante por ID (opcional)
  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM comprobantes WHERE id_comprobante = ?",
      [id],
    );
    return rows[0];
  },

  // Crear comprobante
  create: async ({ pedido_id }) => {
    const [result] = await db.query(
      `INSERT INTO comprobantes (pedido_id)
       VALUES (?)`,
      [pedido_id],
    );

    return {
      id: result.insertId,
      pedido_id,
    };
  },

  // Eliminar comprobante (opcional)
  delete: async (id) => {
    await db.query("DELETE FROM comprobantes WHERE id_comprobante = ?", [id]);
  },
};

module.exports = Comprobante;
