import Header from "./components/Header";
import ChessBoard from "./components/ChessBoard";
import SidePanel from "./components/SidePanel";
import GameOverModal from "./components/GameOverModal";
import PromotionModal from "./components/PromotionModal";
import useGame from "./hooks/useGame";
import EvaluationBar from "./components/EvaluationBar";
import myPhoto from "./assets/sauvick.png";

function App() {
  const game = useGame();
  const isInitialPosition =
  game.moveHistory.length === 0;

const displayEvaluation =
  isInitialPosition
    ? game.evaluation - 103
    : game.evaluation;

  return (
    <>
      <div className="background"></div>

      <div className="app">

        <Header game={game} />

        <div className="layout">

          <div className="board-section">
            <ChessBoard game={game} />
          </div>
          
          <EvaluationBar
            evaluation={displayEvaluation}
            gameOver={game.gameOver}
            winner={game.winner}
          />

          <SidePanel game={game} />

        </div>

        {/* Full-width Footer */}
        <footer className="creator-card">
          <img src={myPhoto} alt="Sauvick Ganguly" />

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