// ============================================
// The Archive — Puzzle Generator
// ============================================

const GLYPH_SHAPES = ["circle", "triangle", "diamond", "star"];
const GLYPH_COLORS = ["red", "teal", "gold", "purple"];

// --- RNG helpers ---

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function shuffle(rng, arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// --- Seeded RNG (mulberry32) ---
// Takes a single integer seed → returns a function that produces
// deterministic floats in [0, 1) each time you call it.
// Same seed = same sequence every time, on every device.

function createRNG(seed) {
  let s = seed | 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Turn a date string like "2026-06-23" into a stable integer seed.
// Hashes each character so different dates produce very different seeds.
function dateSeed(dateStr) {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) | 0;
  }
  return hash;
}

// Convenience: get today's RNG
function todayRNG() {
  const d = new Date();
  const str =
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0");
  return createRNG(dateSeed(str));
}

// --- Rule Picker ---
// Each template knows how to generate valid params for one rule type.
// Tagged with a "group" so we can limit how many from the same category.

const RULE_TEMPLATES = [
  // Adjacency — at most 1 picked (stacking these makes generation very hard)
  {
    type: "no-adjacent-same-color",
    group: "adjacency",
    genParams: () => null,
  },
  {
    type: "no-adjacent-same-shape",
    group: "adjacency",
    genParams: () => null,
  },
  // must-adjacent excluded: can't be validated incrementally during
  // backtracking, causing most generation failures. Needs a smarter solver.

  // Counting — safe on any grid size
  {
    type: "row-max-count",
    group: "counting",
    genParams(rng) {
      const prop = pick(rng, ["color", "shape"]);
      const values = prop === "color" ? GLYPH_COLORS : GLYPH_SHAPES;
      return {
        property: prop,
        value: pick(rng, values),
        max: 1 + Math.floor(rng() * 2),
      };
    },
  },
  {
    type: "col-max-count",
    group: "counting",
    genParams(rng) {
      const prop = pick(rng, ["color", "shape"]);
      const values = prop === "color" ? GLYPH_COLORS : GLYPH_SHAPES;
      return {
        property: prop,
        value: pick(rng, values),
        max: 1 + Math.floor(rng() * 2),
      };
    },
  },

  // Positional
  {
    type: "edge-only",
    group: "positional",
    genParams(rng) {
      const prop = pick(rng, ["color", "shape"]);
      return {
        property: prop,
        value: pick(rng, prop === "color" ? GLYPH_COLORS : GLYPH_SHAPES),
      };
    },
  },
  {
    type: "center-only",
    group: "positional",
    genParams(rng) {
      const prop = pick(rng, ["color", "shape"]);
      return {
        property: prop,
        value: pick(rng, prop === "color" ? GLYPH_COLORS : GLYPH_SHAPES),
      };
    },
  },
  {
    type: "corner-must",
    group: "positional",
    genParams(rng) {
      const prop = pick(rng, ["color", "shape"]);
      return {
        property: prop,
        value: pick(rng, prop === "color" ? GLYPH_COLORS : GLYPH_SHAPES),
      };
    },
  },

  // Relational — at most 1 exclusion rule per axis
  {
    type: "not-in-same-row",
    group: "exclusion-row",
    genParams(rng) {
      const prop = pick(rng, ["color", "shape"]);
      const vals = prop === "color" ? GLYPH_COLORS : GLYPH_SHAPES;
      const v1 = pick(rng, vals);
      const v2 = pick(
        rng,
        vals.filter((v) => v !== v1),
      );
      return { property: prop, value1: v1, value2: v2 };
    },
  },
  {
    type: "not-in-same-col",
    group: "exclusion-col",
    genParams(rng) {
      const prop = pick(rng, ["color", "shape"]);
      const vals = prop === "color" ? GLYPH_COLORS : GLYPH_SHAPES;
      const v1 = pick(rng, vals);
      const v2 = pick(
        rng,
        vals.filter((v) => v !== v1),
      );
      return { property: prop, value1: v1, value2: v2 };
    },
  },
  {
    type: "diagonal-no-same",
    group: "diagonal",
    genParams(rng) {
      return { property: pick(rng, ["color", "shape"]) };
    },
  },
];

// NOTE: row-unique-color/shape and col-unique-color/shape are excluded
// because a full 5×5 grid has 5 cells per line but only 4 possible values.
// They'll be added when we support grids with blocked cells.

// Check if a newly picked rule contradicts any already-picked rules.
function hasConflict(picked, candidate) {
  for (const existing of picked) {
    // edge-only + center-only on the same property+value = impossible
    if (
      (existing.type === "edge-only" && candidate.type === "center-only") ||
      (existing.type === "center-only" && candidate.type === "edge-only")
    ) {
      const ep = existing.params;
      const cp = candidate.params;
      if (ep.property === cp.property && ep.value === cp.value) return true;
    }

    // corner-must(X) + center-only(X) = corners are edges, can't be center
    if (
      (existing.type === "corner-must" && candidate.type === "center-only") ||
      (existing.type === "center-only" && candidate.type === "corner-must")
    ) {
      const ep = existing.params;
      const cp = candidate.params;
      if (ep.property === cp.property && ep.value === cp.value) return true;
    }
  }
  return false;
}

// Pick rules for a puzzle.
// ruleCount: 2 (easy/Monday) to 4 (hard/Sunday).
function pickRules(rng, ruleCount) {
  const templates = shuffle(rng, RULE_TEMPLATES);
  const picked = [];
  const usedGroups = {};

  for (const tmpl of templates) {
    if (picked.length >= ruleCount) break;

    // Limit 1 rule per group to avoid over-constraining
    if (usedGroups[tmpl.group]) continue;

    const params = tmpl.genParams(rng);
    const candidate = { type: tmpl.type, params: params };

    if (hasConflict(picked, candidate)) continue;

    picked.push(candidate);
    usedGroups[tmpl.group] = true;
  }

  return picked;
}

// --- Solution Builder ---
// Fills a grid that satisfies all chosen rules using backtracking.
// Returns the completed grid, or null if the rules are unsatisfiable
// within the attempt budget (caller should re-pick rules).

const GLOBAL_ONLY_RULES = new Set(["must-adjacent"]);

function generateSolution(rng, size, rules) {
  const allGlyphs = [];
  for (const shape of GLYPH_SHAPES) {
    for (const color of GLYPH_COLORS) {
      allGlyphs.push({ shape, color });
    }
  }

  // Rules like must-adjacent can't be validated on a partial grid
  // (unfilled neighbors would cause false negatives), so we split them out.
  const incrementalRules = rules.filter((r) => !GLOBAL_ONLY_RULES.has(r.type));
  const globalRules = rules.filter((r) => GLOBAL_ONLY_RULES.has(r.type));

  const grid = Array.from({ length: size }, () => Array(size).fill(null));
  let attempts = 0;
  const MAX_ATTEMPTS = 80000;

  function solve(pos) {
    if (pos === size * size) {
      return globalRules.length === 0 || validateGrid(grid, size, globalRules);
    }
    if (++attempts > MAX_ATTEMPTS) return false;

    const r = Math.floor(pos / size);
    const c = pos % size;
    const candidates = shuffle(rng, allGlyphs);

    for (const glyph of candidates) {
      grid[r][c] = { shape: glyph.shape, color: glyph.color };

      if (validateGrid(grid, size, incrementalRules)) {
        if (solve(pos + 1)) return true;
      }

      grid[r][c] = null;
    }
    return false;
  }

  if (solve(0)) return grid;
  return null;
}

// --- Clue remover ---
// Removes cells from the solution to create the puzzle.
// The game validates against the known solution (not rule-based uniqueness),
// so we just pick random cells to remove. The clue cells that remain help
// players observe and deduce the hidden rules.

function removeClues(rng, solution, size, removeTarget) {
  const grid = solution.map((r) => r.map((c) => ({ ...c })));
  const positions = shuffle(
    rng,
    Array.from({ length: size * size }, (_, i) => [
      Math.floor(i / size),
      i % size,
    ]),
  );
  const tray = [];

  for (const [r, c] of positions) {
    if (tray.length >= removeTarget) break;
    tray.push(grid[r][c]);
    grid[r][c] = null;
  }

  return { grid, tray };
}

// --- High-level puzzle generation ---
// Retries rule picking + solution building until it finds a solvable combo.
// Then removes clues based on difficulty.

function generatePuzzle(rng, size, ruleCount, removeTarget) {
  const MAX_RETRIES = 20;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const rules = pickRules(rng, ruleCount);
    const solution = generateSolution(rng, size, rules);
    if (solution) {
      const { grid, tray } = removeClues(rng, solution, size, removeTarget);
      return { rules, solution, grid, tray };
    }
  }

  const fallbackRules = [{ type: "no-adjacent-same-color", params: null }];
  const fallbackSolution = generateSolution(rng, size, fallbackRules);
  const { grid, tray } = removeClues(rng, fallbackSolution, size, removeTarget);
  return { rules: fallbackRules, solution: fallbackSolution, grid, tray };
}
