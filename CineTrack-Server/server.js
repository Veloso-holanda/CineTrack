require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;



app.get('/filmes', async (req,res) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'pt-br',
            }
    });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({erro: 'Erro ao buscar filme'});
    }
});

app.listen(PORT,() => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});