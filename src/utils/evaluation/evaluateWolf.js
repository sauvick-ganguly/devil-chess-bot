import { pieceMoves } from "../moveLogic";
import { WOLF } from "./evaluationConstants";

export function evaluateWolf(board, lastMove) {

    let score = 0;

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece || piece.type !== "W") continue;

            let value = 0;

            const moves = pieceMoves(
                board,
                row,
                col,
                lastMove,
                false
            );

            // Trapped Wolf
            if (moves.length === 0) {
                value += WOLF.TRAPPED;
            }

            // Center Control
            if (
                row >= 2 &&
                row <= 5 &&
                col >= 2 &&
                col <= 5
            ) {
                value += WOLF.CENTER_CONTROL;
            }

            // Enemy Territory
            if (
                (piece.color === "w" && row <= 3) ||
                (piece.color === "b" && row >= 4)
            ) {
                value += WOLF.ENEMY_TERRITORY;
            }

            // Attacking Enemy King
            const attacksKing = moves.some(move => {

                const target = board[move.row][move.col];

                return (
                    target &&
                    target.type === "K" &&
                    target.color !== piece.color
                );

            });

            if (attacksKing) {
                value += WOLF.ATTACKING_KING;
            }

            // Supported by another Wolf
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],           [0, 1],
                [1, -1],  [1, 0],  [1, 1],
            ];

            let supported = false;

            for (const [dr, dc] of directions) {

                const r = row + dr;
                const c = col + dc;

                if (
                    r < 0 || r >= 8 ||
                    c < 0 || c >= 8
                ) continue;

                const neighbour = board[r][c];

                if (
                    neighbour &&
                    neighbour.type === "W" &&
                    neighbour.color === piece.color
                ) {
                    supported = true;
                    break;
                }

            }

            if (supported) {
                value += WOLF.SUPPORTED_BY_WOLF;
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