import { zobristTable } from "./zobrist";

export function boardHash(board) {

    let hash = 0;

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece) continue;

            const key =
                piece.color + piece.type;

            hash ^= zobristTable[key][row][col];

            if (piece.revived) {

                hash ^= 0x9e3779b9;

            }

        }

    }

    return hash >>> 0;

}