// const express = require('express');
// const router = express.Router();

// const capsuleController = require('../controllers/capsule.controller');
// const upload = require('../middleware/upload');

// // A rota agora processa upload de imagem
// router.post('/', upload.single('image'), capsuleController.createCapsule);
// router.get('/open', capsuleController.getOpenCapsules);

// module.exports = router;

const express = require('express');
const router = express.Router();

const capsuleController = require('../controllers/capsule.controller'); // CORRETO
const upload = require('../middleware/upload');

router.post('/', upload.single('image'), capsuleController.createCapsule);
router.get('/open', capsuleController.getOpenCapsules); // <-- deve ser uma função

module.exports = router;
