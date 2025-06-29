const express = require('express');
const router = express.Router();

const capsuleController = require('../controllers/capsule.controller');
const upload = require('../middleware/upload');

// A rota agora processa upload de imagem
router.post('/', upload.single('image'), capsuleController.createCapsule);
router.get('/open', capsuleController.getOpenCapsules);

module.exports = router;
