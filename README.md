# Rick and Morty Explorer

A web app for searching and browsing characters from *Rick and Morty*. It uses the public [Rick and Morty API](https://rickandmortyapi.com/) and is built with vanilla JavaScript and Vite.

**Live demo:** [manuelaguileradev.github.io/rick-and-morty-explorer](https://manuelaguileradev.github.io/rick-and-morty-explorer/) · **Status:** in progress

![Screenshot of Rick and Morty Explorer](./docs/screenshot.png)

---

## Features

- **Search by name.** Find any character by typing part of their name.
- **Filter by status.** Combine the search with a filter for Alive, Dead or Unknown.
- **Load more.** Fetch the next page of results without losing the active filters.
- **Character details.** Click a card to show or hide gender, origin, current location and the episodes the character appears in.
- **Loading, error and end-of-results states.** The user always gets clear feedback.

## Tech stack

| Area | Tools |
|------|-------|
| Language | JavaScript (ES modules) |
| Build tool / dev server | [Vite](https://vite.dev/) |
| Data | [Rick and Morty REST API](https://rickandmortyapi.com/documentation) via `fetch` |
| Styling | CSS (SASS planned) |

No frameworks and no runtime dependencies. The goal was to master DOM manipulation, async/await and modular code before moving to React.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20.19 or newer (required by Vite)
- npm (comes with Node.js)

### Installation

```bash
git clone https://github.com/manuelaguileradev/rick-and-morty-explorer.git
cd rick-and-morty-explorer
npm install
npm run dev
```

Then open the URL Vite prints in the terminal (usually `http://localhost:5173`).

### Available scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Starts the dev server with hot reload |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Serves the production build locally |

## Project structure

```
├── index.html        # Page layout: header, search form, results grid
├── src/
│   ├── main.js       # Entry point: wires events to API, state and UI
│   ├── api.js        # Builds the request URL and calls the API
│   ├── state.js      # Keeps the loaded characters and the next-page URL
│   ├── ui.js         # Renders cards, details, loading and error messages
│   └── assets/       # Logo and background image
└── sass/             # Styles (in progress)
```

The code is split by responsibility. `api.js` only talks to the network, `ui.js` only touches the DOM, and `state.js` is the single source of truth for the data on screen. `main.js` connects the three.

## How it works

1. On load, the app requests `GET /api/character` and renders the first 20 characters.
2. When you submit the form, `api.js` builds the query with `URLSearchParams`. For example:
   ```
   https://rickandmortyapi.com/api/character?name=rick&status=alive
   ```
3. Every API response includes `info.next`, the URL of the next page with the same filters. The app stores it in `state.js`, and **Load More** requests that exact URL. That way pagination never loses the active search.
4. The character cards are rendered from the stored data. Clicking a card looks up the character by `id` in the state, so the details open without another request.

## Troubleshooting

| Symptom | Likely cause | How to fix or check |
|---------|--------------|---------------------|
| `Something went wrong: 404` after a search | The API returns **404 Not Found** when no character matches the name and status combination. Nothing is broken. | Check the spelling or set the filter to *All Status*. You can confirm in DevTools → **Network**: the request shows status `404` with the body `{"error":"There is nothing here"}`. |
| Nothing loads and there is no error message | The page was opened directly from the file system (`file://`). Vite modules need a dev server. | Run `npm run dev` and use the `localhost` URL. |
| `Something went wrong: 429` | Too many requests to the API in a short time (rate limiting). | Wait a few seconds and try again. |
| `TypeError: Failed to fetch` in the Console | No internet connection, or the API is down. | Open [the API endpoint](https://rickandmortyapi.com/api/character) in a new tab. If it doesn't load, the problem is not in the app. |
| `npm run dev` fails with a Node version error | Vite requires a recent Node.js version. | Run `node -v` and update to 20.19 or newer. |
| 404 for `favicon.svg` in the Network tab | The favicon file has not been added to `public/` yet. | Harmless; see the roadmap below. |

## Roadmap

- [ ] Favorites saved in `localStorage`
- [ ] Full responsive design with SASS (mobile grid instead of 5 fixed columns)
- [ ] Friendly "No characters found" message instead of the raw 404 error
- [ ] Add the favicon and an accessible focus style for the cards
- [x] Deploy to GitHub Pages

## What I learned

- Consuming a paginated REST API and reusing `info.next` instead of building page numbers by hand.
- Reading HTTP status codes (`200`, `404`, `429`) and turning them into messages for the user.
- Separating code into modules (API, state, UI) so each part is easier to test and debug.
- Event delegation: one click listener on the grid handles every card, including ones added later.

## Credits

- Data and images from [The Rick and Morty API](https://rickandmortyapi.com/) by Axel Fuhrmann.
- *Rick and Morty* is created by Justin Roiland and Dan Harmon and owned by Adult Swim. This is a non-commercial learning project.

## Author

**Manuel Aguilera** · [GitHub](https://github.com/manuelaguileradev) · [LinkedIn](https://www.linkedin.com/in/manuelaguileradev)
