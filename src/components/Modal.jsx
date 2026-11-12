const Modal = ({ winner, isDraw, onRestart }) => {
  if (!winner && !isDraw) return null;

  let message = "";
  let titleModifier = "";

  if (winner === "X") {
    message = "YOU WON!";
    titleModifier = "modal__title--win";
  } else if (winner === "O") {
    message = "AI WON!";
    titleModifier = "modal__title--lose";
  } else if (isDraw) {
    message = "ROUND TIED!";
    titleModifier = "modal__title--draw";
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className={`modal__title ${titleModifier}`}>{message}</h2>
        <p className="modal__subtitle">
          {isDraw
            ? "Well played by both sides."
            : `${winner} takes this round!`}
        </p>
        <div className="modal__actions">
          <button
            className="modal__btn modal__btn--primary"
            onClick={onRestart}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
