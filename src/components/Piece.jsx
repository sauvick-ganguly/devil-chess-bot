import React from "react";

import blackPawn from "../assets/black/blackPawn.png";
import whitePawn from "../assets/white/whitePawn.png";

import blackRook from "../assets/black/blackRook.png";
import whiteRook from "../assets/white/whiteRook.png";

import blackWolf from "../assets/black/blackWolf.png";
import whiteWolf from "../assets/white/whiteWolf.png";

import blackKing1 from "../assets/black/blackKing1.png"; // Normal Cross
import blackKing2 from "../assets/black/blackKing2.png"; // Inverted Cross

import blackQueen from "../assets/black/blackQueen.png";
import whiteQueen from "../assets/white/whiteQueen.png";

import whiteKing1 from "../assets/white/whiteKing1.png"; // Normal Cross
import whiteKing2 from "../assets/white/whiteKing2.png"; // Inverted Cross

import blackDevilPrelate from "../assets/black/blackDevilPrelate.png";
import whiteDevilPrelate from "../assets/white/whiteDevilPrelate.png";

function Piece({ piece }) {
  if (!piece) return null;

  let image = null;

  switch (piece.type) {

    case "P":
      image = piece.color === "w"
        ? whitePawn
        : blackPawn;
      break;

    case "R":
      image = piece.color === "w"
        ? whiteRook
        : blackRook;
      break;

    case "W":
      image = piece.color === "w"
        ? whiteWolf
        : blackWolf;
      break;

    case "D":
      image = piece.color === "w"
        ? whiteDevilPrelate
        : blackDevilPrelate;
      break;

    case "K":
      if (piece.color === "w") {
        image =
          piece.id === 2
            ? whiteKing1
            : whiteKing2;
      } else {
        image =
          piece.id === 2
            ? blackKing1
            : blackKing2;
      }
      break;

    case "Q":
      image = piece.color === "w"
        ? whiteQueen
        : blackQueen;
      break;

    default:
      return null;
  }

  return (
    <img
      src={image}
      alt={`${piece.color}-${piece.type}`}
      className="piece-image"
      draggable={false}
    />
  );
}

export default Piece;