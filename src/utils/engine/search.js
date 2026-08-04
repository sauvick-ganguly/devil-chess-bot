import { generateLegalMoves } from "./moveGenerator";
import { minimax } from "./minimax";
import { applyMove } from "../gameLogic";

const SEARCH_DEPTH = 2;

export function search(
    board,
    color,
    lastMove
) {
    console.log("Search started");
    const legalMoves = generateLegalMoves(
        board,
        color,
        lastMove
    );

    if (legalMoves.length === 0) {
        return null;
    }

    let bestMove = null;

    let bestEvaluation =
        color === "w"
            ? -Infinity
            : Infinity;

    for (const currentMove of legalMoves) {

        const newBoard = applyMove(
            board,
            currentMove.fromRow,
            currentMove.fromCol,
            currentMove.toRow,
            currentMove.toCol,
            currentMove.move
        );
        console.log("Before minimax");
        const evaluation = minimax(
            newBoard,
            SEARCH_DEPTH - 1,
            color === "b",
            currentMove.move
        );
        console.log("After minimax");
        if (color === "w") {

            if (evaluation > bestEvaluation) {

                bestEvaluation = evaluation;
                bestMove = currentMove;

            }

        }

        else {

            if (evaluation < bestEvaluation) {

                bestEvaluation = evaluation;
                bestMove = currentMove;

            }

        }

    }

    return bestMove;

}