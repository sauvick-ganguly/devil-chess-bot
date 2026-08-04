const CENTER_WEIGHT = 10;

const CENTER_SQUARES = [
    [3, 3],
    [3, 4],
    [4, 3],
    [4, 4],
];

const EXTENDED_CENTER = [
    [2, 2], [2, 3], [2, 4], [2, 5],
    [3, 2],                 [3, 5],
    [4, 2],                 [4, 5],
    [5, 2], [5, 3], [5, 4], [5, 5],
];

export function evaluateCenter(board) {

    let score = 0;

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece) continue;

            let value = 0;

            if (
                CENTER_SQUARES.some(
                    ([r, c]) => r === row && c === col
                )
            ) {
                value = 2 * CENTER_WEIGHT;
            }

            else if (
                EXTENDED_CENTER.some(
                    ([r, c]) => r === row && c === col
                )
            ) {
                value = CENTER_WEIGHT;
            }

            if (piece.color === "w") {
                score += value;
            }
            else {
                score -= value;
            }

        }

    }

    return score;

}