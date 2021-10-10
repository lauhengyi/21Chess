import V15GetBestMove from "./V15GetBestMove";
import { useEffect, useRef } from "react";

function V15UseComputer(
  gameDetails,
  chessActions,
  getChessMoves,
  chessMovesReducer,
  options
) {
  const timer = useRef();
  useEffect(() => {
    if (gameDetails.currentSide === !options.startingSide && !checkEnd()) {
      const bestMove = V15GetBestMove(
        gameDetails,
        getChessMoves,
        chessMovesReducer,
        options.diff
      );
      timer.current = setTimeout(() => {
        if (bestMove[3]) {
          chessActions({
            type: "purchase",
            order: bestMove[0],
          });
        }
        chessActions({
          type: "makeTurn",
          move: bestMove[0],
          castling: bestMove[1],
        });
        //Promote for promotional moves
        if (bestMove[2]) {
          chessActions({
            type: "promotion",
            move: [bestMove[0][0], "q"],
          });
        }
      }, 200);
    }
    return () => clearTimeout(timer.current);
  }, [gameDetails.boardLayout]);

  function checkEnd() {
    return (
      gameDetails.checkmated || gameDetails.stalemated || gameDetails.repetition
    );
  }
}

export default V15UseComputer;
