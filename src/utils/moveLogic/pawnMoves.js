import { inBounds } from "../boardUtils";

export function pawnMoves(board, row, col, push, piece, lastMove) {

    const dir = piece.color === "w" ? -1 : 1;
    const startRow = piece.color === "w" ? 6 : 1;

    // ==========================
    // Forward Moves
    // ==========================
    if (
        inBounds(row + dir, col) &&
        !board[row + dir][col]
    ) {

        push(row + dir, col);

        // Two-square move from starting position
        if (
            row === startRow &&
            !board[row + 2 * dir][col]
        ) {
            push(row + 2 * dir, col);
        }
    }

    // ==========================
    // Normal Captures
    // ==========================
    for (const dc of [-1, 1]) {

        const nr = row + dir;
        const nc = col + dc;

        if (!inBounds(nr, nc)) continue;

        const target = board[nr][nc];

        if (
            target &&
            target.color !== piece.color
        ) {
            push(nr, nc, {
                capture: true
            });
        }
    }

    // ==========================
    // White En Passant
    // ==========================
    if (
        piece.color === "w" &&
        row === 3 &&
        lastMove &&
        lastMove.piece === "P" &&
        lastMove.color === "b" &&
        lastMove.from.row === 1 &&
        lastMove.to.row === 3
    ) {

        // Enemy pawn on left
        if (
            lastMove.to.col === col - 1 &&
            board[row][col - 1]?.type === "P" &&
            board[row][col - 1]?.color === "b"
        ) {

            push(row - 1, col - 1, {
                enPassant: true,
                capture: true
            });

        }

        // Enemy pawn on right
        if (
            lastMove.to.col === col + 1 &&
            board[row][col + 1]?.type === "P" &&
            board[row][col + 1]?.color === "b"
        ) {

            push(row - 1, col + 1, {
                enPassant: true,
                capture: true
            });

        }
    }

    // ==========================
    // Black En Passant
    // ==========================
    if (
        piece.color === "b" &&
        row === 4 &&
        lastMove &&
        lastMove.piece === "P" &&
        lastMove.color === "w" &&
        lastMove.from.row === 6 &&
        lastMove.to.row === 4
    ) {

        // Enemy pawn on left
        if (
            lastMove.to.col === col - 1 &&
            board[row][col - 1]?.type === "P" &&
            board[row][col - 1]?.color === "w"
        ) {

            push(row + 1, col - 1, {
                enPassant: true,
                capture: true
            });

        }

        // Enemy pawn on right
        if (
            lastMove.to.col === col + 1 &&
            board[row][col + 1]?.type === "P" &&
            board[row][col + 1]?.color === "w"
        ) {

            push(row + 1, col + 1, {
                enPassant: true,
                capture: true
            });

        }
    }
}