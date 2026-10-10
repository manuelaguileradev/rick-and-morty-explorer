let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function save() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

export function addFavorite(character) {
    favorites.push(character);
    save();
};

export function removeFavorite(id) {
    favorites = favorites.filter(fav => fav.id !== id);
    save();
};

export function isFavorite(id) {
    return favorites.some(fav => fav.id === id);
};

export function getFavorites() {
    return favorites;
}