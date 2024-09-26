// app.js

const express = require('express');
const app = express();

// Importar as rotas
const marcaRoutes = require('./routes/marcaRoutes');
const modeloRoutes = require('./routes/modeloRoutes');
const carroRoutes = require('./routes/carroRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const locacaoRoutes = require('./routes/locacaoRoutes');

// Usar as rotas
app.use('/marcas', marcaRoutes);
app.use('/modelos', modeloRoutes);
app.use('/carros', carroRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/locacoes', locacaoRoutes);

// Endpoint que retorna todos os dados
app.get('/tudo', async (req, res) => {
    try {
        const todasMarcas = await marcaRoutes.getMarcas();
        const todosModelos = await modeloRoutes.getModelos();
        const todosCarros = await carroRoutes.getCarros();
        const todosUsuarios = await usuarioRoutes.getUsuarios();
        const todasLocacoes = await locacaoRoutes.getLocacoes();

        const todosDados = {
            marcas: todasMarcas,
            modelos: todosModelos,
            carros: todosCarros,
            usuarios: todosUsuarios,
            locacoes: todasLocacoes,
        };

        res.json(todosDados);
    } catch (error) {
        console.error('Erro ao recuperar dados:', error);
        res.status(500).json({ message: 'Erro ao recuperar dados', error: error.message });
    }
});

// Servidor ouvindo na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
