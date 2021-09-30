import React from "react";
import V6Board from "./components/V6Board";
import V6UseComputer from "../../../mechanisms/var6/V6UseComputer";
import useTime from "../../../mechanisms/var0/useTime";
import var6Layout1 from "./components/boardLayouts/var6Layout1";
import var6Layout2 from "./components/boardLayouts/var6Layout2";
import V6GameUI from "./components/V6GameUI";
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
  const { checkmated, stalemated, repetition } =
    gameDetails[gameDetails.currentGame];
  const playingSide = gameDetails.currentGame
    ? gameDetails[gameDetails.currentGame].currentSide
    : !gameDetails[gameDetails.currentGame].currentSide;
  const specialDetails = {
    checkmated: checkmated,
    stalemated: stalemated,
    repetition: repetition,
    currentSide: playingSide,
  };
  const [timeLeft, restartTimer] = useTime(specialDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    V6UseComputer(
      gameDetails,
      chessActions,
      getChessMoves,
      chessMovesReducer,
      options
    );
  }

  return (
    <V6GameUI
      varNum={6}
      boardLayout1={var6Layout1}
      boardLayout2={var6Layout2}
      navigation={navigation}
      chessActions={chessActions}
      gameDetails={gameDetails}
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
    </V6GameUI>
  );
}

export default Var6;
