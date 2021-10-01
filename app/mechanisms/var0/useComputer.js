import getBestMove from "./getBestMove";
import { useEffect } from "react";
import "react-native-console-time-polyfill";

function useComputer(
  gameDetails,
  chessActions,
  getChessMoves,
  chessMovesReducer,
  options
) {
  useEffect(() => {
    if (gameDetails.currentSide === !options.startingSide && !checkEnd()) {
      const bestMove = getBestMove(
        gameDetails,
        getChessMoves,
        chessMovesReducer,
        options.diff
      );
      setTimeout(() => {
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
  }, [gameDetails.boardLayout]);

  function checkEnd() {
    return (
      gameDetails.checkmated || gameDetails.stalemated || gameDetails.repetition
    );
  }
}

export default useComputer;
