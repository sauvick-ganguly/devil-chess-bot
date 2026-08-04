function Square({
    isLight,
    children,
    row,
    col,
    onClick,
    selected,
    legalMove,
    captureMove,
    lastMove,
    check,
}) {

    const isLastMove =
        lastMove &&
        (
            (lastMove.from.row === row &&
                lastMove.from.col === col) ||

            (lastMove.to.row === row &&
                lastMove.to.col === col)
        );

    return (
        <div
            className={`sq
                ${isLight ? "light" : "dark"}
                ${isLastMove ? "last-move" : ""}
                ${selected ? "selected" : ""}
                ${legalMove ? "legal" : ""}
                ${captureMove ? "capture" : ""}
                ${check ? "check" : ""}
            `}
            style={{
                
            }}
            onClick={() => onClick(row, col)}
        >
            {children}
        </div>
    );
}

export default Square;