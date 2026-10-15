import { evaluatePositionForSearch } from "../ml/evaluationMode";
import { generateLegalMoves } from "./moveGenerator";
import { applyMove } from "../gameLogic";
import { orderMoves } from "./moveOrdering";
import { boardHash } from "./positionHash";
import { quiescence } from "./quiescence";
import {
    getTT,
    storeTT
} from "./transpositionTable";

let nodes = 0;

export function resetNodes() {
    nodes = 0;
}

export function getNodes() {
    return nodes;
}

export function alphaBeta(
    board,
    depth,
    alpha,
    beta,
    maximizingPlayer,
    lastMove
) {

    nodes++;

    const key = boardHash(board);

    const cached = getTT(key);

    if (
        cached &&
        cached.depth >= depth
    ) {
        return cached.score;
    }

    // ==========================
    // Base Case
    // ==========================

    if (depth === 0) {

        return quiescence(
            board,
            alpha,
            beta,
            maximizingPlayer,
            lastMove
        );

        // For testing:
        // return evaluatePosition(board, lastMove);

    }

    // ==========================
    // White (Maximizing)
    // ==========================

    if (maximizingPlayer) {

        let maxEval = -Infinity;

        let moves = generateLegalMoves(
            board,
            "w",
            lastMove
        );

        moves = orderMoves(
            board,
            moves
        );

        if (moves.length === 0) {
            return evaluatePositionForSearch(
                board,
                lastMove
            );
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

            if (evaluation > maxEval) {
                maxEval = evaluation;
            }

            if (evaluation > alpha) {
                alpha = evaluation;
            }

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

    // ==========================
    // Black (Minimizing)
    // ==========================

    let minEval = Infinity;

    let moves = generateLegalMoves(
        board,
        "b",
        lastMove
    );

    moves = orderMoves(
        board,
        moves
    );

    if (moves.length === 0) {
        return evaluatePositionForSearch(
            board,
            lastMove
        );
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

        if (evaluation < minEval) {
            minEval = evaluation;
        }

        if (evaluation < beta) {
            beta = evaluation;
        }

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