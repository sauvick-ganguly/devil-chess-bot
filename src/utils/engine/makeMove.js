import { search } from "./search";

export function makeMove(
    board,
    color,
    lastMove
) {

    return search(
        board,
        color,
        lastMove
    );

}