import { inBounds } from "../boardUtils";

export function rookMoves(board, row, col, push, piece) {

    if (piece.type === "R") {

        const directions = [
            [-1, 0], // Up
            [1, 0],  // Down
            [0, -1], // Left
            [0, 1],  // Right
        ];

        for (const [dr, dc] of directions) {

            let nr = row + dr;
            let nc = col + dc;

            while (inBounds(nr, nc)) {

                const target = board[nr][nc];

                // Empty square
                if (!target) {
                    push(nr, nc);
                }

                // Enemy piece
                else if (target.color !== piece.color) {
                    push(nr, nc, { capture: true });
                    break;
                }

                // Friendly piece blocks movement
                else {
                    break;
                }

                nr += dr;
                nc += dc;
            }
        }
    }
}