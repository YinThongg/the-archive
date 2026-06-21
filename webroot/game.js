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

// -- Game State --
const state = {
  phase: "title", // 'title' | 'playing' | 'results'
};

// -- Render --
function render() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  if (state.phase === "title") {
    renderTitle(root);
  } else if (state.phase === "playing") {
    renderPlaying(root);
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
  title.textContent = "THE ARCHIVE";
  title.style.cssText = `
    font-size: 32px;
    font-weight: 300;
    letter-spacing: 12px;
    color: var(--text-primary);
  `;

  const subtitle = document.createElement("p");
  subtitle.textContent = "Decode the pattern. Place the glyphs.";
  subtitle.style.cssText = `
    font-size: 14px;
    color: var(--text-secondary);
    letter-spacing: 2px;
  `;

  const startBtn = document.createElement("button");
  startBtn.textContent = "BEGIN";
  startBtn.style.cssText = `
    margin-top: 24px;
    padding: 12px 48px;
    background: transparent;
    border: 1px solid var(--red);
    color: var(--red);
    font-size: 14px;
    letter-spacing: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: var(--font-main);
  `;
  startBtn.addEventListener("mouseenter", () => {
    startBtn.style.background = "rgba(184, 58, 45, 0.1)";
  });
  startBtn.addEventListener("mouseleave", () => {
    startBtn.style.background = "transparent";
  });
  startBtn.addEventListener("click", () => {
    state.phase = "playing";
    render();
  });

  container.appendChild(title);
  container.appendChild(subtitle);
  container.appendChild(startBtn);
  root.appendChild(container);
}

function renderPlaying(root) {
  const grid = document.createElement("div");
  grid.className = "grid";

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = row;
      cell.dataset.col = col;
      grid.appendChild(cell);
    }
  }

  root.appendChild(grid);
}

// -- Boot --
render();
