const GameBoard = ({ board, size, onCellClick, winningLine, isAITurn }) => {
  return (
    <div className={`game-board game-board--size-${size}`}>
      {board.map((cell, index) => {
        const isWinningCell = winningLine && winningLine.includes(index);
        let cellModifier = "";

        if (cell === "X") cellModifier = "game-board__cell--x";
        if (cell === "O") cellModifier = "game-board__cell--o";
        if (isWinningCell) cellModifier += " game-board__cell--winning";

        return (
          <button
            key={index}
            className={`game-board__cell ${cellModifier}`}
            onClick={() => onCellClick(index)}
            disabled={cell !== null || isAITurn || winningLine}
          >
            {cell}
          </button>
        );
      })}
    </div>
  );
};

export default GameBoard;
