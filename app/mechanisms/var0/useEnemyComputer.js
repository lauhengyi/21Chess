import getBestMove from "./getBestMove";
import getEnemyBestMove from "./getEnemyBestMove";
import { useEffect } from "react";
import "react-native-console-time-polyfill";

function useEnemyComputer(gameDetails, chessActions, options) {
  useEffect(() => {
    if (gameDetails.currentSide === options.startingSide && !checkEnd()) {
      const bestMove = getEnemyBestMove(gameDetails, 2);
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
      }, 500);
    }
  }, [gameDetails.currentSide]);
  function checkEnd() {
    return (
      gameDetails.checkmated || gameDetails.stalemated || gameDetails.repetition
    );
  }
}

export default useEnemyComputer;
