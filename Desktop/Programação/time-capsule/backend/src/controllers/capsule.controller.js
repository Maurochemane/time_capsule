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
