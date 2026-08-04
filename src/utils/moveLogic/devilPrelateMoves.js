import { inBounds } from "../boardUtils";

export function devilPrelateMoves(
    board,
    row,
    col,
    push,
    piece
) {
    const directions = [
        [-1, -1],
        [-1,  1],
        [ 1, -1],
        [ 1,  1],
    ];

    for (const [dr, dc] of directions) {
        let r = row + dr;
        let c = col + dc;

        while (inBounds(r, c)) {

            const target = board[r][c];

            if (!target) {

                push(r, c);

            } else {

                if (target.color !== piece.color) {
                    push(r, c);
                }

                break;
            }

            r += dr;
            c += dc;
        }
    }
}