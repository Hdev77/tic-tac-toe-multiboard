export const getAvailableMoves = (board) => {
  return board
    .map((cell, idx) => (cell === null ? idx : null))
    .filter((val) => val !== null);
};
export const checkWinner = (board, size) => {
  const lines = [];
  for (let r = 0; r < size; r++) {
    const row = [];
    for (let c = 0; c < size; c++) row.push(r * size + c);
    lines.push(row);
  }
  for (let c = 0; c < size; c++) {
    const col = [];
    for (let r = 0; r < size; r++) col.push(r * size + c);
    lines.push(col);
  }
  const diag1 = [];
  for (let i = 0; i < size; i++) diag1.push(i * size + i);
  lines.push(diag1);
  const diag2 = [];
  for (let i = 0; i < size; i++) diag2.push(i * size + (size - 1 - i));
  lines.push(diag2);
  for (let line of lines) {
    const first = board[line[0]];
    if (first && line.every((index) => board[index] === first)) {
      return { winner: first, winningLine: line, isDraw: false };
    }
  }
  const isDraw = board.every((cell) => cell !== null);
  return { winner: null, winningLine: null, isDraw };
};
