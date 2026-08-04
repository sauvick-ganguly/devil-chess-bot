import { PAWN } from "./evaluationConstants";

export function evaluatePawnStructure(board) {

    let score = 0;

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece || piece.type !== "P") continue;

            let value = 0;

            // -------------------------
            // Connected Pawn
            // -------------------------

            let connected = false;

            for (const c of [col - 1, col + 1]) {

                if (c < 0 || c > 7) continue;

                const sameRank = board[row][c];

                if (
                    sameRank &&
                    sameRank.type === "P" &&
                    sameRank.color === piece.color
                ) {
                    connected = true;
                }

                const forwardRow =
                    piece.color === "w" ? row - 1 : row + 1;

                if (
                    forwardRow >= 0 &&
                    forwardRow < 8
                ) {

                    const diagonal = board[forwardRow][c];

                    if (
                        diagonal &&
                        diagonal.type === "P" &&
                        diagonal.color === piece.color
                    ) {
                        connected = true;
                    }

                }

            }

            if (connected) {
                value += PAWN.CONNECTED;
            }

            // -------------------------
            // Isolated Pawn
            // -------------------------

            let isolated = true;

            for (const c of [col - 1, col + 1]) {

                if (c < 0 || c > 7) continue;

                for (let r = 0; r < 8; r++) {

                    const current = board[r][c];

                    if (
                        current &&
                        current.type === "P" &&
                        current.color === piece.color
                    ) {
                        isolated = false;
                        break;
                    }

                }

                if (!isolated) break;

            }

            if (isolated) {
                value += PAWN.ISOLATED;
            }

            // -------------------------
            // Doubled Pawn
            // -------------------------

            let doubled = false;

            for (let r = 0; r < 8; r++) {

                if (r === row) continue;

                const current = board[r][col];

                if (
                    current &&
                    current.type === "P" &&
                    current.color === piece.color
                ) {
                    doubled = true;
                    break;
                }

            }

            if (doubled) {
                value += PAWN.DOUBLED;
            }

            // -------------------------
            // Passed Pawn
            // -------------------------

            let passed = true;

            if (piece.color === "w") {

                for (let r = row - 1; r >= 0 && passed; r--) {

                    for (let c = col - 1; c <= col + 1; c++) {

                        if (c < 0 || c > 7) continue;

                        const current = board[r][c];

                        if (
                            current &&
                            current.type === "P" &&
                            current.color === "b"
                        ) {
                            passed = false;
                            break;
                        }

                    }

                }

            }
            else {

                for (let r = row + 1; r < 8 && passed; r++) {

                    for (let c = col - 1; c <= col + 1; c++) {

                        if (c < 0 || c > 7) continue;

                        const current = board[r][c];

                        if (
                            current &&
                            current.type === "P" &&
                            current.color === "w"
                        ) {
                            passed = false;
                            break;
                        }

                    }

                }

            }

            if (passed) {
                value += PAWN.PASSED;
            }

            if (piece.color === "w") {
                score += value;
            } else {
                score -= value;
            }

        }

    }

    return score;

}