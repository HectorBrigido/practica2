const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const content = document.getElementById('content');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        fetchShows(searchTerm);
    }
});

searchInput.addEventListener('keypress', function(e) {
    const searchTerm = searchInput.value.trim();
    if (e.key === 'Enter') {
        fetchShows(searchTerm);
    }
});

async function fetchShows(searchTerm) {
    try {
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
        const shows = response.data;

        displayShows(shows);

    } catch (error) {
        console.error("Error fetching shows:", error);
        content.innerHTML = '<p>Error al cargar los datos. Inténtalo de nuevo.</p>';
    }
}


function displayShows(shows) {
    content.innerHTML = ''; // Limpiar resultados anteriores

    if (shows.length === 0) {
        content.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    shows.forEach(show => {
        const showInfo = show.show;
        const item = document.createElement('div');
        item.classList.add('item');

        item.innerHTML = `
            <img src="${showInfo.image ? showInfo.image.medium : 'placeholder.png'}" alt="${showInfo.name}">
            <h3>${showInfo.name}</h3>
            <p>${showInfo.summary ? showInfo.summary.replace(/<[^>]*>/g, '') : 'No hay descripción disponible.'}</p>
            <p>Idioma: ${showInfo.language}</p>
            <p>Género(s): ${showInfo.genres ? showInfo.genres.join(', ') : 'No especificado'}</p>
            <p>Estado: ${showInfo.status}</p>
        `;
        content.appendChild(item);
    });
}

