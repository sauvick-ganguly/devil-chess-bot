import { useEffect, useMemo, useState } from "react";
import Piece from "./Piece";

function AnimatedPiece({
    piece,
    from,
    to,
    squareSize,
    flipped
}) {

    const [transform, setTransform] = useState("translate(0%, 0%)");

    const displayFrom = useMemo(() => {

        if (!flipped) return from;

        return {
            row: 7 - from.row,
            col: 7 - from.col
        };

    }, [from, flipped]);

    const displayTo = useMemo(() => {

        if (!flipped) return to;

        return {
            row: 7 - to.row,
            col: 7 - to.col
        };

    }, [to, flipped]);

    useEffect(() => {

        setTransform("translate(0%, 0%)");

        requestAnimationFrame(() => {

            const dx = (displayTo.col - displayFrom.col) * 100;
            const dy = (displayTo.row - displayFrom.row) * 100;

            setTransform(`translate(${dx}%, ${dy}%)`);

        });

    }, [displayFrom, displayTo]);

    return (
        <div
            className="animated-piece"
            style={{
                left: `${displayFrom.col * squareSize}%`,
                top: `${displayFrom.row * squareSize}%`,
                transform
            }}
        >
            <Piece piece={piece} />
        </div>
    );
}

export default AnimatedPiece;