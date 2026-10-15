
import model from "./model.json";

function predictTree(tree, features) {
    let node = 0;

    while (tree.childrenLeft[node] !== -1) {
        const featureIndex = tree.features[node];
        const threshold = tree.thresholds[node];

        if (features[featureIndex] <= threshold) {
            node = tree.childrenLeft[node];
        } else {
            node = tree.childrenRight[node];
        }
    }

    return tree.values[node];
}

export function predictRandomForest(features) {
    if (!model.trees || model.trees.length === 0) {
        throw new Error("Random Forest model has no trees.");
    }

    if (features.length !== model.featureCount) {
        throw new Error(
            `Expected ${model.featureCount} features, received ${features.length}.`
        );
    }

    let total = 0;

    for (const tree of model.trees) {
        total += predictTree(tree, features);
    }

    return total / model.trees.length;
}
