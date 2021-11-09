import V21GetBestMove from "./V21GetBestMove";
import { useEffect, useRef } from "react";

function V21UseComputer(
  gameDetails,
  chessActions,
  getChessMoves,
  chessMovesReducer,
  options
) {
  const timer = useRef();
  useEffect(() => {
    if (gameDetails.currentSide === !options.startingSide && !checkEnd()) {
      const bestMove = V21GetBestMove(
        gameDetails,
        getChessMoves,
        chessMovesReducer,
        options.diff
      );
      timer.current = setTimeout(() => {
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

export default V21UseComputer;
