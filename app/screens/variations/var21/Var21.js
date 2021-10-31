import React from "react";
import V21Board from "./components/V21Board";
import useComputer from "../../../mechanisms/var0/useComputer";
import useTime from "../../../mechanisms/var0/useTime";
import layout from "../boardLayouts/var0Layout";
import GameUI from "../var0/components/GameUI";
import V21UseChessMove from "../../../mechanisms/var21/V21UseChessMove";
import V21ChessMovesReducer from "../../../mechanisms/var21/functions/V21ChessMovesReducer";
import V21GetChessMoves from "../../../mechanisms/var21/V21GetChessMoves";

function Var21({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = V21UseChessMove(
    layout,
    V21ChessMovesReducer,
    saved
  );

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    useComputer(
      gameDetails,
      chessActions,
      V21GetChessMoves,
      V21ChessMovesReducer,
      options
    );
  }
  console.log(gameDetails.portalDetails);

  return (
    <GameUI
      varNum={21}
      boardLayout={layout}
      navigation={navigation}
      chessActions={chessActions}
      gameDetails={gameDetails}
      timeLeft={timeLeft}
      restartTimer={restartTimer}
      options={options}
      settings={settings}
    >
      <V21Board
        gameDetails={gameDetails}
        options={options}
        onAction={chessActions}
        settings={settings}
      />
    </GameUI>
  );
}

export default Var21;
