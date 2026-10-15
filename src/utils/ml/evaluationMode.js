
import { extractFeatures } from "./extractFeatures";
import { predictRandomForest } from "./randomForest";

export function evaluatePositionForSearch(board, lastMove) {
    return predictRandomForest(extractFeatures(board));
}
