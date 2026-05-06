const db = require("../config/db");

const Inventario = {
  // Mejor formato
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT 
        id_inventario AS id,
        producto_id,
        tipo,
        cantidad
      FROM inventario
    `);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT 
         id_inventario AS id,
         producto_id,
         tipo,
         cantidad
       FROM inventario 
       WHERE id_inventario = ?`,
      [id]
    );
    return rows[0];
  },

  create: async ({ producto_id, tipo, cantidad }) => {
    const [result] = await db.query(
      `INSERT INTO inventario (producto_id, tipo, cantidad)
       VALUES (?, ?, ?)` ,
      [producto_id, tipo, cantidad]
    );

    return {
      id: result.insertId,
      producto_id,
      tipo,
      cantidad,
    };
  },

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

  delete: async (id) => {
    await db.query(
      "DELETE FROM inventario WHERE id_inventario = ?",
      [id]
    );
  },
};

module.exports = Inventario;