import { inBounds } from "../boardUtils";

export function wolfMoves(board, row, col, push, piece) {

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
        for (let i = blockerIndex + 1; i < squares.length; i++) {

            const target = squares[i];

            if (!target.piece) {

                push(target.r, target.c);

            }

            else if (target.piece.color !== piece.color) {

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