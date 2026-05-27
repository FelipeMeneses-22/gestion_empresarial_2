// src/controllers/comprobantes.controller.js
const Comprobante = require('../models/comprobantes.model');

exports.getComprobantes = async (req, res) => {
  try {
    const data = await Comprobante.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComprobante = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Comprobante.getById(id);
    if (!data) return res.status(404).json({ message: "Comprobante no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createComprobante = async (req, res) => {
  try {
    const { id_pedido, numero_factura, metodo_pago } = req.body;
    if (!id_pedido || !numero_factura || !metodo_pago) {
      return res.status(400).json({
        message: "id_pedido, numero_factura y metodo_pago son obligatorios"
      });
    }
    const result = await Comprobante.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ message: "El pedido no existe" });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.updateComprobante = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Comprobante.update(id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComprobante = async (req, res) => {
  try {
    const { id } = req.params;
    await Comprobante.delete(id);
    res.json({ message: "Comprobante eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
