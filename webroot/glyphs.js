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
