import V16GetBestMove from "./V16GetBestMove";
import { useEffect, useRef } from "react";

function V16UseComputer(
  gameDetails,
  chessActions,
  getChessMoves,
  chessMovesReducer,
  options
) {
  const timer = useRef();
  useEffect(() => {
    if (gameDetails.currentSide === !options.startingSide && !checkEnd()) {
      const bestMove = V16GetBestMove(
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

        if (bestMove[3]) {
          chessActions({
            type: "upgrade",
            perk: bestMove[4],
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

export default V16UseComputer;
