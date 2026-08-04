import { ROOK } from "./evaluationConstants";

export function evaluateRook(board) {

    let score = 0;

    const rooks = {
        w: [],
        b: [],
    };

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece || piece.type !== "R") continue;

            rooks[piece.color].push({ row, col });

            let value = 0;

            // Open File
            let hasPawn = false;

            for (let r = 0; r < 8; r++) {

                const current = board[r][col];

                if (current && current.type === "P") {
                    hasPawn = true;
                    break;
                }

            }

            if (!hasPawn) {
                value += ROOK.OPEN_FILE;
            }

            // Seventh Rank
            if (
                (piece.color === "w" && row === 1) ||
                (piece.color === "b" && row === 6)
            ) {
                value += ROOK.SEVENTH_RANK;
            }

            if (piece.color === "w") {
                score += value;
            }
            else {
                score -= value;
            }

        }

    }

    // Connected Rooks
    for (const color of ["w", "b"]) {

        if (rooks[color].length !== 2) continue;

        const [r1, r2] = rooks[color];

        if (r1.row === r2.row) {

            let blocked = false;

            const start = Math.min(r1.col, r2.col) + 1;
            const end = Math.max(r1.col, r2.col);

            for (let c = start; c < end; c++) {

                if (board[r1.row][c]) {
                    blocked = true;
                    break;
                }

            }

            if (!blocked) {
                score += color === "w"
                    ? ROOK.CONNECTED_ROOK
                    : -ROOK.CONNECTED_ROOK;
            }

        }

        else if (r1.col === r2.col) {

            let blocked = false;

            const start = Math.min(r1.row, r2.row) + 1;
            const end = Math.max(r1.row, r2.row);

            for (let r = start; r < end; r++) {

                if (board[r][r1.col]) {
                    blocked = true;
                    break;
                }

            }

            if (!blocked) {
                score += color === "w"
                    ? ROOK.CONNECTED_ROOK
                    : -ROOK.CONNECTED_ROOK;
            }

        }

    }

    return score;

}