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
      const bestMove = getBestMove(gameDetails, 3);
      console.timeEnd("bestMove");
      chessActions({
        type: "makeTurn",
        move: bestMove[0],
        castling: bestMove[1],
      });
    }
  }, [gameDetails.currentSide]);
}

export default useComputer;
