async function fetchInit() {
  try {
    const res = await fetch("/api/init", { method: "POST" });
    if (!res.ok) return;
    const msg = await res.json();
    Stats.fingerprints = msg.stats.fingerprints;
    Stats.perfects = msg.stats.perfects;
    state.username = msg.username;
    state.puzzleDate = msg.puzzleDate;
    state.playerStreak = msg.player.streak;
    if (msg.player.todaySolved) {
      state.phase = "results";
      state.cracks = msg.player.todayCracks;
    }
    render();
  } catch (e) {
    console.error("Failed to fetch init data:", e);
  }
}

async function sendSolveData(type, cracks, placements) {
  try {
    const res = await fetch("/api/solve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, cracks, placements }),
    });
    if (!res.ok) return;
    const data = await res.json();
    Stats.fingerprints = data.stats.fingerprints;
    Stats.perfects = data.stats.perfects;
  } catch (e) {
    console.error("Failed to send solve data:", e);
  }
}

const GRID_SIZE = 5;
const RULE_COUNT = 3;
const REMOVE_COUNT = 12;

const _puzzle = generatePuzzle(todayRNG(), GRID_SIZE, RULE_COUNT, REMOVE_COUNT);
const PUZZLE = _puzzle.grid;
const SOLUTION = _puzzle.solution;
const PUZZLE_RULES = _puzzle.rules;
const TRAY_GLYPHS = _puzzle.tray.map((g, i) => ({ ...g, id: i }));

const state = {
  phase: "title",
  selected: null,
  placed: {},
  cracks: 0,
  usedTray: new Set(),
  username: "archivist",
  puzzleDate: null,
  playerStreak: 0,
};

function render() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  if (state.phase === "title") {
    renderTitle(root, () => {
      state.phase = "playing";
      render();
    });
  } else if (state.phase === "playing") {
    renderPlaying(root);
  } else if (state.phase === "results") {
    renderResults(root);
  }
}

function renderPlaying(root) {
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col items-center gap-3";

  const header = document.createElement("div");
  header.className =
    "font-mono text-[13px] text-[--text-secondary] tracking-[2px]";
  header.textContent =
    state.cracks > 0
      ? "CRACKS: " + "✕".repeat(state.cracks) + "·".repeat(4 - state.cracks)
      : "PLACE THE GLYPHS";
  wrapper.appendChild(header);

  const grid = document.createElement("div");
  grid.className = "grid";

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
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

function buildPlacementsRecord() {
  const record = {};
  for (const [key, trayIdx] of Object.entries(state.placed)) {
    const g = TRAY_GLYPHS[trayIdx];
    record[key] = g.shape + ":" + g.color;
  }
  return record;
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
      sendSolveData("solved", state.cracks, buildPlacementsRecord());
    }
  } else {
    state.cracks++;
    state.selected = null;

    if (state.cracks >= 4) {
      state.phase = "results";
      sendSolveData("failed", state.cracks, buildPlacementsRecord());
    }
  }

  render();
}

function renderResults(root) {
  const placed = state.usedTray.size;
  const total = TRAY_GLYPHS.length;
  const won = placed === total;

  const container = document.createElement("div");
  container.className = "flex flex-col items-center gap-3";

  const heading = document.createElement("h1");
  heading.textContent = "The Archive";
  heading.className = "text-[64px] text-[--tan]";
  heading.style.fontFamily = "var(--font-display)";

  const statsDiv = document.createElement("div");
  statsDiv.className =
    "font-mono text-[13px] text-[--text-secondary] tracking-[2px] text-center leading-[2.2]";
  statsDiv.innerHTML = `${placed}/${total} GLYPHS PLACED<br>CRACKS: ${state.cracks}/4`;

  const shareBlock = document.createElement("div");
  shareBlock.className =
    "font-mono text-base tracking-[1px] leading-relaxed text-center whitespace-pre";
  let shareText = "";
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const key = r + "," + c;
      if (PUZZLE[r][c]) {
        shareText += "⬜";
      } else if (state.placed[key] !== undefined) {
        shareText += "🟩";
      } else {
        shareText += "🟥";
      }
    }
    shareText += "\n";
  }
  shareBlock.textContent = shareText.trim();

  const communityDiv = document.createElement("div");
  communityDiv.className =
    "font-mono text-[11px] text-[--text-secondary] tracking-[1px] text-center mt-2";
  communityDiv.textContent =
    Stats.fingerprints + " fingerprints on this page today";

  const btn = document.createElement("button");
  btn.textContent = "[ PLAY AGAIN ]";
  btn.className =
    "mt-4 py-3.5 px-13 bg-[--tan] border-none text-[--bg-primary] text-sm font-bold tracking-[4px] cursor-pointer font-mono uppercase";
  btn.addEventListener("click", () => {
    state.phase = "playing";
    state.selected = null;
    state.placed = {};
    state.cracks = 0;
    state.usedTray = new Set();
    render();
  });

  container.appendChild(heading);
  container.appendChild(statsDiv);
  container.appendChild(shareBlock);
  container.appendChild(communityDiv);
  container.appendChild(btn);
  root.appendChild(container);
}

render();
fetchInit();
