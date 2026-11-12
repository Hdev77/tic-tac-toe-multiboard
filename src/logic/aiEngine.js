import { checkWinner, getAvailableMoves } from "./gameRules";

export const getAIMove = (board, size, difficulty, aiPlayer = "O") => {
  const humanPlayer = aiPlayer === "X" ? "O" : "X";
  const availableMoves = getAvailableMoves(board);

  if (availableMoves.length === 0) return null;
  if (difficulty === "easy") {
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }
  if (difficulty === "medium") {
    for (let move of availableMoves) {
      const tempBoard = [...board];
      tempBoard[move] = aiPlayer;
      if (checkWinner(tempBoard, size).winner === aiPlayer) return move;
    }
    for (let move of availableMoves) {
      const tempBoard = [...board];
      tempBoard[move] = humanPlayer;
      if (checkWinner(tempBoard, size).winner === humanPlayer) return move;
    }
    const centerIndex = Math.floor((size * size) / 2);
    if (availableMoves.includes(centerIndex) && Math.random() > 0.3) {
      return centerIndex;
    }
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }
  if (difficulty === "hard") {
    if (size === 3) {
      return getBestMinimaxMove(board, size, aiPlayer, humanPlayer);
    } else {
      const maxDepth = size === 4 ? 3 : 2;
      return getBestHeuristicMove(board, size, aiPlayer, humanPlayer, maxDepth);
    }
  }
  return availableMoves[0];
};
function getBestMinimaxMove(board, size, aiPlayer, humanPlayer) {
  let bestScore = -Infinity;
  let bestMove = null;
  for (let move of getAvailableMoves(board)) {
    board[move] = aiPlayer;
    let score = minimax(
      board,
      size,
      0,
      false,
      aiPlayer,
      humanPlayer,
      -Infinity,
      Infinity,
    );
    board[move] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
}

function minimax(
  board,
  size,
  depth,
  isMaximizing,
  aiPlayer,
  humanPlayer,
  alpha,
  beta,
) {
  const { winner, isDraw } = checkWinner(board, size);
  if (winner === aiPlayer) return 10 - depth;
  if (winner === humanPlayer) return depth - 10;
  if (isDraw) return 0;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let move of getAvailableMoves(board)) {
      board[move] = aiPlayer;
      let evaluation = minimax(
        board,
        size,
        depth + 1,
        false,
        aiPlayer,
        humanPlayer,
        alpha,
        beta,
      );
      board[move] = null;
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let move of getAvailableMoves(board)) {
      board[move] = humanPlayer;
      let evaluation = minimax(
        board,
        size,
        depth + 1,
        true,
        aiPlayer,
        humanPlayer,
        alpha,
        beta,
      );
      board[move] = null;
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

function getBestHeuristicMove(board, size, aiPlayer, humanPlayer, maxDepth) {
  const availableMoves = getAvailableMoves(board);
  let bestScore = -Infinity;
  let bestMove = availableMoves[0];
  const centerIndex = Math.floor((size * size) / 2);

  for (let move of availableMoves) {
    board[move] = aiPlayer;

    if (checkWinner(board, size).winner === aiPlayer) {
      board[move] = null;
      return move;
    }

    let score = limitedMinimax(
      board,
      size,
      maxDepth - 1,
      false,
      aiPlayer,
      humanPlayer,
      -Infinity,
      Infinity,
      centerIndex,
    );
    board[move] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
}

function limitedMinimax(
  board,
  size,
  depth,
  isMaximizing,
  aiPlayer,
  humanPlayer,
  alpha,
  beta,
  centerIndex,
) {
  const { winner, isDraw } = checkWinner(board, size);
  if (winner === aiPlayer) return 100 + depth;
  if (winner === humanPlayer) return -100 - depth;
  if (isDraw || depth === 0) {
    let score = 0;
    if (board[centerIndex] === aiPlayer) score += 5;
    else if (board[centerIndex] === humanPlayer) score -= 5;
    return score;
  }

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let move of getAvailableMoves(board)) {
      board[move] = aiPlayer;
      let evaluation = limitedMinimax(
        board,
        size,
        depth - 1,
        false,
        aiPlayer,
        humanPlayer,
        alpha,
        beta,
        centerIndex,
      );
      board[move] = null;
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let move of getAvailableMoves(board)) {
      board[move] = humanPlayer;
      let evaluation = limitedMinimax(
        board,
        size,
        depth - 1,
        true,
        aiPlayer,
        humanPlayer,
        alpha,
        beta,
        centerIndex,
      );
      board[move] = null;
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}
