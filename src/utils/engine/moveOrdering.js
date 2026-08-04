import { PIECE_VALUES } from "../evaluation/evaluationConstants";

export function orderMoves(board, moves) {

    return [...moves].sort((a, b) => {

        const scoreA = moveScore(board, a);
        const scoreB = moveScore(board, b);

        return scoreB - scoreA;
    });

}

function moveScore(board, currentMove) {

    let score = 0;

    const movingPiece =
        board[currentMove.fromRow][currentMove.fromCol];

    const capturedPiece =
        board[currentMove.toRow][currentMove.toCol];

    // MVV-LVA (Most Valuable Victim - Least Valuable Attacker)

    if (capturedPiece) {

        score +=
            10 * PIECE_VALUES[capturedPiece.type] -
            PIECE_VALUES[movingPiece.type];
    }

    // Promotion

    if (currentMove.move?.promotion) {
        score += 800;
    }

    return score;
}