import { evaluateMaterial } from "./evaluateMaterial";
import { evaluateMobility } from "./evaluateMobility";
import { evaluateCenter } from "./evaluateCenter";
import { evaluateWolf } from "./evaluateWolf";
import { evaluateDevilPrelate } from "./evaluateDevilPrelate";
import { evaluateKingSafety } from "./evaluateKingSafety";
import { evaluatePawnStructure } from "./evaluatePawnStructure";
import { evaluateRook } from "./evaluateRook";
import { evaluateQueen } from "./evaluateQueen";

export function evaluatePosition(board, lastMove) {

    let score = 0;

    // ==========================
    // Material
    // ==========================
    score += evaluateMaterial(board);

    // ==========================
    // Piece Activity
    // ==========================
    score += evaluateMobility(board, lastMove);
    score += evaluateCenter(board);

    // ==========================
    // Piece-Specific Evaluation
    // ==========================
    score += evaluateWolf(board);
    score += evaluateDevilPrelate(board);
    score += evaluateQueen(board);
    score += evaluateRook(board);

    // ==========================
    // Positional Evaluation
    // ==========================
    score += evaluateKingSafety(board);
    score += evaluatePawnStructure(board);

    return score;
}