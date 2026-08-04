import { inBounds } from "./boardUtils";
import { applyMove } from "./boardUtils";
import { isKingInCheck } from "./checkLogic";

export function pieceMoves(board, row, col) {
    const piece = board[row][col];

    if (!piece) return [];

    const moves = [];

    const push = (r, c, extra = {}) => {
        if (inBounds(r, c)) {
            moves.push({
                row: r,
                col: c,
                ...extra,
            });
        }
    };

    // Pawn
    if (piece.type === "P") {

        const dir = piece.color === "w" ? -1 : 1;
        const startRow = piece.color === "w" ? 6 : 1;

        // One square
        if (
            inBounds(row + dir, col) &&
            !board[row + dir][col]
        ) {
            push(row + dir, col);

            // Two squares
            if (
                row === startRow &&
                !board[row + 2 * dir][col]
            ) {
                push(row + 2 * dir, col);
            }
        }

        // Captures
        for (const dc of [-1, 1]) {

            const nr = row + dir;
            const nc = col + dc;

            if (!inBounds(nr, nc)) continue;

            const target = board[nr][nc];

            if (
                target &&
                target.color !== piece.color
            ) {
                push(nr, nc, { capture: true });
            }
        }
    }

    // King
    if (piece.type === "K") {

        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        for (const [dr, dc] of directions) {

            const nr = row + dr;
            const nc = col + dc;

            if (!inBounds(nr, nc)) continue;

            const target = board[nr][nc];

            // Empty square
            if (!target) {
                push(nr, nc);
            }

            // Enemy piece
            else if (target.color !== piece.color) {
                push(nr, nc, { capture: true });
            }
        }
        // moves.push(...getCastleMoves(board, row, col));
    }

    // Rook
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
    if (piece.type === "W") {
        wolfMoves(board, row, col, push, piece);
    }

    return moves;
}
function wolfMoves(board, row, col, push, piece) {

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dr, dc] of directions) {

        const squares = [];

        // Collect first 3 squares
        for (let step = 1; step <= 3; step++) {

            const r = row + dr * step;
            const c = col + dc * step;

            if (!inBounds(r, c))
                break;

            squares.push({
                r,
                c,
                piece: board[r][c],
                step
            });
        }

        // ==========================
        // NORMAL MOVEMENT
        // ==========================

        if (squares.length >= 1) {

            const s1 = squares[0];

            if (!s1.piece) {

                push(s1.r, s1.c);

                if (squares.length >= 2) {

                    const s2 = squares[1];

                    if (!s2.piece) {

                        push(s2.r, s2.c);

                    }

                    else if (s2.piece.color !== piece.color) {

                        push(s2.r, s2.c, {
                            capture: true
                        });

                    }
                }
            }

            else if (s1.piece.color !== piece.color) {

                push(s1.r, s1.c, {
                    capture: true
                });

            }
        }

        // ==========================
        // JUMP MOVEMENT
        // ==========================

        let blockerIndex = -1;

        // Find first friendly blocker
        for (let i = 0; i < squares.length; i++) {

            const sq = squares[i];

            if (
                sq.piece &&
                sq.piece.color === piece.color
            ) {
                blockerIndex = i;
                break;
            }

            // Enemy before blocker blocks jumping
            if (
                sq.piece &&
                sq.piece.color !== piece.color
            ) {
                blockerIndex = -1;
                break;
            }
        }

        if (blockerIndex === -1)
            continue;

        // Landing starts immediately after blocker
        for (
            let i = blockerIndex + 1;
            i < squares.length;
            i++
        ) {

            const target = squares[i];

            if (!target.piece) {

                push(target.r, target.c);

            }

            else if (
                target.piece.color !== piece.color
            ) {

                push(target.r, target.c, {
                    capture: true
                });

                // Cannot jump beyond enemy
                break;

            }

            else {

                // Second friendly blocks everything
                break;

            }
        }
    }
}

