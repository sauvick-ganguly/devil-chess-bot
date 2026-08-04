import {
    PIECE_VALUES,
    DEVIL_PRELATE
} from "./evaluationConstants";

export function evaluateMaterial(board) {

    let score = 0;

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece) continue;

            let value = PIECE_VALUES[piece.type];

            // Devil Prelate after using its revival
            if (
                piece.type === "D" &&
                piece.revived === true
            ) {
                value = DEVIL_PRELATE.VALUE_AFTER_REVIVAL;
            }

            if (piece.color === "w") {
                score += value;
            }
            else {
                score -= value;
            }

        }

    }

    return score;

}