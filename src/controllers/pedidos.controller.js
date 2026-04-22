const Pedido = require('../models/pedidos.model');

exports.getPedidos = async (req, res) => {
  try {
    const data = await Pedido.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPedido = async (req, res) => {
  try {
    const { usuario_id, total } = req.body;

    if (!usuario_id || !total) {
      return res.status(400).json({
        message: "usuario_id y total son obligatorios"
      });
    }

    const result = await Pedido.create(req.body);
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