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

    if (!data) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProducto = async (req, res) => {
  try {
    const { nombre, precio, categoria_id } = req.body;

    //  Validaciones
    if (!nombre || !precio || !categoria_id) {
      return res.status(400).json({
        message: "Nombre, precio y categoría son obligatorios"
      });
    }

    if (precio <= 0) {
      return res.status(400).json({
        message: "El precio debe ser mayor a 0"
      });
    }

    //  Seguridad: no usar req.body completo
    const result = await Producto.create({
      nombre,
      precio,
      categoria_id
    });

    res.status(201).json(result);

  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        message: "La categoría no existe"
      });
    }

    res.status(500).json({ message: error.message });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, categoria_id } = req.body;

    if (!nombre || !precio || !categoria_id) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios"
      });
    }

    const result = await Producto.update(id, {
      nombre,
      precio,
      categoria_id
    });

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
    res.status(500).json({ message: error.message });
  }
};