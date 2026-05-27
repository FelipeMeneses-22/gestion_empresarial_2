// src/controllers/productos.controller.js
const Producto = require('../models/productos.model');

exports.getProductos = async (req, res) => {
  try {
    const data = await Producto.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Producto.getById(id);
    if (!data) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProducto = async (req, res) => {
  try {
    const { nombre, precio_venta, id_categoria } = req.body;
    if (!nombre || !precio_venta || !id_categoria) {
      return res.status(400).json({
        message: "Nombre, precio_venta e id_categoria son obligatorios"
      });
    }
    const result = await Producto.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ message: "La categoría no existe" });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Producto.update(id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await Producto.delete(id);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).json({
        message: "No puedes eliminar este producto porque tiene registros asociados"
      });
    }
    res.status(500).json({ message: error.message });
  }
};
