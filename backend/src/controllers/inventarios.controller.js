// src/controllers/inventarios.controller.js
const Inventario = require('../models/inventarios.model');

exports.getMovimientos = async (req, res) => {
  try {
    const data = await Inventario.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Inventario.getById(id);
    if (!data) return res.status(404).json({ message: "Movimiento no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMovimiento = async (req, res) => {
  try {
    const { id_producto, id_usuario, tipo, cantidad } = req.body;
    if (!id_producto || !id_usuario || !tipo || !cantidad) {
      return res.status(400).json({
        message: "id_producto, id_usuario, tipo y cantidad son obligatorios"
      });
    }
    const result = await Inventario.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ message: "El producto o usuario no existe" });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.updateMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Inventario.update(id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    await Inventario.delete(id);
    res.json({ message: "Movimiento eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
