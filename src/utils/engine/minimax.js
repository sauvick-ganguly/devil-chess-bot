import { evaluatePosition } from "../evaluation/evaluation";
import { generateLegalMoves } from "./moveGenerator";
import { applyMove } from "../gameLogic";

export function minimax(
    board,
    depth,
    maximizingPlayer,
    lastMove
) {

    // Base Case
    if (depth === 0) {
        return evaluatePosition(board, lastMove);
    }

    if (maximizingPlayer) {

        let maxEval = -Infinity;

        const moves = generateLegalMoves(
            board,
            "w",
            lastMove
        );

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

            const evaluation = minimax(
                newBoard,
                depth - 1,
                false,
                currentMove.move
            );

            maxEval = Math.max(
                maxEval,
                evaluation
            );

        }

        return maxEval;

    }

    else {

        let minEval = Infinity;

        const moves = generateLegalMoves(
            board,
            "b",
            lastMove
        );

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

            const evaluation = minimax(
                newBoard,
                depth - 1,
                true,
                currentMove.move
            );

            minEval = Math.min(
                minEval,
                evaluation
            );

        }

        return minEval;

    }

}