import getBestMove from "../var0/getBestMove";
import { useEffect } from "react";
import "react-native-console-time-polyfill";

function V6UseComputer(
  gameDetails,
  chessActions,
  getChessMoves,
  chessMovesReducer,
  options
) {
  const currentGame = gameDetails.currentGame;
  const computerSide = currentGame
    ? !options.startingSide
    : options.startingSide;
  useEffect(() => {
    if (gameDetails[currentGame].currentSide === computerSide && !checkEnd()) {
      const bestMove = getBestMove(
        gameDetails[currentGame],
        getChessMoves,
        chessMovesReducer,
        options.diff
      );
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
  }, [gameDetails[currentGame].currentSide]);

  function checkEnd() {
    return (
      gameDetails[currentGame].checkmated ||
      gameDetails[currentGame].stalemated ||
      gameDetails[currentGame].repetition
    );
  }
}

export default V6UseComputer;
