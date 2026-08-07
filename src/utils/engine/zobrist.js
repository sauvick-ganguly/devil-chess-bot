const PIECES = [
    "wP",
    "wR",
    "wW",
    "wD",
    "wK",

    "bP",
    "bR",
    "bW",
    "bD",
    "bK",
];

const zobristTable = {};

for (const piece of PIECES) {

    zobristTable[piece] = [];

    for (let row = 0; row < 8; row++) {

        zobristTable[piece][row] = [];

        for (let col = 0; col < 8; col++) {

            zobristTable[piece][row][col] =
                Math.floor(Math.random() * 0xffffffff);

        }

    }

}

export { zobristTable };