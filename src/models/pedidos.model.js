const db = require("../config/db");

const Pedido = {
  // SOLO pedidos del usuario
  getByUser: async (usuarioId) => {
    const [rows] = await db.query(`
      SELECT 
        id_pedido AS id,
        usuario_id,
        total
      FROM pedidos
      WHERE usuario_id = ?
    `, [usuarioId]);

    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT 
         id_pedido AS id,
         usuario_id,
         total
       FROM pedidos 
       WHERE id_pedido = ?`,
      [id]
    );
    return rows[0];
  },

  create: async ({ usuario_id, total }) => {
    const [result] = await db.query(
      `INSERT INTO pedidos (usuario_id, total)
       VALUES (?, ?)` ,
      [usuario_id, total]
    );

    return {
      id: result.insertId,
      usuario_id,
      total,
    };
  },

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

  delete: async (id) => {
    await db.query(
      "DELETE FROM pedidos WHERE id_pedido = ?",
      [id]
    );
  },
};

module.exports = Pedido;