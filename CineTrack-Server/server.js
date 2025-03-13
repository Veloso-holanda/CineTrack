require('dotenv').config();



const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5000;

const TMDB_API_KEY = process.env.TMDB_API_KEY

app.use(express.static('frontend'));

app.get('/search_movies', async (req,res) => {
    const query = req.query.query;

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}&language=pt-BR`);
        const filmes = response.data.results;


        res.json(filmes.map(filme => ({
            id: filme.id,
            title: filme.title,
            overview: filme.overview,
            poster_path: filme.poster_path,
            vote_average: filme.vote_average
        })));

    } catch (error) {
        res.status(500).json({message: 'Erro ao buscar filme', error: error.message});
    }
});

app.listen(PORT,() => {
    console.log(`Servidor rodando na porta ${PORT}`)
});