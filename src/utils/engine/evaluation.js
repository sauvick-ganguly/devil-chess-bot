import { alphaBeta } from "./alphaBeta";

const DEFAULT_DEPTH = 3;

export function evaluateWithEngine(
    board,
    turn,
    lastMove,
    depth = DEFAULT_DEPTH
) {

    return alphaBeta(
        board,
        depth,
        -Infinity,
        Infinity,
        turn === "w",
        lastMove
    );

}