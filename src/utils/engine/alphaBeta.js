import { evaluatePosition } from "../evaluation/evaluation";
import { generateLegalMoves } from "./moveGenerator";
import { applyMove } from "../gameLogic";
import { orderMoves } from "./moveOrdering";
import { boardHash } from "./positionHash";
import {
    getTT,
    storeTT
} from "./transpositionTable";

export function alphaBeta(
    board,
    depth,
    alpha,
    beta,
    maximizingPlayer,
    lastMove
) {
    const key = boardHash(board);

    const cached = getTT(key);

    if (
        cached &&
        cached.depth >= depth
    ) {
        return cached.score;
    }

    // Base Case
    if (depth === 0) {
        return evaluatePosition(board, lastMove);
    }

    if (maximizingPlayer) {

        let maxEval = -Infinity;

        let moves = generateLegalMoves(
            board,
            "w",
            lastMove
        );

        moves = orderMoves(board, moves);

        if (moves.length === 0) {
            return evaluatePosition(board, lastMove);
        }

        for (const currentMove of moves) {

            const newBoard = applyMove(
                board,
                currentMove.fromRow,
                currentMove.fromCol,
                currentMove.toRow,
                currentMove.toCol,
                currentMove.move
            );

            const evaluation = alphaBeta(
                newBoard,
                depth - 1,
                alpha,
                beta,
                false,
                currentMove.move
            );

            maxEval = Math.max(maxEval, evaluation);

            alpha = Math.max(alpha, evaluation);

            if (beta <= alpha) {
                break;
            }

        }
        storeTT(
            key,
            depth,
            maxEval
        );

        return maxEval;

    }

    else {

        let minEval = Infinity;

        let moves = generateLegalMoves(
            board,
            "b",
            lastMove
        );

        moves = orderMoves(board, moves);

        if (moves.length === 0) {
            return evaluatePosition(board, lastMove);
        }

        for (const currentMove of moves) {

            const newBoard = applyMove(
                board,
                currentMove.fromRow,
                currentMove.fromCol,
                currentMove.toRow,
                currentMove.toCol,
                currentMove.move
            );

            const evaluation = alphaBeta(
                newBoard,
                depth - 1,
                alpha,
                beta,
                true,
                currentMove.move
            );

            minEval = Math.min(minEval, evaluation);

            beta = Math.min(beta, evaluation);

            if (beta <= alpha) {
                break;
            }

        }

        storeTT(
            key,
            depth,
            minEval
        );

        return minEval;

    }

}