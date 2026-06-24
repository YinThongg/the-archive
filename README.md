# Gotglyphed

A daily deduction puzzle game built for Reddit's "Games with a Hook" Hackathon.

Players study a partially-filled 5×5 grid of glyphs, deduce the hidden rule governing placement, and place remaining glyphs correctly — with limited chances.

## Stack

- **Platform:** Devvit Web (Interactive Posts)
- **Frontend:** Vanilla JS (web-view iframe)
- **Persistence:** Devvit Redis
- **Deadline:** July 15, 2026

## Project Structure

```
├── devvit.json          # Devvit app config
├── src/
│   └── server.ts        # Devvit server — Redis, Reddit API, HTTP endpoints
└── webroot/
    ├── index.html       # HTML shell loaded inside the iframe
    ├── game.js          # Game logic
    └── styles/
        └── game.css     # Styling
```

## Development

```bash
npm run build && devvit playtest r/gotglyphed_dev   # Build & test on Reddit
npx serve webroot -l 3000                           # Local frontend preview
```
