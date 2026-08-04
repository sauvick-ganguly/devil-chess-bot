export function boardHash(board) {

    let hash = "";

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece) {
                hash += ".";
                continue;
            }

            hash +=
                piece.color +
                piece.type;

            if (piece.revived)
                hash += "R";

        }

    }

    return hash;

}