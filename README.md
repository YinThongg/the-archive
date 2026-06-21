# The Archive

A daily deduction puzzle game built for Reddit's "Games with a Hook" Hackathon.

Players study a partially-filled 5×5 grid of glyphs, deduce the hidden rule governing placement, and place remaining glyphs correctly — with limited chances.

## Stack

- **Platform:** Devvit Web (Interactive Posts)
- **Frontend:** Vanilla JS (web-view iframe)
- **Persistence:** Devvit Redis
- **Deadline:** July 15, 2026

## Project Structure

```
├── devvit.yaml          # Devvit app manifest
├── src/
│   └── main.tsx         # Devvit backend — creates Reddit post + web-view
└── webroot/
    ├── index.html       # HTML shell loaded inside the iframe
    ├── game.js          # Game logic
    └── styles/
        └── game.css     # Styling
```

## Development

```bash
npx serve webroot -l 3000    # Local preview
devvit play                  # Preview inside Reddit (requires devvit login)
```
