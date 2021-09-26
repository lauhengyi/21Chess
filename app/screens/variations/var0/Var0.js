import React from "react";
import Board from "./components/Board";
import useChessMove from "../../../mechanisms/var0/useChessMove";
import useComputer from "../../../mechanisms/var0/useComputer";
import useTime from "../../../mechanisms/var0/useTime";
import layout from "../boardLayouts/var0Layout";
import GameUI from "./components/GameUI";
import getChessMoves from "../../../mechanisms/var0/getChessMoves";
import chessMovesReducer from "../../../mechanisms/var0/functions/chessMovesReducer";

function Var0({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = useChessMove(layout, saved);

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    useComputer(
      gameDetails,
      chessActions,
      getChessMoves,
      chessMovesReducer,
      options
    );
  }

  return (
    <GameUI
      varNum={0}
      boardLayout={layout}
      navigation={navigation}
      chessActions={chessActions}
      gameDetails={gameDetails}
      timeLeft={timeLeft}
      restartTimer={restartTimer}
      options={options}
      settings={settings}
    >
      <Board
        gameDetails={gameDetails}
        options={options}
        onAction={chessActions}
        settings={settings}
      />
    </GameUI>
  );
}

export default Var0;
