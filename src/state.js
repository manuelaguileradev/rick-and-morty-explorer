import { getFavorites } from "./favorites";

let nextUrl = null;
let currentCharacters = [];

export function setNextUrl(url) {
    nextUrl = url;
}

export function getNextUrl() {
    return nextUrl;
}

export function setCurrentCharacters(characters, append = false) {
    if (append) {
        currentCharacters = currentCharacters.concat(characters)
    } else {
        currentCharacters = characters;
    }
}

export function getCurrentCharacters() {
    return currentCharacters;
};

export function getCharacterById(id) {
    return currentCharacters.find(char => char.id === id) ?? getFavorites().find(fav => fav.id === id)
};


