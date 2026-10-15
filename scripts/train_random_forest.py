
import json
import os
import pandas as pd

from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

# ==========================================
# File paths
# ==========================================

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATASET = os.path.join(
    PROJECT_ROOT,
    "training_positions.csv"
)

OUTPUT = os.path.join(
    PROJECT_ROOT,
    "src",
    "utils",
    "ml",
    "model.json"
)

# ==========================================
# Feature columns (must match extractFeatures.js)
# ==========================================

FEATURE_COLUMNS = [
    "whiteMaterial",
    "blackMaterial",
    "whitePawns",
    "blackPawns",
    "whiteWolves",
    "blackWolves",
    "whitePrelates",
    "blackPrelates",
    "whiteRooks",
    "blackRooks",
    "whiteQueens",
    "blackQueens",
    "whiteKingCount",
    "blackKingCount",
    "whiteCenter",
    "blackCenter",
    "whiteAdvancement",
    "blackAdvancement",
    "whiteRevivedPrelates",
    "blackRevivedPrelates",
]

# ==========================================
# Load dataset
# ==========================================

if not os.path.exists(DATASET):
    raise FileNotFoundError(
        f"Dataset not found: {DATASET}\n"
        "Generate training_positions.csv first."
    )

df = pd.read_csv(DATASET)

required_columns = FEATURE_COLUMNS + ["targetScore"]

missing = [
    column for column in required_columns
    if column not in df.columns
]

if missing:
    raise ValueError(
        f"Missing CSV columns: {missing}"
    )

df = df[required_columns].dropna()

if len(df) < 10:
    raise ValueError(
        f"Only {len(df)} valid rows found. "
        "Generate more training positions."
    )

X = df[FEATURE_COLUMNS].to_numpy(dtype=float)
y = df["targetScore"].to_numpy(dtype=float)

# ==========================================
# Split training and testing data
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42
)

# ==========================================
# Train Random Forest
# ==========================================

model = RandomForestRegressor(
    n_estimators=50,
    max_depth=8,
    min_samples_leaf=3,
    random_state=42,
    n_jobs=-1
)

print("Training Random Forest...")
model.fit(X_train, y_train)

# ==========================================
# Evaluate model
# ==========================================

predictions = model.predict(X_test)

mae = mean_absolute_error(y_test, predictions)

print(f"Training positions: {len(X_train)}")
print(f"Testing positions:  {len(X_test)}")
print(f"Mean Absolute Error: {mae:.2f} centipawns")

# ==========================================
# Export each tree to JSON
# ==========================================

def export_tree(estimator):
    tree = estimator.tree_

    return {
        "childrenLeft": tree.children_left.tolist(),
        "childrenRight": tree.children_right.tolist(),
        "features": tree.feature.tolist(),
        "thresholds": tree.threshold.tolist(),
        "values": tree.value[:, 0, 0].tolist(),
    }


exported_model = {
    "featureCount": len(FEATURE_COLUMNS),
    "trees": [
        export_tree(tree)
        for tree in model.estimators_
    ],
}

# ==========================================
# Save model
# ==========================================

os.makedirs(
    os.path.dirname(OUTPUT),
    exist_ok=True
)

with open(OUTPUT, "w", encoding="utf-8") as file:
    json.dump(exported_model, file)

print("\nRandom Forest trained successfully!")
print(f"Model saved to: {OUTPUT}")
