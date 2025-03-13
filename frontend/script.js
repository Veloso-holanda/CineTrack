async function BuscarFilmes(event) {
    event.preventDefault();

    const query = document.getElementById("nome-filme").value;
    if (query.trim() === '') {
        alert("Por favor, insira um nome de filme.");
        return;

    }

    try {
        const response = await axios.get(`http://localhost:5000/search_movies?query=${query}`);
        const filmes = response.data;

        mostrarResultados(filmes);
    } catch(error) {
        console.error('Erro ao buscar filmes:', error);
        alert("Erro ao buscar filme, tente novamente.");
    }
}


function mostrarResultados(filmes) {
    const resultadosDiv = document.getElementById("resultados-filme");
    resultadosDiv.innerHTML = '';
    
    
    if (filmes.length === 0) {
        resultadosDiv.innerHTML = '<p>Nenhum filme encontrado</p>';
        return;
    }

    filmes.forEach(filme => {
        const filmeDiv = document.createElement("div");
        filmeDiv.classList.add("filme");

        filmeDiv.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="${filme.title}" width="150">
                <h3>${filme.title}</h3>
                <p><strong>Sinopse:</strong> ${filme.overview}</p>
                <p><strong>Nota IMDB:</strong> ${filme.vote_average}</p>
                <button onclick="adicionarLista(${filme.id})">Adicionar à Lista</button>
        `;
        resultadosDiv.appendChild(filmeDiv);
    });
}
