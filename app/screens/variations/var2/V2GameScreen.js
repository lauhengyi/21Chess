import useTime from "../../../mechanisms/var0/useTime";
import layout from "../boardLayouts/var0Layout";
import GameUI from "../var0/components/GameUI";

function V2GameScreen({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = V1UseChessMove(layout, saved);

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    useComputer(gameDetails, chessActions, options);
  }

  return (
    <GameUI
      varNum={2}
      boardLayout={layout}
      navigation={navigation}
      chessActions={chessActions}
      gameDetails={gameDetails}
      timeLeft={timeLeft}
      restartTimer={restartTimer}
      options={options}
      settings={settings}
    >
      <V1Board
        gameDetails={gameDetails}
        options={options}
        onAction={chessActions}
        settings={settings}
      />
    </GameUI>
  );
}

export default V2GameScreen;
