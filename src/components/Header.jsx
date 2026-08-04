import blackKing2 from "../assets/black/blackKing2.png"; // Inverted Cross
import whiteKing1 from "../assets/white/whiteKing1.png"; // Normal Cross
function Header({ game }) {
  return (
    <header className="top">
      <div className="brand">
        <div className="brand-mark">
          <img
            src={blackKing2}
            alt="Black King"
            className="brand-piece black-logo"
          />

          <img
            src={whiteKing1}
            alt="White King"
            className="brand-piece white-logo"
          />
        </div>

        <div>
          <h1>Devil's Chess</h1>
          <p></p>
        </div>
      </div>

      
    </header>
  );
}

export default Header;