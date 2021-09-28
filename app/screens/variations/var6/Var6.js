import React from "react";
import V6Board from "./components/V6Board";
import useComputer from "../../../mechanisms/var0/useComputer";
import useTime from "../../../mechanisms/var0/useTime";
import var6Layout1 from "./components/boardLayouts/var6Layout1";
import var6Layout2 from "./components/boardLayouts/var6Layout2";
import GameUI from "../var0/components/GameUI";
import V6UseChessMove from "../../../mechanisms/var6/V6UseChessMove";
import V6ChessMovesReducer from "../../../mechanisms/var6/V6ChessMovesReducer";
import chessMovesReducer from "../../../mechanisms/var0/functions/chessMovesReducer";
import getChessMoves from "../../../mechanisms/var0/getChessMoves";

function Var6({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = V6UseChessMove(
    var6Layout1,
    var6Layout2,
    V6ChessMovesReducer,
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
      chessMovesReducer,
      options
    );
  }

  return (
    <GameUI
      varNum={6}
      boardLayout1={var6Layout1}
      boardLayout2={var6Layout2}
      navigation={navigation}
      chessActions={chessActions}
      gameDetails={gameDetails[gameDetails.currentGame]}
      timeLeft={timeLeft}
      restartTimer={restartTimer}
      options={options}
      settings={settings}
    >
      <V6Board
        gameDetails={gameDetails}
        options={options}
        onAction={chessActions}
        settings={settings}
      />
    </GameUI>
  );
}

export default Var6;
