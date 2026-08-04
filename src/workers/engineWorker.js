import { evaluateWithEngine } from "../utils/engine/evaluation";

self.onmessage = (event) => {

    const {
        board,
        turn,
        lastMove,
        depth,
    } = event.data;

    const score = evaluateWithEngine(
        board,
        turn,
        lastMove,
        depth
    );

    self.postMessage(score);

};