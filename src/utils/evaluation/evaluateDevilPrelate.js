import { DEVIL_PRELATE } from "./evaluationConstants";

export function evaluateDevilPrelate(board) {

    let score = 0;

    const directions = [
        [-1, -1],
        [-1,  1],
        [ 1, -1],
        [ 1,  1],
    ];

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece || piece.type !== "D") continue;

            let value = 0;

            // Count reachable diagonal squares
            for (const [dr, dc] of directions) {

                let r = row + dr;
                let c = col + dc;

                while (
                    r >= 0 &&
                    r < 8 &&
                    c >= 0 &&
                    c < 8
                ) {

                    value += DEVIL_PRELATE.DIAGONAL_WEIGHT;

                    if (board[r][c] !== null) {
                        break;
                    }

                    r += dr;
                    c += dc;
                }
            }

            // Bonus for occupying the central 4×4 area
            if (
                row >= 2 &&
                row <= 5 &&
                col >= 2 &&
                col <= 5
            ) {
                value += DEVIL_PRELATE.CENTER_BONUS;
            }

            // Bonus if the Prelate has not revived yet
            if (!piece.revived) {
                value += DEVIL_PRELATE.EXTRA_LIFE_BONUS;
            }

            if (piece.color === "w") {
                score += value;
            } else {
                score -= value;
            }

        }

    }

    return score;

}