import getBestMove from "./getBestMove";
import { useEffect, useRef } from "react";
import "react-native-console-time-polyfill";

function useComputer(
  gameDetails,
  chessActions,
  getChessMoves,
  chessMovesReducer,
  options
) {
  const timer = useRef();
  useEffect(() => {
    if (gameDetails.currentSide === !options.startingSide && !checkEnd()) {
      const bestMove = getBestMove(
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

export default useComputer;
