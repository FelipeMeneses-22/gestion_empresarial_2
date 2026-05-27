// src/controllers/detalles.controller.js
const Detalle = require('../models/detalles.model');

exports.getDetalles = async (req, res) => {
  try {
    const data = await Detalle.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDetallesByPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Detalle.getByPedido(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDetalle = async (req, res) => {
  try {
    const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
    if (!id_pedido || !id_producto || !cantidad || !precio_unitario) {
      return res.status(400).json({
        message: "id_pedido, id_producto, cantidad y precio_unitario son obligatorios"
      });
    }
    // Calcular sub_total si no viene
    const sub_total = req.body.sub_total || (cantidad * precio_unitario);
    const result = await Detalle.create({ ...req.body, sub_total });
    res.status(201).json(result);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ message: "Pedido o producto no existe" });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.updateDetalle = async (req, res) => {
  try {
    const { id } = req.params;
    const sub_total = req.body.sub_total ||
      (req.body.cantidad && req.body.precio_unitario
        ? req.body.cantidad * req.body.precio_unitario
        : undefined);
    const result = await Detalle.update(id, { ...req.body, sub_total });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDetalle = async (req, res) => {
  try {
    const { id } = req.params;
    await Detalle.delete(id);
    res.json({ message: "Detalle eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
