// Importações principais
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Inicializar variáveis de ambiente do .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// Middlewares globais
app.use(cors());                // Permite conexões externas (como o frontend)
app.use(express.json());        // Permite tratar JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })); // Permite tratar formulários

// Importar rotas principais
const capsuleRoutes = require('./routes/capsule.routes');

// Usar rotas com prefixo /api/capsules
app.use('/api/capsules', capsuleRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.send('Servidor da Cápsula do Tempo está a correr com sucesso 🚀');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});
