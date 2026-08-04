export function inBounds(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
}

export function applyMove(
    board,
    fromRow,
    fromCol,
    toRow,
    toCol,
    move = null
) {

    const newBoard = board.map(row => [...row]);

    const movingPiece = {
        ...newBoard[fromRow][fromCol],
        hasMoved: true,
    };
    const capturedPiece = newBoard[toRow][toCol];
    // Move the piece
    newBoard[toRow][toCol] = movingPiece;
    newBoard[fromRow][fromCol] = null;

    // ==========================
    // En Passant
    // ==========================
    if (move?.enPassant) {

        if (movingPiece.color === "w") {

            // Remove the black pawn
            newBoard[toRow + 1][toCol] = null;

        } else {

            // Remove the white pawn
            newBoard[toRow - 1][toCol] = null;

        }
    }

    // ==========================
    // Castling
    // ==========================
    if (move?.castle) {

        const rook = {
            ...newBoard[move.rookFrom.row][move.rookFrom.col],
            hasMoved: true,
        };

        newBoard[move.rookTo.row][move.rookTo.col] = rook;
        newBoard[move.rookFrom.row][move.rookFrom.col] = null;
    }
    // ==========================
    // Devil's Prelate Respawn
    // ==========================
    if (
        capturedPiece &&
        capturedPiece.type === "D" &&
        !capturedPiece.revived
    ) {
        const { row, col } = capturedPiece.home;

        if (newBoard[row][col] === null) {
            newBoard[row][col] = {
                ...capturedPiece,
                revived: true,
            };
        }
    }
    return newBoard;
}