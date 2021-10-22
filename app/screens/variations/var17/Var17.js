import React from "react";
import V17Board from "./components/V17Board";
import V17UseComputer from "../../../mechanisms/var17/V17UseComputer";
import useTime from "../../../mechanisms/var0/useTime";
import var0Layout from "../boardLayouts/var0Layout";
import GameUI from "../var0/components/GameUI";
import V17UseChessMove from "../../../mechanisms/var17/V17UseChessMove";
import V17ChessMovesReducer from "../../../mechanisms/var17/functions/V17ChessMovesReducer";
import getChessMoves from "../../../mechanisms/var0/getChessMoves";
import getSafeMatrix from "../../../mechanisms/var17/functions/getSafeMatrix";

function Var17({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = V17UseChessMove(
    var0Layout,
    V17ChessMovesReducer,
    saved
  );

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    V17UseComputer(
      gameDetails,
      chessActions,
      getChessMoves,
      V17ChessMovesReducer,
      options
    );
  }

  return (
    <GameUI
      varNum={17}
      boardLayout={var0Layout}
      navigation={navigation}
      chessActions={chessActions}
      gameDetails={gameDetails}
      timeLeft={timeLeft}
      restartTimer={restartTimer}
      options={options}
      settings={settings}
    >
      <V17Board
        gameDetails={gameDetails}
        options={options}
        onAction={chessActions}
        settings={settings}
      />
    </GameUI>
  );
}

export default Var17;
