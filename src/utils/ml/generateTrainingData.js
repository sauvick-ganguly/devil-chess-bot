
import { generateLegalMoves } from "../engine/moveGenerator";
import { applyMove } from "../gameLogic";
import { evaluatePosition } from "../evaluation/evaluation";
import { extractFeatures } from "./extractFeatures";

const FEATURE_COLUMNS = [
    "whiteMaterial", "blackMaterial",
    "whitePawns", "blackPawns",
    "whiteWolves", "blackWolves",
    "whitePrelates", "blackPrelates",
    "whiteRooks", "blackRooks",
    "whiteQueens", "blackQueens",
    "whiteKingCount", "blackKingCount",
    "whiteCenter", "blackCenter",
    "whiteAdvancement", "blackAdvancement",
    "whiteRevivedPrelates", "blackRevivedPrelates",
];

export function generateTrainingData(
    initialBoard,
    initialTurn = "w",
    games = 100,
    maxPlies = 50
) {
    const rows = [];

    for (let game = 0; game < games; game++) {
        let board = initialBoard.map(row =>
            row.map(piece =>
                piece ? { ...piece } : null
            )
        );

        let turn = initialTurn;
        let lastMove = null;

        for (let ply = 0; ply < maxPlies; ply++) {
            // Save this position before making the next move.
            const features = extractFeatures(board);
            const targetScore = evaluatePosition(board, lastMove);

            rows.push([...features, targetScore]);

            const legalMoves = generateLegalMoves(
                board,
                turn,
                lastMove
            );

            if (legalMoves.length === 0) {
                break;
            }

            // Random legal play creates varied training positions.
            const chosen =
                legalMoves[
                    Math.floor(Math.random() * legalMoves.length)
                ];

            board = applyMove(
                board,
                chosen.fromRow,
                chosen.fromCol,
                chosen.toRow,
                chosen.toCol,
                chosen.move
            );

            lastMove = chosen.move;
            turn = turn === "w" ? "b" : "w";
        }
    }

    return [
        [...FEATURE_COLUMNS, "targetScore"].join(","),
        ...rows.map(row => row.join(","))
    ].join("\n");
}

export function downloadTrainingData(
    board,
    turn = "w",
    games = 100,
    maxPlies = 50
) {
    const csv = generateTrainingData(
        board,
        turn,
        games,
        maxPlies
    );

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "training_positions.csv";
    link.click();

    URL.revokeObjectURL(url);

    console.log("Training dataset generated.");
}
