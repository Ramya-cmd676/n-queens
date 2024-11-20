export const checkQueenPlacement = (queens: number[]): boolean => {
  const n = queens.length;
  
  // Check if all queens are placed
  if (queens.includes(-1)) return false;

  // Check for conflicts
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // Same column check
      if (queens[i] === queens[j]) return false;

      // Diagonal check
      if (Math.abs(queens[i] - queens[j]) === Math.abs(i - j)) return false;
    }
  }

  return true;
};

export const getConflicts = (queens: number[]): Set<string> => {
  const conflicts = new Set<string>();
  const n = queens.length;

  for (let row1 = 0; row1 < n; row1++) {
    const col1 = queens[row1];
    if (col1 === -1) continue;

    // Check conflicts with other queens
    for (let row2 = 0; row2 < n; row2++) {
      const col2 = queens[row2];
      if (col2 === -1 || row1 === row2) continue;

      // Same column
      if (col1 === col2) {
        conflicts.add(`${row1},${col1}`);
        conflicts.add(`${row2},${col2}`);
      }

      // Diagonal
      if (Math.abs(row1 - row2) === Math.abs(col1 - col2)) {
        conflicts.add(`${row1},${col1}`);
        conflicts.add(`${row2},${col2}`);
      }
    }
  }

  return conflicts;
};