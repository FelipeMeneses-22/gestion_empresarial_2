// src/controllers/pedidos.controller.js
const Pedido = require('../models/pedidos.model');

exports.getPedidos = async (req, res) => {
  try {
    const data = await Pedido.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Pedido.getById(id);
    if (!data) return res.status(404).json({ message: "Pedido no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPedido = async (req, res) => {
  try {
    const { id_usuario, total } = req.body;
    if (!id_usuario || total === undefined) {
      return res.status(400).json({
        message: "id_usuario y total son obligatorios"
      });
    }
    const result = await Pedido.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ message: "El usuario no existe" });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Pedido.update(id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePedido = async (req, res) => {
  try {
    const { id } = req.params;
    await Pedido.delete(id);
    res.json({ message: "Pedido eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
