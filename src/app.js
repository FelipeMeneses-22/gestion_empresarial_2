const express = require('express');
const app = express();
require('dotenv').config(); // IMPORTANTE* (JWT y variables)

// Middleware para leer JSON
app.use(express.json());

// ==========================
// RUTAS DEL SISTEMA
// ==========================

// Categorías
app.use('/api/categorias', require('./routes/categorias.routes'));

// Productos
app.use('/api/productos', require('./routes/productos.routes'));

// Usuarios
app.use('/api/usuarios', require('./routes/usuarios.routes'));

// Pedidos
app.use('/api/pedidos', require('./routes/pedidos.routes'));

// Detalles
app.use('/api/detalles', require('./routes/detalles.routes')); // plural

// Comprobantes
app.use('/api/comprobantes', require('./routes/comprobantes.routes')); // plural

// Inventario
app.use('/api/inventario', require('./routes/inventarios.routes'));

// ==========================
// EXPORTAR APP
// ==========================
module.exports = app;