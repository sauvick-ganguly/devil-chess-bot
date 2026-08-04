import { Fragment, useState } from "react";
import whiteKing from "../assets/white/whiteKing1.png";
import whiteQueen from "../assets/white/whiteQueen.png";
import whiteRook from "../assets/white/whiteRook.png";
import whitePawn from "../assets/white/whitePawn.png";
import whiteWolf from "../assets/white/whiteWolf.png";
import whiteDevilPrelate from "../assets/white/whiteDevilPrelate.png";

import blackKing from "../assets/black/blackKing1.png";
import blackQueen from "../assets/black/blackQueen.png";
import blackRook from "../assets/black/blackRook.png";
import blackPawn from "../assets/black/blackPawn.png";
import blackWolf from "../assets/black/blackWolf.png";
import blackDevilPrelate from "../assets/black/blackDevilPrelate.png";
import myPhoto from "../assets/sauvick.png";

const symbols = {
    w: {
        K: whiteKing,
        Q: whiteQueen,
        R: whiteRook,
        P: whitePawn,
        W: whiteWolf,
        D: whiteDevilPrelate,
    },
    b: {
        K: blackKing,
        Q: blackQueen,
        R: blackRook,
        P: blackPawn,
        W: blackWolf,
        D: blackDevilPrelate,
    },
};
function SidePanel({ game }) {

    const [showMoveHistory, setShowMoveHistory] = useState(false);
    const {
        turn,
        capturedByWhite,
        capturedByBlack,
        moveHistory,
        undoStack,
        handleUndo,
        flipped,
        setFlipped,
    } = game;

    return (
        <div className="panel">


            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "18px",
                }}
            >
                <img
                    src={blackWolf}
                    alt="Black Wolf"
                    style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                        userSelect: "none",
                        pointerEvents: "none",
                    }}
                />

                <div>
                    <h2
                        style={{
                            margin: 0,
                            fontFamily: "'UnifrakturCook', cursive",
                            fontSize: "18px",
                            color: "#D4AF37"
                        }}
                    >
                        "The Duel of Evil Against Good"
                    </h2>


                </div>
            </div>

            {/* Turn Card */}

            <div className="turn-card">

                <div>

                    <div
                        className="turn-label"
                        style={{
                            fontFamily: "'UnifrakturCook', cursive",
                            fontSize: "20px",
                            color: "#D4AF37",
                            textShadow: "0 0 8px rgba(0,0,0,0.8)",
                        }}
                    >
                        Turn
                    </div>

                    <div
                        className="turn-sub"
                        style={{
                            fontFamily: "'UnifrakturCook', cursive",
                            fontSize: "22px",
                            color: turn === "w" ? "#F3EFE6" : "#111111",
                            textShadow:
                                turn === "w"
                                    ? "0 0 8px rgba(0,0,0,0.9)"
                                    : "0 0 8px rgba(255,255,255,0.8)",
                        }}
                    >
                        {turn === "w"
                            ? "White to Move"
                            : "Black to Move"}
                    </div>

                </div>

                <div
                    className={`swatch ${turn}`}
                ></div>

            </div>

            {/* Captured by White */}

            <div>

                <h3
                    style={{
                        margin: 0,
                        fontFamily: "'UnifrakturCook', cursive",
                        fontSize: "30px",
                        color: "white",
                        textShadow: "0 0 8px rgba(0,0,0,0.8)",
                    }}
                >
                    Captured by White
                </h3>

                <div className="captured">

                    {capturedByWhite.length === 0 ? (

                        <span></span>

                    ) : (

                        capturedByWhite.map((piece, index) => (

                            <span key={index}>
                                <img
                                    className="captured-piece"
                                    src={symbols[piece.color][piece.type]}
                                    alt={piece.type}
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        objectFit: "contain"
                                    }}
                                />
                            </span>

                        ))

                    )}

                </div>

            </div>

            {/* Captured by Black */}

            <div>

                <h3
                    style={{
                        margin: 0,
                        fontFamily: "'UnifrakturCook', cursive",
                        fontSize: "30px",
                        color: "black",
                        textShadow: "0 0 8px rgba(224, 198, 198, 0.8)",
                    }}
                >
                    Captured by Black
                </h3>

                <div className="captured">

                    {capturedByBlack.length === 0 ? (

                        <span></span>

                    ) : (

                        capturedByBlack.map((piece, index) => (

                            <img
                                    className="captured-piece"
                                    src={symbols[piece.color][piece.type]}
                                    alt={piece.type}
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        objectFit: "contain"
                                    }}
                                />

                        ))

                    )}

                </div>

            </div>

            {/* Move History */}

            <div>

                <h3
                    onClick={() => setShowMoveHistory(prev => !prev)}
                    style={{
                        margin: 0,
                        fontFamily: "'UnifrakturCook', cursive",
                        fontSize: "18px",
                        color: "#D4AF37",
                        textShadow: "0 0 8px rgba(0,0,0,0.8)",
                        cursor: "pointer",
                        userSelect: "none",
                    }}
                >
                    {showMoveHistory ? "▼ Move History" : "▶ Move History"}
                </h3>

                {showMoveHistory && (
                    <>
                        {moveHistory.length === 0 ? (

                            <p style={{ color: "var(--text-1)" }}>
                            </p>

                        ) : (

                            <div className="movelog">

                                <div className="num"><b>#</b></div>
                                <div><b>White</b></div>
                                <div><b>Black</b></div>

                                {Array.from({
                                    length: Math.ceil(moveHistory.length / 2)
                                }).map((_, index) => {

                                    const whiteMove = moveHistory[index * 2];
                                    const blackMove = moveHistory[index * 2 + 1];

                                    return (
                                        <Fragment key={index}>

                                            <div className="num">
                                                {index + 1}
                                            </div>

                                            <div className="w-mv">
                                                {whiteMove &&
                                                    <div className="w-mv">
                                                        {whiteMove && (
                                                            <>
                                                                <img
                                                                    className="move-piece"
                                                                    src={symbols[whiteMove.color][whiteMove.piece]}
                                                                    alt={whiteMove.piece}
                                                                />
                                                                {" "}
                                                                {whiteMove.notation}
                                                            </>
                                                        )}
                                                    </div>
                                                }
                                            </div>

                                            <div className="b-mv">
                                                {blackMove &&
                                                    <div className="b-mv">
                                                        {blackMove && (
                                                            <>
                                                                <img
                                                                    className="move-piece"
                                                                    src={symbols[blackMove.color][blackMove.piece]}
                                                                    alt={blackMove.piece}
                                                                />
                                                                {" "}
                                                                {blackMove.notation}
                                                            </>
                                                        )}
                                                    </div>
                                                }
                                            </div>

                                        </Fragment>
                                    );

                                })}

                            </div>

                        )}
                    </>
                )}

            </div>
            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    gap: "10px",
                }}
            >
                <button
                    className="undo-btn"
                    onClick={handleUndo}
                    disabled={undoStack.length === 0}
                    style={{
                        fontFamily: "'UnifrakturCook', cursive",
                        fontSize: "18px",
                        color: "#D4AF37",
                        textShadow: "0 0 8px rgba(0,0,0,0.8)",
                    }}
                >
                    Undo
                </button>

                <button
                    className="undo-btn"
                    onClick={() => setFlipped(prev => !prev)}
                    style={{
                        fontFamily: "'UnifrakturCook', cursive",
                        fontSize: "18px",
                        color: "#D4AF37",
                        textShadow: "0 0 8px rgba(0,0,0,0.8)",
                    }}
                >
                    Flip Board
                </button>
            </div>
            
            
        </div>
        
    );
    
    
}

export default SidePanel;