
const PIECE_VALUES = {
    P: 100,
    W: 540,
    D: 390,
    R: 500,
    Q: 900,
    K: 0,
};

export function extractFeatures(board) {
    const features = {
        whiteMaterial: 0,
        blackMaterial: 0,
        whitePawns: 0,
        blackPawns: 0,
        whiteWolves: 0,
        blackWolves: 0,
        whitePrelates: 0,
        blackPrelates: 0,
        whiteRooks: 0,
        blackRooks: 0,
        whiteQueens: 0,
        blackQueens: 0,
        whiteKingCount: 0,
        blackKingCount: 0,
        whiteCenter: 0,
        blackCenter: 0,
        whiteAdvancement: 0,
        blackAdvancement: 0,
        whiteRevivedPrelates: 0,
        blackRevivedPrelates: 0,
    };

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];

            if (!piece) continue;

            const white = piece.color === "w";
            const prefix = white ? "white" : "black";

            let value = PIECE_VALUES[piece.type] ?? 0;

            if (piece.type === "D" && piece.revived === true) {
                value = 330;
                features[`${prefix}RevivedPrelates`]++;
            }

            features[`${prefix}Material`] += value;

            const countKey = {
                P: "Pawns",
                W: "Wolves",
                D: "Prelates",
                R: "Rooks",
                Q: "Queens",
                K: "KingCount",
            }[piece.type];

            if (countKey) {
                features[`${prefix}${countKey}`]++;
            }

            // Center control proxy: pieces occupying the four central squares.
            if (
                (row === 3 || row === 4) &&
                (col === 3 || col === 4)
            ) {
                features[`${prefix}Center`] += 1;
            }

            // Relative pawn advancement.
            if (piece.type === "P") {
                features[`${prefix}Advancement`] +=
                    white ? 6 - row : row - 1;
            }
        }
    }

    return [
        features.whiteMaterial,
        features.blackMaterial,
        features.whitePawns,
        features.blackPawns,
        features.whiteWolves,
        features.blackWolves,
        features.whitePrelates,
        features.blackPrelates,
        features.whiteRooks,
        features.blackRooks,
        features.whiteQueens,
        features.blackQueens,
        features.whiteKingCount,
        features.blackKingCount,
        features.whiteCenter,
        features.blackCenter,
        features.whiteAdvancement,
        features.blackAdvancement,
        features.whiteRevivedPrelates,
        features.blackRevivedPrelates,
    ];
}
