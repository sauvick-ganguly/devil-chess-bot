import { inBounds } from "../boardUtils";

import { pawnMoves } from "./pawnMoves";
import { rookMoves } from "./rookMoves";
import { kingMoves } from "./kingMoves";
import { queenMoves } from "./queenmoves";
import { wolfMoves } from "./wolfMoves";
import { devilPrelateMoves } from "./devilPrelateMoves";

export function pieceMoves(board, row, col, lastMove, includeCastle = true) {

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

    switch (piece.type) {

        case "P":
            pawnMoves(board, row, col, push, piece, lastMove);
            break;

        case "R":
            rookMoves(board, row, col, push, piece);
            break;

        case "K":
            kingMoves(board, row, col, push, piece, includeCastle);
            break;

        case "Q":
            queenMoves(board, row, col, push, piece);
            break;

        case "W":
            wolfMoves(board, row, col, push, piece);
            break;

        case "D":
            devilPrelateMoves(
                board,
                row,
                col,
                push,
                piece
            );
            break;

        default:
            break;
    }

    return moves;
}