import getBestMove from "./getBestMove";
import { useEffect } from "react";
import "react-native-console-time-polyfill";

function useComputer(gameDetails, chessActions, options) {
  useEffect(() => {
    if (
      gameDetails.currentSide === !options.startingSide &&
      !gameDetails.checkmated
    ) {
      console.time("bestMove");
      const bestMove = getBestMove(gameDetails, 2);
      console.timeEnd("bestMove");
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
    }
  }, [gameDetails.currentSide]);
}

export default useComputer;
