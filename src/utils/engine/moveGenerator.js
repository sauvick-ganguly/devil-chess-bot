import {
    pieceMoves,
    applyMove,
    isKingInCheck,
} from "../gameLogic";

export function generateLegalMoves(
    board,
    color,
    lastMove
) {

    const legalMoves = [];

    for (let fromRow = 0; fromRow < 8; fromRow++) {

        for (let fromCol = 0; fromCol < 8; fromCol++) {

            const piece = board[fromRow][fromCol];

            if (!piece) continue;

            if (piece.color !== color) continue;

            const moves = pieceMoves(
                board,
                fromRow,
                fromCol,
                lastMove
            );

            for (const move of moves) {

                const newBoard = applyMove(
                    board,
                    fromRow,
                    fromCol,
                    move.row,
                    move.col,
                    move
                );

                if (
                    !isKingInCheck(
                        newBoard,
                        color
                    )
                ) {

                    legalMoves.push({

                        fromRow,
                        fromCol,

                        toRow: move.row,
                        toCol: move.col,

                        piece,

                        move,

                    });

                }

            }

        }

    }

    return legalMoves;

}