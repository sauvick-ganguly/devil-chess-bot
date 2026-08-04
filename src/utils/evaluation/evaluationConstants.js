// ==========================
// Material Values (Centipawns)
// ==========================

export const PIECE_VALUES = {
    P: 100,   // Pawn
    W: 540,   // Wolf
    D: 390,   // Devil Prelate (before revival)
    R: 500,   // Rook
    Q: 900,   // Revived Queen
    K: 0      // King
};

// ==========================
// Wolf Evaluation
// ==========================

export const WOLF = {
    CENTER_CONTROL: 15,
    ENEMY_TERRITORY: 10,
    ATTACKING_KING: 25,
    SUPPORTED_BY_WOLF: 15,
    TRAPPED: -40,
};

// ==========================
// Devil Prelate Evaluation
// ==========================

export const DEVIL_PRELATE = {
    VALUE_AFTER_REVIVAL: 330,
    DIAGONAL_WEIGHT: 4,
    CENTER_BONUS: 15,
    EXTRA_LIFE_BONUS: 25,
};

// ==========================
// Queen Evaluation
// ==========================

export const QUEEN = {
    CENTER_CONTROL: 8,
    MOBILITY: 4,
    ATTACKING_KING: 20,
    OPEN_LINE: 6,
};

// ==========================
// Rook Evaluation
// ==========================

export const ROOK = {
    OPEN_FILE: 25,
    SEVENTH_RANK: 20,
    CONNECTED_ROOK: 20,
};

// ==========================
// Pawn Evaluation
// ==========================

export const PAWN = {
    PASSED: 30,
    CONNECTED: 10,
    ISOLATED: -15,
    DOUBLED: -10,
};

// ==========================
// King Evaluation
// ==========================

export const KING = {
    SAFE: 20,
    EXPOSED: -30,
    BOTH_SAFE: 25,
    BOTH_EXPOSED: -80,
};

// ==========================
// General Evaluation Weights
// ==========================

export const EVALUATION = {
    MOBILITY_WEIGHT: 3,
    CENTER_CONTROL_WEIGHT: 5,
};