// ============================================
// The Archive — Game Entry Point
// ============================================
// This file is the starting point for the web-view.
// It runs inside an iframe embedded in a Reddit post.
//
// Architecture:
//   Reddit post → Devvit backend (src/main.tsx)
//       ↕ messages
//   Web-view iframe (this file + index.html)
// ============================================

// -- Devvit Message Bridge --
// The web-view communicates with the Devvit backend through postMessage.
// We'll expand this later to load puzzles and save scores.

function sendToDevvit(message) {
  window.parent.postMessage(message, "*");
}

window.addEventListener("message", (event) => {
  const msg = event.data?.data?.message;
  if (!msg) return;
  console.log("Message from Devvit:", msg);
});

// -- Glyphs --
// Each glyph has two properties: shape + color.
// This lets rules target either property or both.
//   Shapes: circle, triangle, diamond, star
//   Colors: red, teal, gold, purple

const COLORS = {
  red:    "#b83a2d",
  teal:   "#5b9a8b",
  gold:   "#d4a843",
  purple: "#8b6aad",
};

const SHAPES = {
  circle:   (color) => `<svg class="glyph" viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" fill="none" stroke="${color}" stroke-width="2.5"/></svg>`,
  triangle: (color) => `<svg class="glyph" viewBox="0 0 32 32"><polygon points="16,4 28,27 4,27" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
  diamond:  (color) => `<svg class="glyph" viewBox="0 0 32 32"><polygon points="16,3 29,16 16,29 3,16" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
  star:     (color) => `<svg class="glyph" viewBox="0 0 32 32"><polygon points="16,3 19.5,12 29,12 21.5,18.5 24,28 16,22 8,28 10.5,18.5 3,12 12.5,12" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round"/></svg>`,
};

function glyphSVG(shape, color) {
  return SHAPES[shape](COLORS[color]);
}

// A hardcoded first puzzle for testing.
// null = empty cell, object = pre-filled clue { shape, color }.
const PUZZLE = [
  [{ shape: "circle",   color: "red" },    null, { shape: "triangle", color: "teal" },   null, { shape: "star",     color: "gold" }],
  [null, { shape: "diamond",  color: "purple" }, null, { shape: "circle",   color: "teal" },   null],
  [{ shape: "diamond",  color: "gold" },   null, { shape: "circle",   color: "purple" }, null, { shape: "triangle", color: "red" }],
  [null, { shape: "star",     color: "teal" },   null, { shape: "diamond",  color: "red" },    null],
  [{ shape: "star",     color: "purple" }, null, { shape: "triangle", color: "gold" },   null, { shape: "circle",   color: "red" }],
];

// The correct answer for every cell (including pre-filled ones).
// Used to check if a player's placement is right.
const SOLUTION = [
  [{ shape: "circle",   color: "red" },    { shape: "star",     color: "purple" }, { shape: "triangle", color: "teal" },   { shape: "diamond",  color: "gold" },   { shape: "star",     color: "gold" }],
  [{ shape: "triangle", color: "gold" },    { shape: "diamond",  color: "purple" }, { shape: "star",     color: "red" },    { shape: "circle",   color: "teal" },   { shape: "diamond",  color: "teal" }],
  [{ shape: "diamond",  color: "gold" },    { shape: "circle",   color: "red" },    { shape: "circle",   color: "purple" }, { shape: "star",     color: "teal" },   { shape: "triangle", color: "red" }],
  [{ shape: "circle",   color: "teal" },    { shape: "star",     color: "teal" },   { shape: "diamond",  color: "gold" },   { shape: "diamond",  color: "red" },    { shape: "star",     color: "purple" }],
  [{ shape: "star",     color: "purple" },  { shape: "triangle", color: "red" },    { shape: "triangle", color: "gold" },   { shape: "circle",   color: "purple" }, { shape: "circle",   color: "red" }],
];

// The glyphs the player needs to place (one per empty cell).
// Built by collecting SOLUTION values where PUZZLE is null.
const TRAY_GLYPHS = [];
for (let r = 0; r < 5; r++) {
  for (let c = 0; c < 5; c++) {
    if (!PUZZLE[r][c]) {
      TRAY_GLYPHS.push({ ...SOLUTION[r][c], id: TRAY_GLYPHS.length });
    }
  }
}

// -- Game State --
const state = {
  phase: "title",       // 'title' | 'playing' | 'results'
  selected: null,       // index into TRAY_GLYPHS (which glyph is picked)
  placed: {},           // "row,col" → tray glyph id (what the player has placed)
  cracks: 0,            // wrong placements (4 = game over)
  usedTray: new Set(),  // tray glyph ids that have been correctly placed
};

// -- Render --
function render() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  if (state.phase === "title") {
    renderTitle(root);
  } else if (state.phase === "playing") {
    renderPlaying(root);
  } else if (state.phase === "results") {
    renderResults(root);
  }
}

function renderTitle(root) {
  const container = document.createElement("div");
  container.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  `;

  const title = document.createElement("h1");
  title.textContent = "The Archive";
  title.style.cssText = `
    font-size: 96px;
    font-weight: 400;
    letter-spacing: 2px;
    color: var(--tan);
    font-family: var(--font-display);
    text-shadow: 0 0 30px rgba(184, 58, 45, 0.3), 0 0 60px rgba(184, 58, 45, 0.1);
  `;

  const rule = document.createElement("div");
  rule.style.cssText = `
    width: 40px;
    height: 2px;
    background: var(--red);
    opacity: 0.6;
  `;

  const startBtn = document.createElement("button");
  startBtn.textContent = "[ BEGIN ]";
  startBtn.style.cssText = `
    margin-top: 24px;
    padding: 14px 52px;
    background: var(--red);
    border: none;
    color: var(--tan);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: var(--font-main);
    text-transform: uppercase;
  `;
  startBtn.addEventListener("mouseenter", () => {
    startBtn.style.background = "#9a2f24";
  });
  startBtn.addEventListener("mouseleave", () => {
    startBtn.style.background = "var(--red)";
  });
  startBtn.addEventListener("click", () => {
    state.phase = "playing";
    render();
  });

  container.appendChild(title);
  container.appendChild(rule);
  container.appendChild(startBtn);
  root.appendChild(container);
}

function renderPlaying(root) {
  const wrapper = document.createElement("div");
  wrapper.style.cssText = "display:flex; flex-direction:column; align-items:center; gap:20px;";

  // -- Crack counter --
  const header = document.createElement("div");
  header.style.cssText = "font-family:var(--font-main); font-size:13px; color:var(--text-secondary); letter-spacing:2px;";
  header.textContent = state.cracks > 0
    ? "CRACKS: " + "✕".repeat(state.cracks) + "·".repeat(4 - state.cracks)
    : "PLACE THE GLYPHS";
  wrapper.appendChild(header);

  // -- Grid --
  const grid = document.createElement("div");
  grid.className = "grid";

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const cell = document.createElement("div");
      const glyph = PUZZLE[row][col];
      const key = row + "," + col;

      if (glyph) {
        cell.className = "cell prefilled";
        cell.innerHTML = glyphSVG(glyph.shape, glyph.color);
      } else if (state.placed[key] !== undefined) {
        const pg = TRAY_GLYPHS[state.placed[key]];
        cell.className = "cell prefilled";
        cell.innerHTML = glyphSVG(pg.shape, pg.color);
      } else {
        cell.className = "cell";
        cell.addEventListener("click", () => onCellClick(row, col));
      }

      cell.dataset.row = row;
      cell.dataset.col = col;
      grid.appendChild(cell);
    }
  }
  wrapper.appendChild(grid);

  // -- Tray --
  const tray = document.createElement("div");
  tray.className = "tray";

  TRAY_GLYPHS.forEach((g, i) => {
    const item = document.createElement("div");

    if (state.usedTray.has(g.id)) {
      item.className = "tray-item used";
    } else if (state.selected === i) {
      item.className = "tray-item selected";
      item.innerHTML = glyphSVG(g.shape, g.color);
    } else {
      item.className = "tray-item";
      item.innerHTML = glyphSVG(g.shape, g.color);
      item.addEventListener("click", () => {
        state.selected = i;
        render();
      });
    }

    tray.appendChild(item);
  });
  wrapper.appendChild(tray);

  root.appendChild(wrapper);
}

function onCellClick(row, col) {
  if (state.selected === null) return;

  const glyph = TRAY_GLYPHS[state.selected];
  const answer = SOLUTION[row][col];
  const key = row + "," + col;

  if (glyph.shape === answer.shape && glyph.color === answer.color) {
    state.placed[key] = state.selected;
    state.usedTray.add(glyph.id);
    state.selected = null;

    if (state.usedTray.size === TRAY_GLYPHS.length) {
      state.phase = "results";
    }
  } else {
    state.cracks++;
    state.selected = null;

    if (state.cracks >= 4) {
      state.phase = "results";
    }
  }

  render();
}

function renderResults(root) {
  const won = state.cracks < 4;
  const score = won ? Math.max(0, 100 * TRAY_GLYPHS.length - 50 * state.cracks) : 0;

  const container = document.createElement("div");
  container.style.cssText = "display:flex; flex-direction:column; align-items:center; gap:20px;";

  const heading = document.createElement("h1");
  heading.textContent = won ? "Decoded" : "Shattered";
  heading.style.cssText = `
    font-size: 64px;
    font-family: var(--font-display);
    color: ${won ? "var(--green)" : "var(--red)"};
  `;

  const stats = document.createElement("div");
  stats.style.cssText = "font-family:var(--font-main); font-size:13px; color:var(--text-secondary); letter-spacing:2px; text-align:center; line-height:2;";
  stats.innerHTML = won
    ? `CRACKS: ${state.cracks}/4<br>SCORE: ${score}`
    : `THE ARCHIVE CRUMBLES<br>CRACKS: ${state.cracks}/4`;

  const btn = document.createElement("button");
  btn.textContent = "[ AGAIN ]";
  btn.style.cssText = `
    margin-top: 16px;
    padding: 14px 52px;
    background: ${won ? "var(--green)" : "var(--red)"};
    border: none;
    color: var(--tan);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 4px;
    cursor: pointer;
    font-family: var(--font-main);
    text-transform: uppercase;
  `;
  btn.addEventListener("click", () => {
    resetGame();
    render();
  });

  container.appendChild(heading);
  container.appendChild(stats);
  container.appendChild(btn);
  root.appendChild(container);
}

function resetGame() {
  state.phase = "playing";
  state.selected = null;
  state.placed = {};
  state.cracks = 0;
  state.usedTray = new Set();
}

// -- Boot --
render();
