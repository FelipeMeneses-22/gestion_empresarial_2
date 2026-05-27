// src/routes/inventarios.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/inventarios.controller');

router.get('/', controller.getMovimientos);
router.get('/:id', controller.getMovimiento);
router.post('/', controller.createMovimiento);
router.put('/:id', controller.updateMovimiento);
router.delete('/:id', controller.deleteMovimiento);

module.exports = router;
