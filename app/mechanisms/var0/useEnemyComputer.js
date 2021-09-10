import getBestMove from "./getBestMove";
import { useEffect } from "react";
import "react-native-console-time-polyfill";

function useEnemyComputer(gameDetails, chessActions, options) {
  useEffect(() => {
    if (
      gameDetails.currentSide === options.startingSide &&
      !gameDetails.checkmated
    ) {
      const bestMove = getBestMove(gameDetails, 2);
      console.log({ bestMove });
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
      }, 1000);
    }
  }, [gameDetails.currentSide]);
}

export default useEnemyComputer;