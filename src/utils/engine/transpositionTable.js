const table = new Map();

export function clearTT() {
    table.clear();
}

export function getTT(key) {
    return table.get(key);
}

export function storeTT(
    key,
    depth,
    score,
    flag,
    bestMove
) {

    table.set(key, {

        depth,
        score,
        flag,
        bestMove

    });

}