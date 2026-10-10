import { isFavorite } from "./favorites";

const charactersGrid = document.getElementById('characters-grid');
const loadMoreButton = document.getElementById("load-more-button");

export function renderCharacters(characters, append = false) {
    if (!append) {
        charactersGrid.innerHTML = ""
    }

    for (const char of characters) {
        const card = document.createElement("article");
        card.classList.add("card-character");
        card.dataset.id = char.id;

        const img = document.createElement('img');
        img.src = char.image;
        img.alt = char.name;
        const name = document.createElement('p');
        name.textContent = char.name;
        const status = document.createElement('p');
        status.textContent = `Status: ${char.status}`;
        const species = document.createElement('p');
        species.textContent = `Species: ${char.species}`;

        const favoriteButton = document.createElement('button');
        favoriteButton.classList.add('favorite-button');
        favoriteButton.textContent = '★';
        if (isFavorite(char.id)) {
            favoriteButton.classList.add('favorited');
        }

        const detailDiv = document.createElement('div');
        detailDiv.classList.add("character-details");
        detailDiv.style.display = "none"

        card.append(img, name, status, species, detailDiv, favoriteButton);
        charactersGrid.append(card);
    }
}

export function showError(message) {
    charactersGrid.innerHTML = `<p class="error">${message}</p>`;
}

export function showLoading() {
    charactersGrid.innerHTML = `<p class="loading">Loading characters...</p>`;
}

export function showEndOfResults() {
    charactersGrid.innerHTML += `<p class="end">End of results</p>`;
    loadMoreButton.disabled = true;
}

export function showCharacterDetails(character) {
    const card = charactersGrid.querySelector(`[data-id="${character.id}"]`);
    const detailDiv = card.querySelector('div.character-details')

    const episodeNumbers = character.episode.map(url => url.split('/').pop()).join(', ')

    detailDiv.innerHTML = `
        <p>Gender: ${character.gender}</p>
        <p>Origin: ${character.origin.name}</p>
        <p>Location: ${character.location.name}</p>
        <p>Episodes: ${episodeNumbers}</p>
    `;

    detailDiv.style.display = detailDiv.style.display === "none" ? "block" : "none";
}