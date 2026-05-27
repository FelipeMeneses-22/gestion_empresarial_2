const Comprobante = require('../models/comprobantes.model');

exports.getComprobantes = async (req, res) => {
  try {
    const data = await Comprobante.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createComprobante = async (req, res) => {
  try {
    const { pedido_id } = req.body;

    if (!pedido_id) {
      return res.status(400).json({
        message: "pedido_id es obligatorio"
      });
    }

    const result = await Comprobante.create(req.body);
    res.status(201).json(result);

  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        message: "El pedido no existe"
      });
    }

    res.status(500).json({ message: error.message });
  }
};