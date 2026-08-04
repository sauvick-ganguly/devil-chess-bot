export function queenMoves(board, row, col, push, piece) {

    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],     // Rook directions
        [-1, -1], [-1, 1], [1, -1], [1, 1]    // Bishop directions
    ];

    for (const [dr, dc] of directions) {

        let r = row + dr;
        let c = col + dc;

        while (r >= 0 && r < 8 && c >= 0 && c < 8) {

            if (!board[r][c]) {
                push(r, c);
            }
            else {

                if (board[r][c].color !== piece.color) {
                    push(r, c);
                }

                break;
            }

            r += dr;
            c += dc;
        }
    }
}