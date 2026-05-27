const Detalle = require('../models/detalles.model');

exports.getDetalles = async (req, res) => {
  try {
    const data = await Detalle.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDetalle = async (req, res) => {
  try {
    const { pedido_id, producto_id, cantidad } = req.body;

    if (!pedido_id || !producto_id || !cantidad) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios"
      });
    }

    const result = await Detalle.create(req.body);
    res.status(201).json(result);

  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        message: "Pedido o producto no existe"
      });
    }

    res.status(500).json({ message: error.message });
  }
};