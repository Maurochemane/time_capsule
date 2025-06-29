const capsuleService = require('../services/capsule.service');

exports.createCapsule = async (req, res) => {
  try {
    const { name, message, open_year } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !message || !open_year) {
      return res.status(400).json({ error: 'Nome, mensagem e ano são obrigatórios' });
    }

    const newCapsule = await capsuleService.insertCapsule({
      name,
      message,
      image_url,
      open_year
    });

    res.status(201).json(newCapsule);
  } catch (err) {
    console.error('Erro ao criar cápsula:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.getOpenCapsules = async (req, res) => {
  try {
    const yearNow = new Date().getFullYear();
    const capsules = await capsuleService.getCapsulesToOpen(yearNow);
    res.status(200).json(capsules);
  } catch (err) {
    console.error('Erro ao obter cápsulas:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

