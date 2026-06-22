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
  red: "#b83a2d",
  teal: "#5b9a8b",
  gold: "#d4a843",
  purple: "#8b6aad",
};

const SHAPES = {
  circle: (color) =>
    `<svg class="glyph" viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" fill="none" stroke="${color}" stroke-width="2.5"/></svg>`,
  triangle: (color) =>
    `<svg class="glyph" viewBox="0 0 32 32"><polygon points="16,4 28,27 4,27" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
  diamond: (color) =>
    `<svg class="glyph" viewBox="0 0 32 32"><polygon points="16,3 29,16 16,29 3,16" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
  star: (color) =>
    `<svg class="glyph" viewBox="0 0 32 32"><polygon points="16,3 19.5,12 29,12 21.5,18.5 24,28 16,22 8,28 10.5,18.5 3,12 12.5,12" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round"/></svg>`,
};

function glyphSVG(shape, color) {
  return SHAPES[shape](COLORS[color]);
}

// A hardcoded first puzzle for testing.
// null = empty cell, object = pre-filled clue { shape, color }.
const PUZZLE = [
  [
    { shape: "circle", color: "red" },
    null,
    { shape: "triangle", color: "teal" },
    null,
    { shape: "star", color: "gold" },
  ],
  [
    null,
    { shape: "diamond", color: "purple" },
    null,
    { shape: "circle", color: "teal" },
    null,
  ],
  [
    { shape: "diamond", color: "gold" },
    null,
    { shape: "circle", color: "purple" },
    null,
    { shape: "triangle", color: "red" },
  ],
  [
    null,
    { shape: "star", color: "teal" },
    null,
    { shape: "diamond", color: "red" },
    null,
  ],
  [
    { shape: "star", color: "purple" },
    null,
    { shape: "triangle", color: "gold" },
    null,
    { shape: "circle", color: "red" },
  ],
];

// The correct answer for every cell (including pre-filled ones).
// Used to check if a player's placement is right.
const SOLUTION = [
  [
    { shape: "circle", color: "red" },
    { shape: "star", color: "purple" },
    { shape: "triangle", color: "teal" },
    { shape: "diamond", color: "gold" },
    { shape: "star", color: "gold" },
  ],
  [
    { shape: "triangle", color: "gold" },
    { shape: "diamond", color: "purple" },
    { shape: "star", color: "red" },
    { shape: "circle", color: "teal" },
    { shape: "diamond", color: "teal" },
  ],
  [
    { shape: "diamond", color: "gold" },
    { shape: "circle", color: "red" },
    { shape: "circle", color: "purple" },
    { shape: "star", color: "teal" },
    { shape: "triangle", color: "red" },
  ],
  [
    { shape: "circle", color: "teal" },
    { shape: "star", color: "teal" },
    { shape: "diamond", color: "gold" },
    { shape: "diamond", color: "red" },
    { shape: "star", color: "purple" },
  ],
  [
    { shape: "star", color: "purple" },
    { shape: "triangle", color: "red" },
    { shape: "triangle", color: "gold" },
    { shape: "circle", color: "purple" },
    { shape: "circle", color: "red" },
  ],
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
  phase: "title", // 'title' | 'playing' | 'results'
  selected: null, // index into TRAY_GLYPHS (which glyph is picked)
  placed: {}, // "row,col" → tray glyph id (what the player has placed)
  cracks: 0, // wrong placements (4 = game over)
  usedTray: new Set(), // tray glyph ids that have been correctly placed
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

// -- Lofi CRT Animation Data --
const CRT = {
  paths: {
    frameBg:
      "M31.7116 21.6234C326.766 -23.6543 430.193 21.6234 619.196 21.6234C619.196 21.6234 645.5 121.026 645.5 145.487V263.105C645.5 308.431 637.102 361 637.102 361C635.031 381.78 633.429 390.907 628.5 402.5L619.196 417L304 428L78.5001 444.5C76.2516 444.328 75.241 442.396 73.5001 438.5L71.5001 430.208C60.2981 431.028 53.109 431.5 50.6119 431.5C31.7116 431.5 -35.4891 178.794 31.7116 21.6234Z",
    s1: "M620.464 30.8574C440.574 30.8574 342.133 -14.9468 61.3033 30.8574C-2.65762 189.856 61.3033 445.5 79.2923 445.5C97.2814 445.5 371.116 418.123 620.464 418.123C620.464 418.123 645.5 396.764 645.5 275.146V156.161C645.5 131.416 620.464 30.8574 620.464 30.8574Z",
    s7: "M606.82 37.8333C426.82 37.8333 328.32 -5.66666 47.3201 37.8333C-16.6795 188.833 47.3201 431.617 65.3201 431.617C83.3201 431.617 357.32 405.617 606.82 405.617C606.82 405.617 631.871 385.333 631.871 269.833V156.833C631.871 133.333 606.82 37.8333 606.82 37.8333Z",
    s5: "M589.82 37.8333C409.82 37.8333 311.32 -5.66666 30.3201 37.8333C-33.6795 188.833 30.3201 431.617 48.3201 431.617C66.3201 431.617 340.32 405.617 589.82 405.617C589.82 405.617 614.871 385.333 614.871 269.833V156.833C614.871 133.333 589.82 37.8333 589.82 37.8333Z",
    s3: "M589.82 20.8333C409.82 20.8333 311.32 -22.6667 30.3201 20.8333C-33.6795 171.833 30.3201 414.617 48.3201 414.617C66.3201 414.617 340.32 388.617 589.82 388.617C589.82 388.617 614.871 368.333 614.871 252.833V139.833C614.871 116.333 589.82 20.8333 589.82 20.8333Z",
    screen:
      "M64.5001 408.5C27.1763 262.55 20.8907 185.046 62.5006 41.5C217.973 13.3948 347.856 21.3051 590.5 41.5C635.48 216.454 606 392.5 590.5 384C575 375.5 64.5001 408.5 64.5001 408.5Z",
  },
  rain: [
    [86, 56, 1.8, 0.0, 0.55],
    [130, 46, 2.1, 0.72, 0.45],
    [174, 62, 1.7, 1.35, 0.6],
    [220, 42, 2.3, 0.41, 0.4],
    [264, 55, 1.9, 1.78, 0.55],
    [308, 68, 2.0, 0.93, 0.5],
    [352, 44, 1.8, 0.28, 0.6],
    [394, 58, 2.2, 1.54, 0.45],
    [436, 51, 1.7, 0.62, 0.55],
    [478, 64, 2.1, 1.15, 0.5],
    [520, 38, 1.9, 0.18, 0.45],
    [562, 56, 2.0, 1.44, 0.55],
    [108, 71, 2.1, 0.82, 0.5],
    [196, 48, 1.8, 1.62, 0.6],
    [286, 63, 2.3, 0.54, 0.4],
    [376, 53, 1.7, 1.03, 0.55],
    [456, 70, 2.0, 0.09, 0.5],
    [538, 60, 1.9, 1.82, 0.45],
    [142, 44, 2.2, 0.31, 0.55],
    [330, 66, 1.8, 1.22, 0.5],
    [500, 50, 2.1, 0.67, 0.45],
    [74, 80, 1.9, 1.1, 0.4],
  ],
  stars: [
    [78, 64, 1.2],
    [116, 48, 0.8],
    [162, 74, 1.5],
    [225, 54, 0.9],
    [278, 68, 1.3],
    [322, 58, 0.7],
    [370, 44, 1.4],
    [412, 71, 1.0],
    [455, 54, 1.6],
    [498, 68, 0.8],
    [542, 48, 1.2],
    [100, 86, 0.9],
    [190, 44, 1.4],
    [310, 38, 1.0],
    [440, 61, 0.8],
    [563, 80, 1.3],
    [76, 92, 0.7],
    [232, 82, 1.1],
    [418, 88, 0.9],
    [544, 92, 1.0],
  ],
  windows: [
    [64, 268, 1],
    [72, 276, 0],
    [64, 286, 1],
    [80, 264, 1],
    [104, 254, 1],
    [112, 261, 0],
    [104, 271, 1],
    [112, 278, 1],
    [130, 284, 1],
    [138, 274, 0],
    [224, 274, 1],
    [232, 264, 1],
    [240, 256, 0],
    [248, 264, 1],
    [256, 251, 1],
    [240, 274, 0],
    [304, 264, 1],
    [312, 271, 1],
    [390, 266, 1],
    [398, 258, 0],
    [408, 261, 1],
    [416, 254, 1],
    [408, 274, 0],
    [432, 264, 1],
    [452, 268, 1],
    [460, 261, 0],
    [474, 254, 1],
    [502, 266, 1],
    [510, 258, 0],
    [508, 274, 1],
    [544, 251, 1],
    [552, 261, 0],
    [560, 268, 1],
    [568, 258, 1],
  ],
  buildings: [
    [54, 278, 22, 169],
    [50, 264, 11, 183],
    [75, 291, 18, 156],
    [91, 268, 26, 179],
    [88, 256, 9, 191],
    [116, 282, 19, 165],
    [134, 274, 16, 173],
    [148, 288, 23, 159],
    [170, 266, 14, 181],
    [182, 280, 21, 167],
    [204, 274, 17, 173],
    [220, 258, 27, 189],
    [217, 246, 9, 201],
    [246, 270, 16, 177],
    [260, 282, 21, 165],
    [280, 262, 19, 185],
    [298, 276, 14, 171],
    [310, 266, 23, 181],
    [332, 280, 17, 167],
    [348, 264, 25, 183],
    [372, 274, 12, 173],
    [384, 278, 19, 169],
    [402, 264, 27, 183],
    [399, 251, 9, 196],
    [428, 274, 16, 173],
    [442, 266, 21, 181],
    [462, 254, 17, 193],
    [478, 268, 14, 179],
    [490, 261, 25, 186],
    [514, 276, 19, 171],
    [532, 252, 16, 195],
    [546, 268, 23, 179],
    [568, 262, 17, 185],
    [584, 274, 12, 173],
  ],
};

let titleIntervals = [];

function renderTitle(root) {
  // Clean up any running intervals from previous render
  titleIntervals.forEach(clearInterval);
  titleIntervals = [];

  // -- CSS animations --
  const style = document.createElement("style");
  style.textContent = `
    @keyframes twinkle { 0%,100%{opacity:0.9} 50%{opacity:0.12} }
    @keyframes float-note { 0%,100%{transform:translateY(0) rotate(-5deg);opacity:0.65} 50%{transform:translateY(-10px) rotate(4deg);opacity:0.92} }
  `;
  root.appendChild(style);

  // -- Override root/body bg for title screen --
  document.body.style.background = "#414A42";
  document.getElementById("root").style.padding = "0";

  // -- Outer wrapper --
  const wrapper = document.createElement("div");
  wrapper.style.cssText =
    "width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;background:#414A42;";

  // -- SVG container --
  const svgWrap = document.createElement("div");
  svgWrap.style.cssText =
    "width:min(50vw,90vh);aspect-ratio:647/447;flex-shrink:0;position:relative;";

  // -- Build SVG --
  const P = CRT.paths;
  let starsSvg = CRT.stars
    .map(
      ([cx, cy, r], i) =>
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#dbd6c2" style="animation:twinkle ${1.3 + ((i * 0.43) % 1.6)}s ease-in-out ${(i * 0.29) % 2.1}s infinite"/>`,
    )
    .join("");

  let rainSvg = CRT.rain
    .map(
      ([x, y0, dur, beg, op]) =>
        `<line x1="${x}" y1="${y0}" x2="${x - 2.5}" y2="${y0 + 14}" stroke="#78b0c6" stroke-width="0.75" stroke-opacity="${op}" stroke-linecap="round"><animateTransform attributeName="transform" type="translate" from="0 ${-y0 - 16}" to="0 ${452 - y0}" dur="${dur}s" begin="-${beg}s" repeatCount="indefinite"/></line>`,
    )
    .join("");

  let buildingsSvg = CRT.buildings
    .map(
      ([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`,
    )
    .join("");

  let windowsSvg = CRT.windows
    .map(
      ([x, y, warm]) =>
        `<rect x="${x}" y="${y}" width="4" height="5" fill="${warm ? "#f3cc55" : "#86b4dc"}" opacity="${warm ? 0.68 : 0.34}"/>`,
    )
    .join("");

  const notesSvg = [
    [530, 348, 18, 1, "0s"],
    [558, 328, 13, 0.55, "1.7s"],
    [510, 322, 10, 0.38, "3.1s"],
    [572, 358, 9, 0.3, "2.3s"],
  ]
    .map(
      ([x, y, sz, op, del]) =>
        `<text x="${x}" y="${y}" fill="#50b870" font-size="${sz}" font-family="serif" opacity="${op}" style="animation:float-note 4.6s ease-in-out ${del} infinite">${sz > 15 ? "♪" : sz > 11 ? "♫" : "♩"}</text>`,
    )
    .join("");

  const svgContent = `
    <svg viewBox="0 0 647 447" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">
      <defs>
        <filter id="boil" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence id="boilTurb" type="turbulence" baseFrequency="0.013 0.019" numOctaves="3" seed="1" result="t"/>
          <feDisplacementMap in="SourceGraphic" in2="t" scale="5.8" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
        <filter id="bloom" x="-12%" y="-12%" width="124%" height="124%">
          <feGaussianBlur stdDeviation="1.8" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="phosphor" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" result="b"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.04  0 0 0 0 0.84  0 0 0 0 0.24  0 0 0 0.40 0" in="b" result="col"/>
          <feMerge><feMergeNode in="col"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="crtStatic" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence id="staticTurb" type="fractalNoise" baseFrequency="0.78" numOctaves="4" seed="1" result="n"/>
          <feColorMatrix type="saturate" values="0" in="n" result="gn"/>
          <feBlend in="SourceGraphic" in2="gn" mode="screen" result="bl"/>
          <feComposite in="bl" in2="SourceGraphic" operator="in"/>
        </filter>
        <filter id="grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.64" numOctaves="4" stitchTiles="stitch" result="gn"/>
          <feColorMatrix type="saturate" values="0" in="gn" result="mono"/>
          <feBlend in="SourceGraphic" in2="mono" mode="overlay" result="blend"/>
          <feComposite in="blend" in2="SourceGraphic" operator="in"/>
        </filter>
        <clipPath id="sc"><path d="${P.screen}"/></clipPath>
        <radialGradient id="vignette" cx="50%" cy="50%" r="60%">
          <stop offset="22%" stop-color="transparent"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.93)"/>
        </radialGradient>
        <radialGradient id="edgeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="68%" stop-color="rgba(8,44,22,0)"/>
          <stop offset="100%" stop-color="rgba(6,40,18,0.62)"/>
        </radialGradient>
        <pattern id="lines" x="0" y="0" width="1" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="2" width="647" height="2" fill="rgba(0,0,0,0.14)"/>
        </pattern>
      </defs>

      <path d="${P.frameBg}" fill="#DCC9A9" filter="url(#grain)"/>

      <g clip-path="url(#sc)">
        <rect x="0" y="0" width="647" height="447" fill="#04080b"/>
        <rect x="0" y="245" width="647" height="202" fill="#05090c"/>
        ${starsSvg}
        ${rainSvg}
        <g fill="#030609">${buildingsSvg}</g>
        <rect x="0" y="372" width="647" height="75" fill="#020508"/>
        <rect x="0" y="370" width="647" height="5" fill="#091410"/>
        <ellipse cx="210" cy="394" rx="60" ry="7" fill="#0c2818" opacity="0.55"/>
        <ellipse cx="450" cy="398" rx="44" ry="5.5" fill="#ece0ba" opacity="0.05"/>
        <ellipse cx="510" cy="394" rx="32" ry="4" fill="#ece0ba" opacity="0.09"/>
        ${windowsSvg}
        ${notesSvg}
        <rect x="0" y="0" width="647" height="447" fill="url(#lines)"/>
        <rect x="0" y="0" width="647" height="447" fill="url(#edgeGlow)"/>
        <rect x="0" y="0" width="647" height="447" fill="url(#vignette)"/>
        <rect id="staticRect" x="0" y="0" width="647" height="447" fill="#0a1612" opacity="0.09" filter="url(#crtStatic)"/>
        <rect id="flickerRect" x="0" y="0" width="647" height="447" fill="black" opacity="0.01"/>
      </g>

      <g filter="url(#boil)">
        <path d="${P.s1}" stroke="#1F1F1F" stroke-width="3" fill="none"/>
        <path d="${P.s7}" stroke="#1F1F1F" stroke-width="7" fill="none" filter="url(#bloom)"/>
        <path d="${P.s5}" stroke="#1F1F1F" stroke-width="5" fill="none"/>
        <path d="${P.s3}" stroke="#1F1F1F" stroke-width="3" fill="none"/>
      </g>

      <path d="${P.screen}" fill="none" stroke="rgba(14,175,65,0.13)" stroke-width="2" filter="url(#phosphor)"/>

      <foreignObject x="64" y="42" width="520" height="370">
        <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:32px;">
          <h1 style="font-size:60px;font-weight:400;letter-spacing:2px;color:#dcc9a9;font-family:'Jersey 15',sans-serif;text-shadow:0 0 20px rgba(184,58,45,0.4),0 0 50px rgba(184,58,45,0.15);text-align:center;margin:0;">The Archive</h1>
          <div style="width:40px;height:2px;background:#b83a2d;opacity:0.6;"></div>
          <button id="beginBtn" style="padding:10px 40px;background:rgba(184,58,45,0.85);border:none;border-radius:20px;;color:#dcc9a9;font-size:16px;font-weight:700;letter-spacing:4px;cursor:pointer;font-family:'Courier New',monospace;text-transform:uppercase;">[ BEGIN ]</button>
        </div>
      </foreignObject>
    </svg>
  `;

  svgWrap.innerHTML = svgContent;

  // -- Wire up BEGIN button inside SVG foreignObject --
  const startBtn = svgWrap.querySelector("#beginBtn");
  startBtn.addEventListener("mouseenter", () => {
    startBtn.style.background = "rgba(154, 47, 36, 0.9)";
  });
  startBtn.addEventListener("mouseleave", () => {
    startBtn.style.background = "rgba(184, 58, 45, 0.85)";
  });
  startBtn.addEventListener("click", () => {
    titleIntervals.forEach(clearInterval);
    titleIntervals = [];
    document.body.style.background = "";
    document.getElementById("root").style.padding = "";
    state.phase = "playing";
    render();
  });

  wrapper.appendChild(svgWrap);

  // -- Paper grain overlay --
  const grain = document.createElement("div");
  grain.style.cssText = `
    position:absolute;inset:0;pointer-events:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='0.5'/%3E%3C/svg%3E");
    background-size:200px 200px;background-repeat:repeat;opacity:0.22;mix-blend-mode:overlay;
  `;
  wrapper.appendChild(grain);
  root.appendChild(wrapper);

  // -- Animate: line boil (~12fps) --
  let boilSeed = 1;
  const boilEl = svgWrap.querySelector("#boilTurb");
  titleIntervals.push(
    setInterval(() => {
      boilSeed = (boilSeed % 97) + 1;
      if (boilEl) boilEl.setAttribute("seed", boilSeed);
    }, 82),
  );

  // -- Animate: static noise (~24fps) --
  let staticSeed = 1;
  const staticEl = svgWrap.querySelector("#staticTurb");
  titleIntervals.push(
    setInterval(() => {
      staticSeed = (staticSeed % 9973) + 1;
      if (staticEl) staticEl.setAttribute("seed", staticSeed);
    }, 42),
  );

  // -- Animate: CRT flicker --
  const flickerEl = svgWrap.querySelector("#flickerRect");
  function flickerPulse() {
    const v = Math.random() < 0.05 ? 0.2 : Math.random() < 0.12 ? 0.06 : 0.01;
    if (flickerEl) flickerEl.setAttribute("opacity", v);
    const t = setTimeout(flickerPulse, 35 + Math.random() * 290);
    titleIntervals.push(t);
  }
  titleIntervals.push(setTimeout(flickerPulse, 500));
}

function renderPlaying(root) {
  const wrapper = document.createElement("div");
  wrapper.style.cssText =
    "display:flex; flex-direction:column; align-items:center; gap:20px;";

  // -- Crack counter --
  const header = document.createElement("div");
  header.style.cssText =
    "font-family:var(--font-main); font-size:13px; color:var(--text-secondary); letter-spacing:2px;";
  header.textContent =
    state.cracks > 0
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
  const placed = state.usedTray.size;
  const total = TRAY_GLYPHS.length;

  const container = document.createElement("div");
  container.style.cssText =
    "display:flex; flex-direction:column; align-items:center; gap:20px;";

  const heading = document.createElement("h1");
  heading.textContent = "The Archive";
  heading.style.cssText = `
    font-size: 64px;
    font-family: var(--font-display);
    color: var(--tan);
  `;

  const stats = document.createElement("div");
  stats.style.cssText =
    "font-family:var(--font-main); font-size:13px; color:var(--text-secondary); letter-spacing:2px; text-align:center; line-height:2.2;";
  stats.innerHTML = `${placed}/${total} GLYPHS PLACED<br>CRACKS: ${state.cracks}/4`;

  // Shareable result (like Wordle's grid of squares)
  const shareBlock = document.createElement("div");
  shareBlock.style.cssText =
    "font-family:var(--font-main); font-size:16px; letter-spacing:1px; line-height:1.6; text-align:center;";
  let shareText = "";
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
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
  shareBlock.style.whiteSpace = "pre";

  const btn = document.createElement("button");
  btn.textContent = "[ PLAY AGAIN ]";
  btn.style.cssText = `
    margin-top: 16px;
    padding: 14px 52px;
    background: var(--tan);
    border: none;
    color: var(--bg-primary);
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
  container.appendChild(shareBlock);
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
