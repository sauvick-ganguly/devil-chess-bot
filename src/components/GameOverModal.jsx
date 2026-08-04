// src/components/GameOverModal.jsx

import "./GameOverModal.css";

export default function GameOverModal({
    isOpen,
    winner,
    draw,
    reason,
    onNewGame,
    onClose
}) {

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">

            <div className="game-over-modal">

                <h1>Game Over</h1>

                <h2>
                    {
                        draw
                            ? "Draw!"
                            : winner === "w"
                                ? "White Wins!"
                                : "Black Wins!"
                    }
                </h2>

                <h3>
                    {
                        draw
                            ? reason
                            : reason || "Checkmate"
                    }
                </h3>

                <div className="modal-buttons">
                    <button onClick={onNewGame}>
                        New Game
                    </button>
                </div>

            </div>

        </div>
    );
}