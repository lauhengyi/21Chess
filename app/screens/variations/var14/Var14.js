import React from "react";
import V14Board from "./components/V14Board";
import V14UseComputer from "../../../mechanisms/var14/V14UseComputer";
import useTime from "../../../mechanisms/var0/useTime";
import var14Layout from "./components/var14Layout";
import GameUI from "../var0/components/GameUI";
import useChessMove from "../../../mechanisms/var0/useChessMove";
import V14ChessMovesReducer from "../../../mechanisms/var14/V14ChessMovesReducer";
import V14GetChessMoves from "../../../mechanisms/var14/V14GetChessMoves";
import V14EvaluateBoardV2 from "../../../mechanisms/var14/V14EvaluateBoardV2";

function Var14({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = useChessMove(
    var14Layout,
    V14ChessMovesReducer,
    saved
  );

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    V14UseComputer(
      gameDetails,
      chessActions,
      V14GetChessMoves,
      V14ChessMovesReducer,
      options
    );
  }

  return (
    <GameUI
      varNum={14}
      boardLayout={var14Layout}
      navigation={navigation}
      chessActions={chessActions}
      gameDetails={gameDetails}
      timeLeft={timeLeft}
      restartTimer={restartTimer}
      options={options}
      settings={settings}
    >
      <V14Board
        gameDetails={gameDetails}
        options={options}
        onAction={chessActions}
        settings={settings}
      />
    </GameUI>
  );
}

export default Var14;
