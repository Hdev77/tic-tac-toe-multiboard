const ScoreBoard = ({ scores, isAITurn, winner }) => {
  return (
    <div className="scoreboard">
      <div
        className={`scoreboard__card scoreboard__card--player ${
          !isAITurn && !winner ? "scoreboard__card--active" : ""
        }`}
      >
        <span className="scoreboard__label">YOU (X)</span>
        <span className="scoreboard__score">{scores.player}</span>
      </div>

      <div className="scoreboard__card scoreboard__card--ties">
        <span className="scoreboard__label">TIES</span>
        <span className="scoreboard__score">{scores.ties}</span>
      </div>

      <div
        className={`scoreboard__card scoreboard__card--ai ${
          isAITurn && !winner ? "scoreboard__card--active" : ""
        }`}
      >
        <span className="scoreboard__label">AI (O)</span>
        <span className="scoreboard__score">{scores.ai}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
