import { isKingInCheck } from "../gameLogic";
import { KING } from "./evaluationConstants";

export function evaluateKingSafety(board) {

    let score = 0;

    for (const color of ["w", "b"]) {

        let value = 0;

        if (isKingInCheck(board, color)) {
            value = KING.EXPOSED;
        } else {
            value = KING.BOTH_SAFE;
        }

        if (color === "w") {
            score += value;
        } else {
            score -= value;
        }
    }

    return score;

}