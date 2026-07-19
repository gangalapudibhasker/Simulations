# Maths Lab — Simulations by Class

A small static site for posting interactive maths simulations, organised by class (6–10). No build step, no framework — just HTML, CSS and one shared data file.

**Live structure:**
- `index.html` — home page with a tile for each class, showing how many simulations are posted
- `class-6.html` … `class-10.html` — one page per class, listing its simulations as cards
- `sims-data.js` — the single file you edit to add, remove, or rename simulations
- `styles.css` — shared styling (graph-paper background, notebook-style cards)
- `quadratic-explorer.html` — an example simulation (Class 9) showing the expected format

## Adding a new simulation

1. Add your simulation as its own `.html` file in this folder (or link out to one hosted elsewhere).
2. Open `sims-data.js` and add one line to the array for the right class:

   ```js
   9: [
     { title: "Quadratic Explorer", chapter: "Ch 4 · Quadratic Equations", description: "Drag the sliders for a, b and c and watch the parabola and its roots move live.", url: "quadratic-explorer.html" },
     { title: "Your New Simulation", chapter: "Ch 6 · Lines and Angles", description: "One line describing what it does.", url: "your-file.html" },
   ],
   ```
3. Save. The class page listing and the home page's simulation count update automatically — nothing else to touch.

Each entry supports:

| Field         | Required | Notes                                              |
|---------------|----------|-----------------------------------------------------|
| `title`       | yes      | Shown as the card heading                          |
| `url`         | yes      | Local filename or a full `https://` link            |
| `description` | no       | One line shown under the title                     |
| `chapter`     | no       | Small tag above the title, e.g. `"Ch 4 · ..."`      |

A class with no entries yet shows a "nothing posted" placeholder instead of a blank page.

## Adding or changing a class

Class blurbs (the one-line description shown on each home tile) live at the top of `sims-data.js` in `CLASS_INFO`. To support a class outside 6–10, add it there and to `SIMULATIONS`, then copy `class-9.html` to `class-<N>.html` — the script inside reads its own class number from the `CLASS_NUM` constant near the bottom of the file, so just update that one number.

## Running locally

No install needed. Either open `index.html` directly in a browser, or serve the folder so relative links behave exactly as they will in production:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

This is a static site, so any static host works:

- **Netlify** — drag the project folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect this GitHub repo for auto-deploys on every push.
- **GitHub Pages** — in the repo settings, enable Pages for the `main` branch (root folder).

## Tech

Plain HTML/CSS/JS. Fonts (Fraunces, IBM Plex Sans, IBM Plex Mono) load from Google Fonts via CDN. No dependencies, no build tools.
