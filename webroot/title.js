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

const BURST_PALETTES = [
  { line: "#d4a843", fill: "#d4a843", dot: "#feffe0" },
  { line: "#962D28", fill: "#b5185f", dot: "#feffe0" },
  { line: "#35c1c2", fill: "#d0e86e", dot: "#feffe0" },
  { line: "#b5185f", fill: "#331234", dot: "#d0e86e" },
];

const SPARK_COLORS = [
  "#d4a843",
  "#35c1c2",
  "#b5185f",
  "#d0e86e",
  "#962D28",
  "#feffe0",
];

const SVG_NS = "http://www.w3.org/2000/svg";

const SPARK_MAKERS = [
  function (x, y, color) {
    const g = document.createElementNS(SVG_NS, "g");
    const len = 4 + Math.random() * 3;
    [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ].forEach(([dx, dy]) => {
      const l = document.createElementNS(SVG_NS, "line");
      l.setAttribute("x1", x);
      l.setAttribute("y1", y);
      l.setAttribute("x2", x + dx * len);
      l.setAttribute("y2", y + dy * len);
      l.setAttribute("stroke", color);
      l.setAttribute("stroke-width", "1.5");
      l.setAttribute("stroke-linecap", "round");
      g.appendChild(l);
    });
    return g;
  },
  function (x, y, color) {
    const s = 3 + Math.random() * 2;
    const p = document.createElementNS(SVG_NS, "polygon");
    p.setAttribute(
      "points",
      `${x},${y - s} ${x + s * 0.6},${y} ${x},${y + s} ${x - s * 0.6},${y}`,
    );
    p.setAttribute("fill", color);
    p.setAttribute("opacity", "0.9");
    return p;
  },
  function (x, y, color) {
    const g = document.createElementNS(SVG_NS, "g");
    const count = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      const c = document.createElementNS(SVG_NS, "circle");
      c.setAttribute("cx", x + (Math.random() - 0.5) * 10);
      c.setAttribute("cy", y + (Math.random() - 0.5) * 10);
      c.setAttribute("r", 1 + Math.random() * 1.5);
      c.setAttribute("fill", color);
      c.setAttribute("opacity", String(0.6 + Math.random() * 0.4));
      g.appendChild(c);
    }
    return g;
  },
  function (x, y, color) {
    const l = document.createElementNS(SVG_NS, "line");
    const angle = Math.random() * Math.PI;
    const len = 4 + Math.random() * 5;
    l.setAttribute("x1", x - Math.cos(angle) * len);
    l.setAttribute("y1", y - Math.sin(angle) * len);
    l.setAttribute("x2", x + Math.cos(angle) * len);
    l.setAttribute("y2", y + Math.sin(angle) * len);
    l.setAttribute("stroke", color);
    l.setAttribute("stroke-width", String(1 + Math.random()));
    l.setAttribute("stroke-linecap", "round");
    return l;
  },
];

let titleIntervals = [];

function cleanupTitle() {
  titleIntervals.forEach(clearInterval);
  titleIntervals = [];
}

function renderTitle(root, onStart) {
  cleanupTitle();

  document.body.style.background = "#414A42";
  document.getElementById("root").style.padding = "0";

  const wrapper = document.createElement("div");
  wrapper.className =
    "w-screen h-screen flex items-center justify-center overflow-hidden relative bg-[#414A42]";

  const svgWrap = document.createElement("div");
  svgWrap.className = "shrink-0 relative";
  svgWrap.style.cssText = "width:min(85vw,60vh);aspect-ratio:647/680;";

  const P = CRT.paths;
  const starsSvg = CRT.stars
    .map(
      ([cx, cy, r], i) =>
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#dbd6c2" style="animation:twinkle ${1.3 + ((i * 0.43) % 1.6)}s ease-in-out ${(i * 0.29) % 2.1}s infinite"/>`,
    )
    .join("");

  const rainSvg = CRT.rain
    .map(
      ([x, y0, dur, beg, op]) =>
        `<line x1="${x}" y1="${y0}" x2="${x - 2.5}" y2="${y0 + 14}" stroke="#78b0c6" stroke-width="0.75" stroke-opacity="${op}" stroke-linecap="round"><animateTransform attributeName="transform" type="translate" from="0 ${-y0 - 16}" to="0 ${452 - y0}" dur="${dur}s" begin="-${beg}s" repeatCount="indefinite"/></line>`,
    )
    .join("");

  const buildingsSvg = CRT.buildings
    .map(
      ([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`,
    )
    .join("");

  const windowsSvg = CRT.windows
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

  svgWrap.innerHTML = `
    <svg viewBox="0 0 647 680" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">
      <defs>
        <filter id="boil" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence id="boilTurb" type="turbulence" baseFrequency="0.013 0.019" numOctaves="3" seed="1" result="t"/>
          <feDisplacementMap in="SourceGraphic" in2="t" scale="5.8" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
        <filter id="boil-soft" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence id="boilSoftTurb" type="turbulence" baseFrequency="0.013 0.019" numOctaves="3" seed="1" result="t"/>
          <feDisplacementMap in="SourceGraphic" in2="t" scale="2.2" xChannelSelector="R" yChannelSelector="G"/>
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
        <g id="screenSparks"></g>
      </g>

      <g filter="url(#boil)">
        <path d="${P.s1}" stroke="#1F1F1F" stroke-width="3" fill="none"/>
        <path d="${P.s7}" stroke="#1F1F1F" stroke-width="7" fill="none" filter="url(#bloom)"/>
        <path d="${P.s5}" stroke="#1F1F1F" stroke-width="5" fill="none"/>
        <path d="${P.s3}" stroke="#1F1F1F" stroke-width="3" fill="none"/>
      </g>

      <path d="${P.screen}" fill="none" stroke="rgba(14,175,65,0.13)" stroke-width="2" filter="url(#phosphor)"/>

      <g filter="url(#boil)">
        <path d="M285 447 C293 448 297 451 300 458 L305 475 C306 477 313 479 324 479 C335 479 342 477 343 475 L348 458 C351 451 355 448 363 447" stroke="#1F1F1F" stroke-width="3.5" fill="none"/>
        <path d="M275 479 C305 476 343 476 373 479 C377 480 378 483 375 485 L273 485 C270 483 271 480 275 479 Z" fill="#DCC9A9" filter="url(#grain)" stroke="#1F1F1F" stroke-width="2"/>
      </g>

      <g filter="url(#boil)">
        <path d="M100 572 C220 578 340 578 450 572 L455 586 C340 593 220 593 95 586 Z" fill="#b8a888" filter="url(#grain)"/>
        <path d="M100 572 C220 578 340 578 450 572 L455 586 C340 593 220 593 95 586 Z" stroke="#1F1F1F" stroke-width="3" fill="none"/>
        <path d="M130 500 C230 496 330 496 420 500 L450 572 C340 578 220 578 100 572 Z" fill="#DCC9A9" filter="url(#grain)"/>
        <path d="M130 500 C230 496 330 496 420 500 L450 572 C340 578 220 578 100 572 Z" stroke="#1F1F1F" stroke-width="4" fill="none"/>
        <path d="M130 500 C230 496 330 496 420 500 L450 572 C340 578 220 578 100 572 Z" stroke="#1F1F1F" stroke-width="2" fill="none" filter="url(#bloom)"/>
      </g>

      <g filter="url(#boil)">
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          .map((i) => {
            const x = 155 + i * 20 + Math.sin(i * 1.7) * 1.0;
            return `<rect x="${x}" y="509" width="15" height="10" rx="1.5" fill="#c4b797" stroke="#1F1F1F" stroke-width="1.5"/><line x1="${x + 1}" y1="519" x2="${x + 14}" y2="519" stroke="#1F1F1F" stroke-width="2" opacity="0.5"/>`;
          })
          .join("")}
      </g>
      <g filter="url(#boil)">
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
          .map((i) => {
            const x = 146 + i * 22 + Math.cos(i * 2.1) * 0.9;
            return `<rect x="${x}" y="524" width="16" height="11" rx="1.5" fill="#c4b797" stroke="#1F1F1F" stroke-width="1.5"/><line x1="${x + 1}" y1="535" x2="${x + 15}" y2="535" stroke="#1F1F1F" stroke-width="2" opacity="0.5"/>`;
          })
          .join("")}
      </g>
      <g filter="url(#boil)">
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          .map((i) => {
            const x = 140 + i * 24 + Math.sin(i * 1.3) * 0.8;
            return `<rect x="${x}" y="540" width="18" height="11" rx="1.5" fill="#c4b797" stroke="#1F1F1F" stroke-width="1.5"/><line x1="${x + 1}" y1="551" x2="${x + 17}" y2="551" stroke="#1F1F1F" stroke-width="2" opacity="0.5"/>`;
          })
          .join("")}
      </g>
      <g filter="url(#boil)">
        ${[0, 1, 2]
          .map((i) => {
            const x = 134 + i * 27 + Math.cos(i * 2.5) * 0.7;
            return `<rect x="${x}" y="556" width="20" height="11" rx="1.5" fill="#c4b797" stroke="#1F1F1F" stroke-width="1.5"/><line x1="${x + 1}" y1="567" x2="${x + 19}" y2="567" stroke="#1F1F1F" stroke-width="2" opacity="0.5"/>`;
          })
          .join("")}
        <rect x="220" y="556" width="118" height="11" rx="2.5" fill="#c4b797" stroke="#1F1F1F" stroke-width="1.5"/>
        <line x1="221" y1="567" x2="337" y2="567" stroke="#1F1F1F" stroke-width="2" opacity="0.5"/>
        ${[0, 1, 2]
          .map((i) => {
            const x = 346 + i * 27 + Math.sin(i * 1.9) * 0.6;
            return `<rect x="${x}" y="556" width="20" height="11" rx="1.5" fill="#c4b797" stroke="#1F1F1F" stroke-width="1.5"/><line x1="${x + 1}" y1="567" x2="${x + 19}" y2="567" stroke="#1F1F1F" stroke-width="2" opacity="0.5"/>`;
          })
          .join("")}
      </g>

      <g filter="url(#boil)">
        <path d="M484 580 C490 582 534 582 540 580 L543 594 C536 598 492 598 485 594 Z" fill="#b8a888" filter="url(#grain)"/>
        <path d="M484 580 C490 582 534 582 540 580 L543 594 C536 598 492 598 485 594 Z" stroke="#1F1F1F" stroke-width="2.5" fill="none"/>
        <path d="M490 522 C494 514 530 514 534 522 L540 580 C534 582 490 582 484 580 Z" fill="#DCC9A9" filter="url(#grain)"/>
        <path d="M490 522 C494 514 530 514 534 522 L540 580 C534 582 490 582 484 580 Z" stroke="#1F1F1F" stroke-width="3.5" fill="none"/>
        <path d="M490 522 C494 514 530 514 534 522 L540 580 C534 582 490 582 484 580 Z" stroke="#1F1F1F" stroke-width="2" fill="none" filter="url(#bloom)"/>
        <line x1="512" y1="518" x2="512" y2="550" stroke="#1F1F1F" stroke-width="1.5"/>
        <ellipse cx="512" cy="530" rx="3" ry="5" fill="none" stroke="#1F1F1F" stroke-width="1.2"/>
      </g>

      <g filter="url(#boil)">
        <path d="M512 515 C514 504 510 496 492 490 C476 484 456 482 434 480" stroke="#1F1F1F" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>

      <g id="clickBurst" opacity="0">
        <line class="burst-line" x1="536" y1="510" x2="548" y2="498" stroke-width="3" stroke-linecap="round"/>
        <line class="burst-line" x1="542" y1="520" x2="558" y2="516" stroke-width="2.5" stroke-linecap="round"/>
        <line class="burst-line" x1="538" y1="530" x2="553" y2="536" stroke-width="2" stroke-linecap="round"/>
        <polygon class="burst-fill" points="552,504 555,498 558,504 554,501 550,501"/>
        <polygon class="burst-fill" points="562,518 564,514 566,518 564,516 560,516" opacity="0.8"/>
        <circle class="burst-dot" cx="548" cy="508" r="1.5"/>
        <circle class="burst-dot" cx="556" cy="524" r="1.2"/>
      </g>

      <g id="clickBurst2" opacity="0">
        <line class="burst-line" x1="538" y1="506" x2="556" y2="490" stroke-width="2.5" stroke-linecap="round"/>
        <line class="burst-line" x1="546" y1="518" x2="568" y2="512" stroke-width="2" stroke-linecap="round"/>
        <line class="burst-line" x1="540" y1="532" x2="560" y2="542" stroke-width="1.5" stroke-linecap="round"/>
        <polygon class="burst-fill" points="560,496 564,488 568,496 564,492 556,492" opacity="0.6"/>
        <circle class="burst-dot" cx="554" cy="502" r="1.2" opacity="0.6"/>
        <circle class="burst-dot" cx="564" cy="528" r="1" opacity="0.5"/>
      </g>

      <path id="mouseBtnPress" d="M490 522 C494 514 512 514 512 518 L512 550 C506 552 490 552 484 550 Z" fill="rgba(0,0,0,0.15)" opacity="0"/>

      <g filter="url(#boil-soft)">
        <text x="324" y="200" text-anchor="middle" fill="#dcc9a9" font-family="'Jersey 15', sans-serif" font-size="60" font-weight="700" letter-spacing="2" style="paint-order:stroke fill;" stroke="rgba(220,201,169,0.3)" stroke-width="1">The Archive</text>
      </g>
      <line x1="304" y1="222" x2="344" y2="222" stroke="#b83a2d" stroke-width="2" opacity="0.6" filter="url(#boil-soft)"/>

      <g id="beginBtn" style="cursor:pointer" filter="url(#boil)">
        <path d="M270 298 C272 295 290 292 324 291 C350 290 370 291 378 293 C384 294 386 296 387 301 C388 306 387 318 386 322 C385 326 382 328 376 329 C368 330 348 331 324 331 C298 331 280 330 274 328 C269 326 267 323 267 318 C266 312 268 302 270 298 Z" fill="rgba(184,58,45,0.85)"/>
        <path d="M272 299 C274 294 294 291 324 290 C356 289 378 292 383 296 C387 300 388 310 387 320 C386 326 382 329 374 330 C362 332 340 332 324 332 C304 332 282 331 274 328 C268 325 266 318 267 310 C268 303 270 299 272 299 Z" fill="none" stroke="#dcc9a9" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M275 300 C278 295 298 293 324 292 C352 291 374 293 380 297 C384 301 385 312 384 320 C383 325 379 327 372 328 C360 330 342 330 324 330 C306 330 286 329 278 327 C272 325 270 320 270 312 C270 305 272 300 275 300 Z" fill="none" stroke="#dcc9a9" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>
        <path d="M285 304 C282 306 281 310 282 314 C283 318 284 320 287 322" fill="none" stroke="#dcc9a9" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M363 304 C366 306 367 310 366 314 C365 318 364 320 361 322" fill="none" stroke="#dcc9a9" stroke-width="1.8" stroke-linecap="round"/>
        <text x="324" y="317" text-anchor="middle" fill="#dcc9a9" font-family="'Jersey 15', sans-serif" font-size="22" letter-spacing="4" style="text-transform:uppercase;">BEGIN</text>
      </g>
    </svg>
  `;

  function applyBurstColor(palette) {
    svgWrap
      .querySelectorAll(".burst-line")
      .forEach((el) => el.setAttribute("stroke", palette.line));
    svgWrap
      .querySelectorAll(".burst-fill")
      .forEach((el) => el.setAttribute("fill", palette.fill));
    svgWrap
      .querySelectorAll(".burst-dot")
      .forEach((el) => el.setAttribute("fill", palette.dot));
  }

  function playMouseClick(onDone) {
    const palette =
      BURST_PALETTES[Math.floor(Math.random() * BURST_PALETTES.length)];
    applyBurstColor(palette);

    const burst1 = svgWrap.querySelector("#clickBurst");
    const burst2 = svgWrap.querySelector("#clickBurst2");
    const btnPress = svgWrap.querySelector("#mouseBtnPress");

    if (btnPress) btnPress.setAttribute("opacity", "1");
    if (burst1) burst1.setAttribute("opacity", "1");

    setTimeout(() => {
      if (btnPress) btnPress.setAttribute("opacity", "0");
      if (burst1) burst1.setAttribute("opacity", "0");
      if (burst2) burst2.setAttribute("opacity", "1");
    }, 120);

    setTimeout(() => {
      if (burst2) burst2.setAttribute("opacity", "0");
      if (onDone) onDone();
    }, 280);
  }

  const screenSparksEl = svgWrap.querySelector("#screenSparks");

  function spawnScreenSparks() {
    const count = 3 + Math.floor(Math.random() * 3);
    const sparks = [];
    for (let i = 0; i < count; i++) {
      const x = 100 + Math.random() * 440;
      const y = 60 + Math.random() * 320;
      const color =
        SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];
      const maker =
        SPARK_MAKERS[Math.floor(Math.random() * SPARK_MAKERS.length)];
      const el = maker(x, y, color);
      screenSparksEl.appendChild(el);
      sparks.push(el);
    }
    setTimeout(() => {
      sparks.forEach((el) => el.setAttribute("opacity", "0.4"));
    }, 100);
    setTimeout(() => {
      sparks.forEach((el) => el.remove());
    }, 200);
  }

  wrapper.addEventListener("click", (e) => {
    if (e.target.closest("#beginBtn")) return;
    playMouseClick();
    spawnScreenSparks();
  });

  const startBtn = svgWrap.querySelector("#beginBtn");
  const btnFill = startBtn.querySelector("path");
  startBtn.addEventListener("mouseenter", () => {
    btnFill.setAttribute("fill", "rgba(96, 30, 22, 0.95)");
  });
  startBtn.addEventListener("mouseleave", () => {
    btnFill.setAttribute("fill", "rgba(184,58,45,0.85)");
  });
  startBtn.addEventListener("click", () => {
    const paths = startBtn.querySelectorAll("path");
    paths.forEach((p) => {
      if (
        p.getAttribute("fill") &&
        p.getAttribute("fill").includes("184,58,45")
      ) {
        p.setAttribute("fill", "rgba(130,38,30,0.95)");
      }
      if (p.getAttribute("stroke-width")) {
        p.setAttribute(
          "stroke-width",
          String(parseFloat(p.getAttribute("stroke-width")) + 0.8),
        );
      }
    });
    const txt = startBtn.querySelector("text");
    if (txt) txt.setAttribute("fill", "#c4b48a");

    playMouseClick(() => {
      cleanupTitle();
      document.body.style.background = "";
      document.getElementById("root").style.padding = "";
      onStart();
    });
  });

  wrapper.appendChild(svgWrap);

  const grain = document.createElement("div");
  grain.className =
    "absolute inset-0 pointer-events-none opacity-[0.22] mix-blend-overlay bg-repeat";
  grain.style.cssText = `
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='0.5'/%3E%3C/svg%3E");
    background-size:200px 200px;
  `;
  wrapper.appendChild(grain);
  root.appendChild(wrapper);

  let boilSeed = 1;
  const boilEl = svgWrap.querySelector("#boilTurb");
  const boilSoftEl = svgWrap.querySelector("#boilSoftTurb");
  titleIntervals.push(
    setInterval(() => {
      boilSeed = (boilSeed % 97) + 1;
      if (boilEl) boilEl.setAttribute("seed", boilSeed);
      if (boilSoftEl) boilSoftEl.setAttribute("seed", boilSeed);
    }, 82),
  );

  let staticSeed = 1;
  const staticEl = svgWrap.querySelector("#staticTurb");
  titleIntervals.push(
    setInterval(() => {
      staticSeed = (staticSeed % 9973) + 1;
      if (staticEl) staticEl.setAttribute("seed", staticSeed);
    }, 42),
  );

  const flickerEl = svgWrap.querySelector("#flickerRect");
  function flickerPulse() {
    const v =
      Math.random() < 0.05 ? 0.2 : Math.random() < 0.12 ? 0.06 : 0.01;
    if (flickerEl) flickerEl.setAttribute("opacity", v);
    const t = setTimeout(flickerPulse, 35 + Math.random() * 290);
    titleIntervals.push(t);
  }
  titleIntervals.push(setTimeout(flickerPulse, 500));
}
