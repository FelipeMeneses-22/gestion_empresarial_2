const express = require('express');
const app = express();

// Middleware para leer JSON
app.use(express.json());

// ==========================
// RUTAS DEL SISTEMA
// ==========================

// Categorías
const categoriasRouter = require('./routes/categorias.routes');
app.use('/api/categorias', categoriasRouter);

// Productos
const productosRouter = require('./routes/productos.routes');
app.use('/api/productos', productosRouter);

// Usuarios
const usuariosRouter = require('./routes/usuarios.routes');
app.use('/api/usuarios', usuariosRouter);

// Pedidos
const pedidosRouter = require('./routes/pedidos.routes');
app.use('/api/pedidos', pedidosRouter);

// Detalles de pedidos
const detallesRouter = require('./routes/detalles.routes');
app.use('/api/detalle', detallesRouter);

// Comprobantes
const comprobantesRouter = require('./routes/comprobantes.routes');
app.use('/api/comprobante', comprobantesRouter);

// Inventario
const inventarioRouter = require('./routes/inventarios.routes');
app.use('/api/inventario', inventarioRouter);

// ==========================
// EXPORTAR APP
// ==========================
module.exports = app;