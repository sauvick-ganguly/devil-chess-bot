import botBattleLogo from "../assets/bots.png";

function BotSetup({
  playerColor,
  setPlayerColor,
  difficulty,
  setDifficulty,
  onStart
}) {

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at center, #1a1a1a 0%, #080808 55%, #000000 100%)",
        color: "#D4AF37",
        fontFamily: "'UnifrakturCook', cursive",
        textAlign: "center",
        padding: "30px",
        boxSizing: "border-box"
      }}
    >

      {/* BOT BATTLE TITLE + IMAGE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "30px"
        }}
      >
        <img
          src={botBattleLogo}
          alt="Bot Battle"
          style={{
            width: "75px",
            height: "75px",
            objectFit: "contain",
            filter:
              "drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))"
          }}
        />

        <h1
          style={{
            fontSize: "52px",
            letterSpacing: "4px",
            margin: 0,
            color: "#D4AF37",
            textShadow:
              "0 0 15px rgba(212, 175, 55, 0.5)"
          }}
        >
          BOT BATTLE
        </h1>


      </div>

      <h2
        style={{
          fontSize: "25px",
          letterSpacing: "2px",
          marginBottom: "14px",
          color: "#E8D8A8",
          textShadow:
            "0 0 8px rgba(0, 0, 0, 0.9)"
        }}
      >
        Select Color
      </h2>

      <div className="selection-group">

        <button
          className={playerColor === "w" ? "selected" : ""}
          onClick={() => setPlayerColor("w")}
        >
          <span
            style={{
              fontFamily: "'UnifrakturCook', cursive",
              fontSize: "28px",
              color: "#F5F5F5",
              textShadow:
                "0 0 6px rgba(255,255,255,0.5)"
            }}
          >
            ⚪ White
          </span>
        </button>

        <button
          className={playerColor === "b" ? "selected" : ""}
          onClick={() => setPlayerColor("b")}
        >
          <span
            style={{
              fontFamily: "'UnifrakturCook', cursive",
              fontSize: "28px",
              color: "#D4AF37",
              textShadow:
                "0 0 6px rgba(212,175,55,0.5)"
            }}
          >
            ⚫ Black
          </span>
        </button>

      </div>

      <h2
        style={{
          fontSize: "25px",
          letterSpacing: "2px",
          marginTop: "32px",
          marginBottom: "14px",
          color: "#E8D8A8"
        }}
      >
        Select Difficulty
      </h2>

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
          Hard (Beta Version)
        </button>

      </div>

      <button
        className="start-button"
        disabled={!playerColor || !difficulty}
        onClick={onStart}
        style={{
          fontFamily: "'UnifrakturCook', cursive",
          fontSize: "24px",
          letterSpacing: "2px",
          marginTop: "30px"
        }}
      >
        Start Game
      </button>

    </div>
  );
}

export default BotSetup;