const Pedido = require('../models/pedidos.model');

exports.getPedidos = async (req, res) => {
  try {
    const usuarioId = req.usuario.id; // viene del token

    const data = await Pedido.getByUser(usuarioId);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPedido = async (req, res) => {
  try {
    const usuario_id = req.usuario.id; // del token
    const { total } = req.body;

    if (!total) {
      return res.status(400).json({
        message: "El total es obligatorio"
      });
    }

    const result = await Pedido.create({
      usuario_id,
      total
    });

    res.status(201).json(result);

  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        message: "El usuario no existe"
      });
    }

    res.status(500).json({ message: error.message });
  }
};