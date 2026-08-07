import { generateLegalMoves } from "./moveGenerator";
import { alphaBeta } from "./alphaBeta";
import { orderMoves } from "./moveOrdering";
import { applyMove } from "../gameLogic";

const TOLERANCE = 15;

export function search(
    board,
    color,
    lastMove,
    depth,
    moveNumber
) {

    let legalMoves = generateLegalMoves(
        board,
        color,
        lastMove
    );

    legalMoves = orderMoves(
        board,
        legalMoves
    );

    if (legalMoves.length === 0) {
        return null;
    }

    const scoredMoves = [];

    for (const currentMove of legalMoves) {

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
            -Infinity,
            Infinity,
            color === "b",
            currentMove.move
        );

        scoredMoves.push({
            move: currentMove,
            evaluation
        });

    }

    scoredMoves.sort((a, b) =>

        color === "w"
            ? b.evaluation - a.evaluation
            : a.evaluation - b.evaluation

    );

    // FIRST MOVE ONLY
    if (moveNumber === 0) {

        const topMoves = scoredMoves.slice(
            0,
            Math.min(6, scoredMoves.length)
        );

        return topMoves[
            Math.floor(
                Math.random() * topMoves.length
            )
        ].move;

    }

    let bestEvaluation = scoredMoves[0].evaluation;

    const bestMoves = scoredMoves.filter(move =>

        Math.abs(
            move.evaluation - bestEvaluation
        ) <= TOLERANCE

    );

    if (moveNumber < 8) {

        return bestMoves[
            Math.floor(
                Math.random() * bestMoves.length
            )
        ].move;

    }

    return scoredMoves[0].move;

}