const capsuleService = require('../services/capsule.service');

// Cria uma nova cápsula no banco de dados
exports.createCapsule = async (req, res) => {
    try {
        const { name, message, image_url, open_year } = req.body;

        // Validações básicas
        if (!name || !message || !open_year) {
            return res.status(400).json({ error: 'Nome, mensagem e ano são obrigatórios' });
        }

        const newCapsule = await capsuleService.insertCapsule({ name, message, image_url, open_year });
        res.status(201).json(newCapsule);
    } catch (err) {
        console.error('Erro ao criar cápsula:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Lista cápsulas cujo ano de abertura chegou
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
