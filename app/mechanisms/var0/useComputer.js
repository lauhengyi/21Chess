import getBestMove from "./getBestMove";
import { useEffect } from "react";

function useComputer(gameDetails, chessActions, options) {
  useEffect(() => {
    if (
      gameDetails.currentSide === !options.startingSide &&
      !gameDetails.checkmated
    ) {
      const bestMove = getBestMove(gameDetails, 2);
      chessActions({
        type: "makeTurn",
        move: bestMove[0],
        castling: bestMove[1],
      });
    }
  }, [gameDetails.currentSide]);
}

export default useComputer;
