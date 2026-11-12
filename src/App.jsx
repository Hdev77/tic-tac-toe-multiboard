import { useState, useEffect, useCallback } from "react";
import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import ScoreBoard from "./components/ScoreBoard";
import Modal from "./components/Modal";
import { checkWinner } from "./logic/gameRules";
import { getAIMove } from "./logic/aiEngine";

const App = () => {
  const [size, setSize] = useState(3);
  const [difficulty, setDifficulty] = useState("medium");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isAITurn, setIsAITurn] = useState(false);
  const [currentTurn, setCurrentTurn] = useState("X");
  const [gameResult, setGameResult] = useState({
    winner: null,
    winningLine: null,
    isDraw: false,
  });
  const [scores, setScores] = useState({ player: 0, ai: 0, ties: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const resetBoard = useCallback(
    (newSize = size) => {
      setBoard(Array(newSize * newSize).fill(null));
      setCurrentTurn("X");
      setIsAITurn(false);
      setGameResult({ winner: null, winningLine: null, isDraw: false });
      setIsModalOpen(false);
    },
    [size],
  );

  const handleSizeChange = (newSize) => {
    if (newSize === size) return;
    setSize(newSize);
    resetBoard(newSize);
  };

  const handleDifficultyChange = (newDiff) => {
    if (newDiff === difficulty) return;
    setDifficulty(newDiff);
    resetBoard();
  };

  const handleGameOver = (result) => {
    setGameResult(result);
    if (result.winner === "X") {
      setScores((prev) => ({ ...prev, player: prev.player + 1 }));
    } else if (result.winner === "O") {
      setScores((prev) => ({ ...prev, ai: prev.ai + 1 }));
    } else if (result.isDraw) {
      setScores((prev) => ({ ...prev, ties: prev.ties + 1 }));
    }

    setTimeout(() => {
      setIsModalOpen(true);
    }, 700);
  };

  const handleCellClick = (index) => {
    if (board[index] || isAITurn || gameResult.winner || gameResult.isDraw)
      return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);

    const result = checkWinner(newBoard, size);
    if (result.winner || result.isDraw) {
      handleGameOver(result);
    } else {
      setCurrentTurn("O");
      setIsAITurn(true);
    }
  };

  useEffect(() => {
    if (!isAITurn || gameResult.winner || gameResult.isDraw) return;

    const timer = setTimeout(() => {
      const aiMoveIndex = getAIMove(board, size, difficulty, "O");

      if (aiMoveIndex !== null && aiMoveIndex !== undefined) {
        const newBoard = [...board];
        newBoard[aiMoveIndex] = "O";
        setBoard(newBoard);

        const result = checkWinner(newBoard, size);
        if (result.winner || result.isDraw) {
          handleGameOver(result);
        } else {
          setCurrentTurn("X");
        }
      }
      setIsAITurn(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [isAITurn, board, size, difficulty, gameResult]);

  return (
    <main className="game-layout">
      <header className="game-layout__header">
        <h1 className="game-layout__title">Tic Tac Toe</h1>
        <p className="game-layout__subtitle">Play against smart AI</p>
      </header>

      <ScoreBoard
        scores={scores}
        currentTurn={currentTurn}
        isAITurn={isAITurn}
        winner={gameResult.winner}
      />

      <GameBoard
        board={board}
        size={size}
        onCellClick={handleCellClick}
        winningLine={gameResult.winningLine}
        isAITurn={isAITurn}
      />

      <GameControls
        size={size}
        onSizeChange={handleSizeChange}
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        onReset={() => resetBoard()}
      />

      <Modal
        isOpen={isModalOpen}
        winner={gameResult.winner}
        isDraw={gameResult.isDraw}
        onRestart={() => resetBoard()}
      />
    </main>
  );
};

export default App;
