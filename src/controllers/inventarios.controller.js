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

    // Validaciones
    if (!producto_id || !tipo || !cantidad) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios"
      });
    }

    // Validar tipo 
    if (!['entrada', 'salida'].includes(tipo)) {
      return res.status(400).json({
        message: "El tipo debe ser 'entrada' o 'salida'"
      });
    }

    // No usar req.body completo (privado - más seguro)
    const result = await Inventario.create({
      producto_id,
      tipo,
      cantidad
    });

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