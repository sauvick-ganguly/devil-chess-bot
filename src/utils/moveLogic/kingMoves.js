import { inBounds } from "../boardUtils";
import { castleMoves } from "./castleLogic";

export function kingMoves(
    board,
    row,
    col,
    push,
    piece,
    includeCastle = true
) {

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dr, dc] of directions) {

        const nr = row + dr;
        const nc = col + dc;

        if (!inBounds(nr, nc))
            continue;

        const target = board[nr][nc];

        if (!target) {
            push(nr, nc);
        }

        else if (target.color !== piece.color) {
            push(nr, nc, {
                capture: true
            });
        }
    }

    if (includeCastle) {
        castleMoves(board, row, col, push, piece);
    }
}