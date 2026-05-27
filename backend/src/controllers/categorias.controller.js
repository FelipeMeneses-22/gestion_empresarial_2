const Categoria = require('../models/categorias.model');

exports.getCategorias = async (req, res) => {
  try {
    res.json(await Categoria.getAll());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategoria = async (req, res) => {
  try {
    const data = await Categoria.getById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCategoria = async (req, res) => {
  try {
    // Acepta tanto 'nombre_categoria' como 'nombre' (compatibilidad frontend)
    const nombre_categoria = req.body.nombre_categoria || req.body.nombre;
    const { descripcion } = req.body;
    if (!nombre_categoria) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }
    const result = await Categoria.create({ nombre_categoria, descripcion });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCategoria = async (req, res) => {
  try {
    const nombre_categoria = req.body.nombre_categoria || req.body.nombre;
    const { descripcion } = req.body;
    const result = await Categoria.update(req.params.id, { nombre_categoria, descripcion });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCategoria = async (req, res) => {
  try {
    await Categoria.delete(req.params.id);
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).json({ message: 'No puedes eliminar esta categoría porque tiene productos asociados' });
    }
    res.status(500).json({ message: error.message });
  }
};
