import React from "react";
import Board from "../var0/components/Board";
import useComputer from "../../../mechanisms/var0/useComputer";
import useTime from "../../../mechanisms/var0/useTime";
import layout from "../boardLayouts/var0Layout";
import V7GameUI from "./components/V7GameUI";
import V7UseChessMove from "../../../mechanisms/var7/V7UseChessMove";
import V7ChessMovesReducer from "../../../mechanisms/var7/functions/V7ChessMovesReducer";
import getChessMoves from "../../../mechanisms/var0/getChessMoves";

function Var7({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = V7UseChessMove(
    layout,
    V7ChessMovesReducer,
    saved
  );

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    useComputer(
      gameDetails,
      chessActions,
      getChessMoves,
      V7ChessMovesReducer,
      options
    );
  }

  return (
    <V7GameUI
      varNum={7}
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
    </V7GameUI>
  );
}

export default Var7;
