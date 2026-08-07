import { search } from "./search";

export function makeMove(
    board,
    color,
    lastMove
) {

    return iterativeDeepening(
        board,
        color,
        lastMove
    );

}