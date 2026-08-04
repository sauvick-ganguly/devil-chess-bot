import {
    pieceMoves,
    applyMove,
    isKingInCheck
} from "../gameLogic";

const MOBILITY_WEIGHT = 2;

export function evaluateMobility(board, lastMove) {

    let whiteMoves = 0;
    let blackMoves = 0;

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece) continue;

            const generatedMoves = pieceMoves(
                board,
                row,
                col,
                lastMove
            );

            const legalMoves = generatedMoves.filter(move => {

                const newBoard = applyMove(
                    board,
                    row,
                    col,
                    move.row,
                    move.col,
                    move
                );

                return !isKingInCheck(
                    newBoard,
                    piece.color
                );

            });

            if (piece.color === "w") {
                whiteMoves += legalMoves.length;
            }
            else {
                blackMoves += legalMoves.length;
            }
        }
    }

    return (whiteMoves - blackMoves) * MOBILITY_WEIGHT;
}