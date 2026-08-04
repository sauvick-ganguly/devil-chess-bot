export function toChessSquare(row, col) {

    const file = String.fromCharCode(97 + col);

    const rank = 8 - row;

    return file + rank;
}

export function moveToNotation({
    piece,
    from,
    to,
    captured,
    promotion = null,
    check = false,
    checkmate = false
}) {

    const pieceLetter = {
        P: "",
        R: "R",
        W: "W",
        K: "K",
        Q: "Q",
        D: "D",
    };

    let notation = "";

    if (piece === "P") {

        if (captured) {

            notation = from[0] + "x" + to;

        } else {

            notation = to;

        }

    } else {

        if (captured) {

            notation =
                pieceLetter[piece] +
                "x" +
                to;

        } else {

            notation =
                pieceLetter[piece] +
                to;

        }

    }
    if (promotion) {
        notation += "=" + promotion;
    }

    if (checkmate) {

        notation += "#";

    } else if (check) {

        notation += "+";

    }

    return notation;
}