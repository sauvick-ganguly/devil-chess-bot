import whiteWolf from "../assets/white/whiteWolf.png";
import blackWolf from "../assets/black/blackWolf.png";

import whiteRook from "../assets/white/whiteRook.png";
import blackRook from "../assets/black/blackRook.png";

function PromotionModal({ isOpen, onSelect, color }) {

    if (!isOpen) return null;

    const wolfImage = color === "w" ? whiteWolf : blackWolf;
    const rookImage = color === "w" ? whiteRook : blackRook;

    return (
        <div className="modal-overlay">
            <div className="promotion-modal">

                <h2>Choose Promotion</h2>

                <button onClick={() => onSelect("W")}>
                    <img className="promotion-piece" src={wolfImage} alt="Wolf" />
                    Wolf
                </button>

                <button onClick={() => onSelect("R")}>
                    <img className="promotion-piece" src={rookImage} alt="Rook" />
                    Rook
                </button>

            </div>
        </div>
    );
}

export default PromotionModal;