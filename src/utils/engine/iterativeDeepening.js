import { alphaBeta } from "./alphaBeta";
import { generateLegalMoves } from "./moveGenerator";
import { applyMove } from "../gameLogic";

export function iterativeDeepening(
    board,
    color,
    lastMove,
    maxDepth
) {

    let bestMove = null;

    for (
        let depth = 1;
        depth <= maxDepth;
        depth++
    ) {

        let bestScore =
            color === "w"
                ? -Infinity
                : Infinity;

        const moves =
            generateLegalMoves(
                board,
                color,
                lastMove
            );

        for (const currentMove of moves) {

            const newBoard = applyMove(
                board,
                currentMove.fromRow,
                currentMove.fromCol,
                currentMove.toRow,
                currentMove.toCol,
                currentMove.move
            );

            const score =
                alphaBeta(
                    newBoard,
                    depth - 1,
                    -Infinity,
                    Infinity,
                    color === "b",
                    currentMove.move
                );

            if (
                color === "w"
                    ? score > bestScore
                    : score < bestScore
            ) {

                bestScore = score;
                bestMove = currentMove;

            }

        }

    }

    return bestMove;

}