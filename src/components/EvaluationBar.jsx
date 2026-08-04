export default function EvaluationBar({
    evaluation = 0,
    gameOver = false,
    winner = null,
}) {

    let score = Number.isFinite(evaluation) ? evaluation : 0;

    // Game over handling
    if (gameOver) {

        if (winner === "w") {
            score = 1000;
        } else if (winner === "b") {
            score = -1000;
        } else {
            score = 0;
        }

    }

    const clamped = Math.max(-1000, Math.min(1000, score));

    const percent = ((clamped + 1000) / 2000) * 100;

    const displayScore = (score / 100).toFixed(2);

    let displayText = null;

    if (gameOver) {

        if (winner === "w") {
            displayText = "1-0";
        } else if (winner === "b") {
            displayText = "0-1";
        } else {
            displayText = "½-½";
        }

    }
    const isMobile = window.innerWidth <= 768;
    return (

        <div className="evaluation-wrapper">

            {gameOver ? (

                <div className="evaluation-score top">
                    {displayText}
                </div>

            ) : score >= 0 ? (

                <div className="evaluation-score top">
                    +{displayScore}
                </div>

            ) : null}

            <div
                className="evaluation-container"
                style={
                    isMobile
                        ? {
                            width: "100%",
                            height: "14px",
                        }
                        : {
                            width: "22px",
                            height: "680px",
                        }
                }
            >

                <div
                    className="evaluation-black"
                    style={
                        isMobile
                            ? { width: `${100 - percent}%` }
                            : { height: `${100 - percent}%` }
                    }
                />

                <div
                    className="evaluation-white"
                    style={
                        isMobile
                            ? { width: `${percent}%` }
                            : { height: `${percent}%` }
                    }
                />

            </div>

            {!gameOver && score < 0 && (

                <div className="evaluation-score bottom">
                    {displayScore}
                </div>

            )}

        </div>

    );

}