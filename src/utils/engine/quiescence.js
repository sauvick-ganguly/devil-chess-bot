import { evaluatePositionForSearch } from "../ml/evaluationMode";
import { generateLegalMoves } from "./moveGenerator";
import { applyMove } from "../gameLogic";

export function quiescence(
    board,
    alpha,
    beta,
    maximizingPlayer,
    lastMove
) {

    const standPat = evaluatePositionForSearch(
        board,
        lastMove
    );

    if (maximizingPlayer) {

        if (standPat >= beta)
            return beta;

        alpha = Math.max(alpha, standPat);

    } else {

        if (standPat <= alpha)
            return alpha;

        beta = Math.min(beta, standPat);

    }

    const color =
        maximizingPlayer ? "w" : "b";

    let moves =
        generateLegalMoves(
            board,
            color,
            lastMove
        );

    // Only tactical moves
    moves = moves.filter(move =>
        move.capture ||
        move.enPassant ||
        move.promotion
    );

    for (const move of moves) {

        const newBoard = applyMove(
            board,
            move.fromRow,
            move.fromCol,
            move.toRow,
            move.toCol,
            move.move
        );

        const score = quiescence(
            newBoard,
            alpha,
            beta,
            !maximizingPlayer,
            move.move
        );

        if (maximizingPlayer) {

            alpha = Math.max(alpha, score);

            if (alpha >= beta)
                break;

        } else {

            beta = Math.min(beta, score);

            if (beta <= alpha)
                break;

        }

    }

    return maximizingPlayer
        ? alpha
        : beta;

}