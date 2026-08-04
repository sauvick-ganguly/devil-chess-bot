export function createInitialBoard() {

    const board = Array.from(
        { length: 8 },
        () => Array(8).fill(null)
    );

    const backRank = [
        "R", "W", "D", "K",
        "K", "D", "W", "R"
    ];

    for (let col = 0; col < 8; col++) {

        // ==========================
        // Black Back Rank
        // ==========================
        board[0][col] = {
            type: backRank[col],
            color: "b",
            hasMoved: false,
        };

        if (backRank[col] === "K") {
            board[0][col].id = (col === 3) ? 1 : 2;
        }

        if (backRank[col] === "D") {
            board[0][col].revived = false;
            board[0][col].home = {
                row: 0,
                col
            };
        }

        // ==========================
        // Black Pawns
        // ==========================
        board[1][col] = {
            type: "P",
            color: "b",
        };

        // ==========================
        // White Pawns
        // ==========================
        board[6][col] = {
            type: "P",
            color: "w",
        };

        // ==========================
        // White Back Rank
        // ==========================
        board[7][col] = {
            type: backRank[col],
            color: "w",
            hasMoved: false,
        };

        if (backRank[col] === "K") {
            board[7][col].id = (col === 3) ? 1 : 2;
        }

        if (backRank[col] === "D") {
            board[7][col].revived = false;
            board[7][col].home = {
                row: 7,
                col
            };
        }
    }

    return board;
}