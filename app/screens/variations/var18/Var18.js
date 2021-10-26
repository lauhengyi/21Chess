import React from "react";
import V18Board from "./components/V18Board";
import V18UseComputer from "../../../mechanisms/var18/V18UseComputer";
import useTime from "../../../mechanisms/var0/useTime";
import layout from "../boardLayouts/var0Layout";
import GameUI from "../var0/components/GameUI";
import V18UseChessMove from "../../../mechanisms/var18/V18UseChessMove";
import V18ChessMovesReducer from "../../../mechanisms/var18/functions/V18ChessMovesReducer";
import getChessMoves from "../../../mechanisms/var0/getChessMoves";

function Var18({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = V18UseChessMove(
    layout,
    V18ChessMovesReducer,
    saved
  );

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    V18UseComputer(
      gameDetails,
      chessActions,
      getChessMoves,
      V18ChessMovesReducer,
      options
    );
  }

  return (
    <GameUI
      varNum={18}
      boardLayout={layout}
      navigation={navigation}
      chessActions={chessActions}
      gameDetails={gameDetails}
      timeLeft={timeLeft}
      restartTimer={restartTimer}
      options={options}
      settings={settings}
    >
      <V18Board
        gameDetails={gameDetails}
        options={options}
        onAction={chessActions}
        settings={settings}
      />
    </GameUI>
  );
}

export default Var18;
