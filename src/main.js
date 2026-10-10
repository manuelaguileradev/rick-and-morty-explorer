import { getAllCharacters } from "./api";
import {
  renderCharacters,
  showCharacterDetails,
  showEndOfResults,
  showError,
  showLoading,
} from "./ui";
import {
  setNextUrl,
  getNextUrl,
  setCurrentCharacters,
  getCurrentCharacters,
  getCharacterById,
} from "./state";
import { addFavorite, removeFavorite, isFavorite, getFavorites } from "./favorites";
import "./styles/main.scss";

const inputName = document.querySelector("#character-search");
const selectStatus = document.querySelector("#select-status");
const searchButton = document.querySelector("#character-search-button");
const form = document.querySelector("#search-form");
const loadMoreButton = document.querySelector("#load-more-button");
const charactersGrid = document.querySelector("#characters-grid");
const favoritesButton = document.querySelector("#show-favorites-button");


let showingFavorites = false;

async function init() {
  showLoading();
  try {
    const data = await getAllCharacters();
    renderCharacters(data.results);
    setCurrentCharacters(data.results);
    setNextUrl(data.info.next);
  } catch (error) {
    showError(error.message);
  }
}

init();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = inputName.value;
  const status = selectStatus.value;
  showLoading();
  try {
    const data = await getAllCharacters(name, status);
    renderCharacters(data.results);
    setCurrentCharacters(data.results);
    setNextUrl(data.info.next);
    loadMoreButton.disabled = false;
  } catch (error) {
    showError(error.message);
  }
});

charactersGrid.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest(".favorite-button");

  if (favoriteButton) {
    const card = favoriteButton.closest("article");
    const id = Number(card.dataset.id);
    const character = getCharacterById(id);

    if (isFavorite(id)) {
      removeFavorite(id);
      favoriteButton.classList.remove("favorited");
      if (showingFavorites) renderCharacters(getFavorites());
    } else {
      addFavorite(character);
      favoriteButton.classList.add("favorited");
    }
    return; // so it doeesn't keep running the rest of the code
  }

  const card = event.target.closest("article");

  if (!card) return;

  const id = Number(card.dataset.id);

  const character = getCharacterById(id);

  showCharacterDetails(character);
});

loadMoreButton.addEventListener("click", async () => {
  const nextUrl = getNextUrl();

  if (!nextUrl) {
    showEndOfResults();
    return;
  }

  try {
    const data = await getAllCharacters("", "", nextUrl);
    renderCharacters(data.results, true);
    setCurrentCharacters(data.results, true);
    setNextUrl(data.info.next);
  } catch (error) {
    showError(error.message);
  }
});

favoritesButton.addEventListener("click", () => {
  if (showingFavorites) {
    renderCharacters(getCurrentCharacters());
    favoritesButton.textContent = "Show Favorites";
    loadMoreButton.style.display = "block";
    inputName.style.display = "inline";
    selectStatus.style.display = "inline";
    searchButton.style.display = "inline"
  } else {
    renderCharacters(getFavorites());
    favoritesButton.textContent = "Go Back";
    loadMoreButton.style.display = "none";
    inputName.style.display = "none";
    selectStatus.style.display = "none";
    searchButton.style.display = "none"
  }
  showingFavorites = !showingFavorites;
})
