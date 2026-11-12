const GameControls = ({
  size,
  onSizeChange,
  difficulty,
  onDifficultyChange,
  onReset,
}) => {
  return (
    <div className="game-controls">
      <div className="game-controls__group">
        <label className="game-controls__label">Grid Size:</label>
        <div className="game-controls__buttons">
          {[3, 4, 5].map((s) => (
            <button
              key={s}
              className={`game-controls__btn ${size === s ? "game-controls__btn--active" : ""}`}
              onClick={() => onSizeChange(s)}
            >
              {s}×{s}
            </button>
          ))}
        </div>
      </div>

      <div className="game-controls__group">
        <label className="game-controls__label">AI Difficulty:</label>
        <div className="game-controls__buttons">
          {["easy", "medium", "hard"].map((diff) => (
            <button
              key={diff}
              className={`game-controls__btn ${difficulty === diff ? "game-controls__btn--active" : ""}`}
              onClick={() => onDifficultyChange(diff)}
            >
              {diff.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <button className="game-controls__reset-btn" onClick={onReset}>
        Reset Game
      </button>
    </div>
  );
};

export default GameControls;
