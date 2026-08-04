import { pieceMoves } from "./moveLogic";
import { applyMove } from "./boardUtils";
import {
    isKingInCheck,
    countKingsInCheck,
    getKings,
    isSpecificKingCheckmated
} from "./checkLogic";

// Returns true if there exists at least one move
// after which BOTH Kings are safe.
export function hasEscapeMove(board, color) {

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece || piece.color !== color)
                continue;

            const moves = pieceMoves(board, row, col);

            for (const move of moves) {

                const newBoard = applyMove(
                    board,
                    row,
                    col,
                    move.row,
                    move.col,
                    move
                );

                if (!isKingInCheck(newBoard, color)) {
                    return true;
                }
            }
        }
    }

    return false;
}

// Returns true if the player has at least one legal move.
export function hasAnyLegalMove(board, color) {

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece || piece.color !== color)
                continue;

            const moves = pieceMoves(board, row, col);

            for (const move of moves) {

                const newBoard = applyMove(
                    board,
                    row,
                    col,
                    move.row,
                    move.col,
                    move
                );

                if (!isKingInCheck(newBoard, color)) {
                    return true;
                }
            }
        }
    }

    return false;
}

function hasQueen(board, color) {

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (
                piece &&
                piece.type === "Q" &&
                piece.color === color
            ) {
                return true;
            }
        }
    }

    return false;
}
export function getGameStatus(board, turn) {

    // ==========================================
    // REVIVAL PHASE (Normal Chess Rules)
    // ==========================================
    const whiteRevived = hasQueen(board, "w");
    const blackRevived = hasQueen(board, "b");


    // ==========================================
    // DEVIL PHASE (Original Twin King Rules)
    // ==========================================

    // Rule 1 : Individual Checkmate

    if (!whiteRevived) {

    const whiteKings = getKings(board, "w");

    for (const king of whiteKings) {

        if (isSpecificKingCheckmated(board, "w", king.id)) {

            return {
                gameOver: true,
                winner: "b",
                draw: false,
                reason: "Checkmate"
            };
        }
    }

}
else {

    if (
        isKingInCheck(board, "w") &&
        !hasEscapeMove(board, "w")
    ) {
        return {
            gameOver: true,
            winner: "b",
            draw: false,
            reason: "Checkmate"
        };
    }

}

    if (!blackRevived) {

    const blackKings = getKings(board, "b");

    for (const king of blackKings) {

        if (isSpecificKingCheckmated(board, "b", king.id)) {

            return {
                gameOver: true,
                winner: "w",
                draw: false,
                reason: "Checkmate"
            };
        }
    }
}
else {

    if (
        isKingInCheck(board, "b") &&
        !hasEscapeMove(board, "b")
    ) {
        return {
            gameOver: true,
            winner: "w",
            draw: false,
            reason: "Checkmate"
        };
    }

}

    // Rule 2 & Rule 3

    const whiteChecks = countKingsInCheck(board, "w");
    const blackChecks = countKingsInCheck(board, "b");

    if (
        whiteChecks > 0 &&
        !hasEscapeMove(board, "w")
    ) {
        return {
            gameOver: true,
            winner: "b",
            draw: false,
            reason: "Checkmate"
        };
    }

    if (
        blackChecks > 0 &&
        !hasEscapeMove(board, "b")
    ) {
        return {
            gameOver: true,
            winner: "w",
            draw: false,
            reason: "Checkmate"
        };
    }

    // Rule 4 : Stalemate

    if (turn === "w") {

        if (
            !isKingInCheck(board, "w") &&
            !hasAnyLegalMove(board, "w")
        ) {
            return {
                gameOver: true,
                winner: null,
                draw: true,
                reason: "Stalemate"
            };
        }

    } else {

        if (
            !isKingInCheck(board, "b") &&
            !hasAnyLegalMove(board, "b")
        ) {
            return {
                gameOver: true,
                winner: null,
                draw: true,
                reason: "Stalemate"
            };
        }
    }

    return {
        gameOver: false,
        winner: null,
        draw: false,
        reason: null
    };
}

export function getCheckNotation(board, color, turn, gamePhase) {

    const checks = countKingsInCheck(board, color);

    const status = getGameStatus(
        board,
        turn
    );

    return {
        check: checks > 0 && !status.gameOver,
        checkmate: status.gameOver && !status.draw
    };
}