import { useState } from "react";

import Header from "./components/Header";
import ChessBoard from "./components/ChessBoard";
import SidePanel from "./components/SidePanel";
import GameOverModal from "./components/GameOverModal";
import PromotionModal from "./components/PromotionModal";
import EvaluationBar from "./components/EvaluationBar";
import BotSetup from "./components/BotSetup";

import useGame from "./hooks/useGame";
import myPhoto from "./assets/sauvick.png";

function App() {

  const [playerColor, setPlayerColor] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const flipped = playerColor === "b";

  const game = useGame(playerColor);

  // ==========================
  // Bot Setup Screen
  // ==========================

  if (!gameStarted) {

    return (
      <BotSetup
        playerColor={playerColor}
        setPlayerColor={setPlayerColor}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        onStart={() => setGameStarted(true)}
      />
    );

  }

  // ==========================
  // Game
  // ==========================

  const isInitialPosition =
    game.moveHistory.length === 0;

  const displayEvaluation =
    isInitialPosition
      ? game.evaluation - 103
      : game.evaluation;

  return (
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

        <p>
          Designed & Developed by
        </p>

        <h3>
          Sauvick Ganguly
        </h3>

      </footer>

      <GameOverModal game={game} />

      <PromotionModal game={game} />

    </div>
  );
}

export default App;