const Categoria = require('../models/categorias.model');

exports.getCategorias = async (req, res) => {
  try {
    const data = await Categoria.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Categoria.getById(id);

    if (!data) return res.status(404).json({ message: "Categoría no encontrada" });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const result = await Categoria.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Categoria.update(id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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