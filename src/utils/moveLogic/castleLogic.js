import { applyMove } from "../boardUtils";
import { isKingInCheck } from "../checkLogic";

export function castleMoves(board, row, col, push, piece) {

    // Only kings can castle
    if (piece.type !== "K")
        return;

    // King already moved
    if (piece.hasMoved)
        return;

    // King cannot castle while in check
    if (isKingInCheck(board, piece.color))
        return;

    const directions = [-1, 1]; // Left and Right

    for (const dir of directions) {

        let rookCol = col + dir;

        // Search for rook
        while (rookCol >= 0 && rookCol < 8) {

            const target = board[row][rookCol];

            // Empty square → continue searching
            if (!target) {
                rookCol += dir;
                continue;
            }

            // Friendly rook found
            if (
                target.type === "R" &&
                target.color === piece.color &&
                !target.hasMoved
            ) {

                // Check every square between king and rook is empty
                let clear = true;

                for (
                    let c = col + dir;
                    c !== rookCol;
                    c += dir
                ) {
                    if (board[row][c] !== null) {
                        clear = false;
                        break;
                    }
                }

                if (!clear)
                    break;

                // King's destination
                const kingToCol = col + 2 * dir;

                // Stay inside board
                if (kingToCol < 0 || kingToCol > 7)
                    break;

                // Destination must be empty
                if (board[row][kingToCol] !== null)
                    break;

                // Check intermediate square
                const intermediateBoard = applyMove(
                    board,
                    row,
                    col,
                    row,
                    col + dir
                );

                if (isKingInCheck(intermediateBoard, piece.color))
                    break;

                // Check final square
                const finalBoard = applyMove(
                    board,
                    row,
                    col,
                    row,
                    kingToCol
                );

                if (isKingInCheck(finalBoard, piece.color))
                    break;

                // Castling move
                push(row, kingToCol, {
                    castle: true,
                    rookFrom: {
                        row,
                        col: rookCol
                    },
                    rookTo: {
                        row,
                        col: col + dir
                    }
                });

                break;
            }

            // Any other piece blocks the search
            break;
        }
    }
}