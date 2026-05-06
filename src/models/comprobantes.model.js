const db = require("../config/db");

const Comprobante = {
  // Obtener todos (solo interno)
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT 
        id_comprobante AS id,
        pedido_id
      FROM comprobantes
    `);
    return rows;
  },

  // Obtener por ID (opcional)
  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT 
         id_comprobante AS id,
         pedido_id
       FROM comprobantes 
       WHERE id_comprobante = ?`,
      [id]
    );
    return rows[0];
  },

  // Crear comprobante
  create: async ({ pedido_id }) => {
    const [result] = await db.query(
      `INSERT INTO comprobantes (pedido_id)
       VALUES (?)`,
      [pedido_id]
    );

    return {
      id: result.insertId,
      pedido_id,
    };
  },

  // Eliminar (opcional)
  delete: async (id) => {
    await db.query(
      "DELETE FROM comprobantes WHERE id_comprobante = ?",
      [id]
    );
  },
};

module.exports = Comprobante;