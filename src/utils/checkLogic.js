import { pieceMoves } from "./moveLogic";
import { applyMove } from "./boardUtils";

export function isKingInCheck(board, color) {

    const kings = [];

    // Find all kings of the given color
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (
                piece &&
                piece.type === "K" &&
                piece.color === color
            ) {
                kings.push({ row, col });
            }
        }
    }

    const enemyColor = color === "w" ? "b" : "w";

    // Generate all enemy moves
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece || piece.color !== enemyColor)
                continue;

            const moves = pieceMoves(board, row, col, null, false);

            // See if any move attacks a king
            for (const move of moves) {
                for (const king of kings) {

                    if (
                        move.row === king.row &&
                        move.col === king.col
                    ) {
                        return true;
                    }

                }
            }
        }
    }

    return false;
}

export function countKingsInCheck(board, color) {

    const kings = [];

    // Find all kings of the given color
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (
                piece &&
                piece.type === "K" &&
                piece.color === color
            ) {
                kings.push({ row, col });
            }
        }
    }

    const enemyColor = color === "w" ? "b" : "w";

    let checkedKings = 0;

    // Check each king separately
    for (const king of kings) {

        let attacked = false;

        for (let row = 0; row < 8 && !attacked; row++) {
            for (let col = 0; col < 8 && !attacked; col++) {

                const piece = board[row][col];

                if (!piece || piece.color !== enemyColor)
                    continue;

                const moves = pieceMoves(board, row, col, null, false);

                for (const move of moves) {

                    if (
                        move.row === king.row &&
                        move.col === king.col
                    ) {
                        checkedKings++;
                        attacked = true;
                        break;
                    }
                }
            }
        }
    }

    return checkedKings;
}

export function getKings(board, color) {

    const kings = [];

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (
                piece &&
                piece.type === "K" &&
                piece.color === color
            ) {
                kings.push({
                    row,
                    col,
                    id: piece.id
                });
            }
        }
    }

    return kings;
}

export function isSpecificKingInCheck(board, color, kingRow, kingCol) {

    const enemyColor = color === "w" ? "b" : "w";

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece || piece.color !== enemyColor)
                continue;

            const moves = pieceMoves(board, row, col, null, false);

            for (const move of moves) {

                if (
                    move.row === kingRow &&
                    move.col === kingCol
                ) {
                    return true;
                }
            }
        }
    }

    return false;
}

export function isSpecificKingCheckmated(board, color, kingId) {

    // Find the king we are checking
    const currentKing = getKings(board, color).find(
        king => king.id === kingId
    );

    if (!currentKing) {
        return false;
    }

    // If this king is not in check, it cannot be checkmated
    if (
        !isSpecificKingInCheck(
            board,
            color,
            currentKing.row,
            currentKing.col
        )
    ) {
        return false;
    }

    // Try every move of every friendly piece
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece || piece.color !== color)
                continue;

            const moves = pieceMoves(board, row, col, null, false);

            for (const move of moves) {

                const newBoard = applyMove(
                    board,
                    row,
                    col,
                    move.row,
                    move.col
                );

                // Find the same king after the move
                const movedKing = getKings(newBoard, color).find(
                    king => king.id === kingId
                );

                // If the king was captured (shouldn't happen), skip
                if (!movedKing)
                    continue;

                // If this move makes the king safe,
                // then it is NOT checkmated.
                if (
                    !isSpecificKingInCheck(
                        newBoard,
                        color,
                        movedKing.row,
                        movedKing.col
                    )
                ) {
                    return false;
                }
            }
        }
    }

    // No move can save this king
    return true;
}