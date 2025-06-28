const express = require('express');
const router = express.Router();

// Controlador com a lógica de negócio
const capsuleController = require('../controllers/capsule.controller');

// Rota POST: Criar uma nova cápsula
router.post('/', capsuleController.createCapsule);

// Rota GET: Listar cápsulas cujo ano de abertura chegou ou passou
router.get('/open', capsuleController.getOpenCapsules);

module.exports = router;
