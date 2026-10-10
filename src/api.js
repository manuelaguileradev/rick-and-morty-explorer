const BASE_URL = "https://rickandmortyapi.com/api/character"

export async function getAllCharacters(name = "", status = "", nextUrl = null) {

    let url;

    if (nextUrl) {
        url = nextUrl
    } else {
        const params = new URLSearchParams()
        if (name) params.append('name', name);
        if (status) params.append('status', status);
        url = `${BASE_URL}?${params.toString()}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Something went wrong: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}