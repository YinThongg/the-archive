// ============================================
// Gotglyphed — Rule Engine
// ============================================
// Defines hidden rule types and validates glyph placements.
// Each rule is a function: (grid, size) → boolean
// Grid is a 2D array where each cell is { shape, color } or null (empty/blocked)

const RULE_TYPES = {
  // --- Adjacency Rules ---

  "no-adjacent-same-color": {
    label: "No two adjacent cells share a color",
    check(grid, size) {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (!cell) continue;
          if (
            c + 1 < size &&
            grid[r][c + 1] &&
            grid[r][c + 1].color === cell.color
          )
            return false;
          if (
            r + 1 < size &&
            grid[r + 1] &&
            grid[r + 1][c] &&
            grid[r + 1][c].color === cell.color
          )
            return false;
        }
      }
      return true;
    },
  },

  "no-adjacent-same-shape": {
    label: "No two adjacent cells share a shape",
    check(grid, size) {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (!cell) continue;
          if (
            c + 1 < size &&
            grid[r][c + 1] &&
            grid[r][c + 1].shape === cell.shape
          )
            return false;
          if (
            r + 1 < size &&
            grid[r + 1] &&
            grid[r + 1][c] &&
            grid[r + 1][c].shape === cell.shape
          )
            return false;
        }
      }
      return true;
    },
  },

  "must-adjacent": {
    // params: { shape1, shape2 } — every instance of shape1 must be orthogonally adjacent to at least one shape2
    label: (p) => `Every ${p.shape1} must be adjacent to a ${p.shape2}`,
    check(grid, size, params) {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (!cell || cell.shape !== params.shape1) continue;
          const neighbors = getNeighbors(grid, r, c, size);
          if (!neighbors.some((n) => n && n.shape === params.shape2))
            return false;
        }
      }
      return true;
    },
  },

  // --- Row/Column Rules ---

  "row-unique-color": {
    label: "Each row has all different colors",
    check(grid, size) {
      for (let r = 0; r < size; r++) {
        const colors = [];
        for (let c = 0; c < size; c++) {
          if (!grid[r][c]) continue;
          if (colors.includes(grid[r][c].color)) return false;
          colors.push(grid[r][c].color);
        }
      }
      return true;
    },
  },

  "row-unique-shape": {
    label: "Each row has all different shapes",
    check(grid, size) {
      for (let r = 0; r < size; r++) {
        const shapes = [];
        for (let c = 0; c < size; c++) {
          if (!grid[r][c]) continue;
          if (shapes.includes(grid[r][c].shape)) return false;
          shapes.push(grid[r][c].shape);
        }
      }
      return true;
    },
  },

  "col-unique-color": {
    label: "Each column has all different colors",
    check(grid, size) {
      for (let c = 0; c < size; c++) {
        const colors = [];
        for (let r = 0; r < size; r++) {
          if (!grid[r][c]) continue;
          if (colors.includes(grid[r][c].color)) return false;
          colors.push(grid[r][c].color);
        }
      }
      return true;
    },
  },

  "col-unique-shape": {
    label: "Each column has all different shapes",
    check(grid, size) {
      for (let c = 0; c < size; c++) {
        const shapes = [];
        for (let r = 0; r < size; r++) {
          if (!grid[r][c]) continue;
          if (shapes.includes(grid[r][c].shape)) return false;
          shapes.push(grid[r][c].shape);
        }
      }
      return true;
    },
  },

  "row-max-count": {
    // params: { property: "color"|"shape", value: "red"|"star", max: 2 }
    label: (p) => `No more than ${p.max} ${p.value} in any row`,
    check(grid, size, params) {
      for (let r = 0; r < size; r++) {
        let count = 0;
        for (let c = 0; c < size; c++) {
          if (grid[r][c] && grid[r][c][params.property] === params.value)
            count++;
        }
        if (count > params.max) return false;
      }
      return true;
    },
  },

  "col-max-count": {
    // params: { property: "color"|"shape", value: "red"|"star", max: 2 }
    label: (p) => `No more than ${p.max} ${p.value} in any column`,
    check(grid, size, params) {
      for (let c = 0; c < size; c++) {
        let count = 0;
        for (let r = 0; r < size; r++) {
          if (grid[r][c] && grid[r][c][params.property] === params.value)
            count++;
        }
        if (count > params.max) return false;
      }
      return true;
    },
  },

  // --- Positional Rules ---

  "edge-only": {
    // params: { property: "color"|"shape", value: "star"|"red" }
    label: (p) => `${p.value} can only appear on edge cells`,
    check(grid, size, params) {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (!cell || cell[params.property] !== params.value) continue;
          if (r > 0 && r < size - 1 && c > 0 && c < size - 1) return false;
        }
      }
      return true;
    },
  },

  "center-only": {
    // params: { property: "color"|"shape", value: "diamond"|"purple" }
    label: (p) => `${p.value} can only appear on non-edge cells`,
    check(grid, size, params) {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (!cell || cell[params.property] !== params.value) continue;
          if (r === 0 || r === size - 1 || c === 0 || c === size - 1)
            return false;
        }
      }
      return true;
    },
  },

  "corner-must": {
    // params: { property: "color"|"shape", value: "circle"|"teal" }
    label: (p) => `Corners must contain a ${p.value}`,
    check(grid, size, params) {
      const corners = [
        [0, 0],
        [0, size - 1],
        [size - 1, 0],
        [size - 1, size - 1],
      ];
      for (const [r, c] of corners) {
        if (!grid[r][c]) continue;
        if (grid[r][c][params.property] !== params.value) return false;
      }
      return true;
    },
  },

  // --- Relational Rules ---

  "not-in-same-row": {
    // params: { property: "color"|"shape", value1: "red", value2: "purple" }
    label: (p) => `${p.value1} and ${p.value2} never share a row`,
    check(grid, size, params) {
      for (let r = 0; r < size; r++) {
        let has1 = false,
          has2 = false;
        for (let c = 0; c < size; c++) {
          if (!grid[r][c]) continue;
          if (grid[r][c][params.property] === params.value1) has1 = true;
          if (grid[r][c][params.property] === params.value2) has2 = true;
        }
        if (has1 && has2) return false;
      }
      return true;
    },
  },

  "not-in-same-col": {
    // params: { property: "color"|"shape", value1: "red", value2: "purple" }
    label: (p) => `${p.value1} and ${p.value2} never share a column`,
    check(grid, size, params) {
      for (let c = 0; c < size; c++) {
        let has1 = false,
          has2 = false;
        for (let r = 0; r < size; r++) {
          if (!grid[r][c]) continue;
          if (grid[r][c][params.property] === params.value1) has1 = true;
          if (grid[r][c][params.property] === params.value2) has2 = true;
        }
        if (has1 && has2) return false;
      }
      return true;
    },
  },

  "diagonal-no-same": {
    // params: { property: "color"|"shape" }
    label: (p) => `No two diagonally adjacent cells share a ${p.property}`,
    check(grid, size, params) {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (!cell) continue;
          const diags = [
            [r - 1, c - 1],
            [r - 1, c + 1],
            [r + 1, c - 1],
            [r + 1, c + 1],
          ];
          for (const [dr, dc] of diags) {
            if (dr >= 0 && dr < size && dc >= 0 && dc < size) {
              const neighbor = grid[dr][dc];
              if (
                neighbor &&
                neighbor[params.property] === cell[params.property]
              )
                return false;
            }
          }
        }
      }
      return true;
    },
  },
};

// --- Helpers ---

function getNeighbors(grid, r, c, size) {
  return [
    r > 0 ? grid[r - 1][c] : null,
    r < size - 1 ? grid[r + 1][c] : null,
    c > 0 ? grid[r][c - 1] : null,
    c < size - 1 ? grid[r][c + 1] : null,
  ];
}

// Validate an entire grid against a set of active rules.
// rules is an array of { type, params } objects.
// Returns true if all rules pass.
function validateGrid(grid, size, rules) {
  for (const rule of rules) {
    const ruleDef = RULE_TYPES[rule.type];
    if (!ruleDef) continue;
    if (!ruleDef.check(grid, size, rule.params)) return false;
  }
  return true;
}

// Check if placing a glyph at (row, col) would violate any rules.
// Makes a temporary copy with the placement and validates.
function validatePlacement(grid, size, rules, row, col, glyph) {
  const testGrid = grid.map((r) => r.map((c) => (c ? { ...c } : null)));
  testGrid[row][col] = { ...glyph };
  return validateGrid(testGrid, size, rules);
}
