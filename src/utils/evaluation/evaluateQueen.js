// src/engine/evaluateQueen.js

export function evaluateQueen(board) {

    let score = 0;

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece || piece.type !== "Q")
                continue;

            let queenScore = 0;

            // ==========================
            // Centralization
            // ==========================

            const centerDistance =
                Math.abs(3.5 - row) +
                Math.abs(3.5 - col);

            queenScore += (7 - centerDistance) * 4;

            // ==========================
            // Activity
            // ==========================

            const directions = [
                [-1, 0], [1, 0],
                [0, -1], [0, 1],
                [-1, -1], [-1, 1],
                [1, -1], [1, 1],
            ];

            for (const [dr, dc] of directions) {

                let r = row + dr;
                let c = col + dc;

                while (
                    r >= 0 &&
                    r < 8 &&
                    c >= 0 &&
                    c < 8
                ) {

                    const target = board[r][c];

                    if (!target) {

                        queenScore += 2;

                    } else {

                        if (target.color !== piece.color) {
                            queenScore += 3;
                        }

                        break;
                    }

                    r += dr;
                    c += dc;
                }
            }

            // ==========================
            // Score
            // ==========================

            if (piece.color === "w") {
                score += queenScore;
            } else {
                score -= queenScore;
            }

        }

    }

    return score;

}