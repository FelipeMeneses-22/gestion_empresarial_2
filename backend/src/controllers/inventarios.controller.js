const Inventario = require('../models/inventarios.model');

exports.getMovimientos = async (req, res) => {
  try {
    const data = await Inventario.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMovimiento = async (req, res) => {
  try {
    const { producto_id, tipo, cantidad } = req.body;

    if (!producto_id || !tipo || !cantidad) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios"
      });
    }

    const result = await Inventario.create(req.body);
    res.status(201).json(result);

  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        message: "El producto no existe"
      });
    }

    res.status(500).json({ message: error.message });
  }
};