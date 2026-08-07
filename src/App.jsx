import { useState } from "react";
import Header from "./components/Header";
import ChessBoard from "./components/ChessBoard";
import SidePanel from "./components/SidePanel";
import GameOverModal from "./components/GameOverModal";
import PromotionModal from "./components/PromotionModal";
import useGame from "./hooks/useGame";
import EvaluationBar from "./components/EvaluationBar";
import myPhoto from "./assets/sauvick.png";

function App() {

  const [playerColor, setPlayerColor] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const game = useGame(playerColor);

  if (!gameStarted) {

    return (

      <div className="choose-side">

        <h1>BOT BATTLE</h1>

        <h2>Select Color</h2>

        <div className="selection-group">

          <button
            className={playerColor === "w" ? "selected" : ""}
            onClick={() => {
              setPlayerColor("w");
              setFlipped(false);
            }}
          >
            ⚪ White
          </button>

          <button
            className={playerColor === "b" ? "selected" : ""}
            onClick={() => {
              setPlayerColor("b");
              setFlipped(true);
            }}
          >
            ⚫ Black
          </button>

        </div>

        <h2>Select Difficulty</h2>

        <div className="selection-group">

          <button
            disabled={!playerColor}
            className={difficulty === 1 ? "selected" : ""}
            onClick={() => setDifficulty(1)}
          >
            Easy
          </button>

          <button
            disabled={!playerColor}
            className={difficulty === 2 ? "selected" : ""}
            onClick={() => setDifficulty(2)}
          >
            Medium
          </button>

          <button
            disabled={!playerColor}
            className={difficulty === 3 ? "selected" : ""}
            onClick={() => setDifficulty(3)}
          >
            Hard(Beta Version)
          </button>

        </div>

        <button
          className="start-button"
          disabled={!playerColor || !difficulty}
          onClick={() => setGameStarted(true)}
        >
          Start Game
        </button>

      </div>

    );

  }

  const isInitialPosition =
    game.moveHistory.length === 0;

  const displayEvaluation =
    isInitialPosition
      ? game.evaluation - 103
      : game.evaluation;

  return (
    <>
      <div className="app">

        <Header game={game} />

        <div className="layout">

          <div className="board-section">

            <ChessBoard
              game={game}
              playerColor={playerColor}
              difficulty={difficulty}
              flipped={flipped}
            />

          </div>

          <EvaluationBar
            evaluation={displayEvaluation}
            gameOver={game.gameOver}
            winner={game.winner}
          />

          <SidePanel game={game} />

        </div>

        <footer className="creator-card">

          <img
            src={myPhoto}
            alt="Sauvick Ganguly"
          />

          <p>Designed & Developed by</p>

          <h3>Sauvick Ganguly</h3>

        </footer>

        <GameOverModal game={game} />
        <PromotionModal game={game} />

      </div>
    </>
  );
}

export default App;