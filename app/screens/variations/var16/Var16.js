import React from "react";
import V16Board from "./components/V16Board";
import useComputer from "../../../mechanisms/var0/useComputer";
import useTime from "../../../mechanisms/var0/useTime";
import var16Layout from "./components/var16Layout";
import GameUI from "../var0/components/GameUI";
import V16UseChessMove from "../../../mechanisms/var16/V16UseChessMove";
import V16ChessMovesReducer from "../../../mechanisms/var16/functions/V16ChessMovesReducer";
import V16GetChessMoves from "../../../mechanisms/var16/V16GetChessMoves";
import UpgradingPopUp from "./components/UpgradingPopUp";

function Var16({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = V16UseChessMove(
    var16Layout,
    V16ChessMovesReducer,
    saved
  );

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    useComputer(
      gameDetails,
      chessActions,
      V16GetChessMoves,
      V16ChessMovesReducer,
      options
    );
  }

  return (
    <GameUI
      varNum={16}
      boardLayout={var16Layout}
      navigation={navigation}
      chessActions={chessActions}
      gameDetails={gameDetails}
      timeLeft={timeLeft}
      restartTimer={restartTimer}
      options={options}
      settings={settings}
    >
      {gameDetails.upgradable !== null && (
        <UpgradingPopUp
          gameDetails={gameDetails}
          chessActions={chessActions}
          options={options}
          settings={settings}
        />
      )}
      <V16Board
        gameDetails={gameDetails}
        options={options}
        onAction={chessActions}
        settings={settings}
      />
    </GameUI>
  );
}

export default Var16;
