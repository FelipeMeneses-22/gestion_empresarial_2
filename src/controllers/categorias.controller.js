const Categoria = require('../models/categorias.model');

// Obtener todas (público)
exports.getCategorias = async (req, res) => {
  try {
    const data = await Categoria.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una (público)
exports.getCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID requerido" });
    }

    const data = await Categoria.getById(id);

    if (!data) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear (privado)
exports.createCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const result = await Categoria.create({ nombre });

    res.status(201).json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar (privado)
exports.updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const result = await Categoria.update(id, { nombre });

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar (privado)
exports.deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    await Categoria.delete(id);

    res.json({ message: "Categoría eliminada" });

  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).json({
        message: "No puedes eliminar esta categoría porque tiene productos asociados"
      });
    }

    res.status(500).json({ message: error.message });
  }
};