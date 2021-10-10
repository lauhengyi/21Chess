import React from "react";
import V15Board from "./components/V15Board";
import V15UseComputer from "../../../mechanisms/var15/V15UseComputer";
import useTime from "../../../mechanisms/var0/useTime";
import var15Layout from "./components/var15Layout";
import V15GameUI from "./components/V15GameUI";
import V15UseChessMove from "../../../mechanisms/var15/V15UseChessMove";
import V15ChessMovesReducer from "../../../mechanisms/var15/functions/V15ChessMovesReducer";
import getChessMoves from "../../../mechanisms/var0/getChessMoves";

function Var15({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = V15UseChessMove(
    var15Layout,
    V15ChessMovesReducer,
    saved
  );

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    V15UseComputer(
      gameDetails,
      chessActions,
      getChessMoves,
      V15ChessMovesReducer,
      options
    );
  }

  return (
    <V15GameUI
      varNum={15}
      boardLayout={var15Layout}
      navigation={navigation}
      chessActions={chessActions}
      gameDetails={gameDetails}
      timeLeft={timeLeft}
      restartTimer={restartTimer}
      options={options}
      settings={settings}
    >
      <V15Board
        gameDetails={gameDetails}
        options={options}
        onAction={chessActions}
        settings={settings}
      />
    </V15GameUI>
  );
}

export default Var15;
