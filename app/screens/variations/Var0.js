import React from "react";
import { View, StyleSheet } from "react-native";
import Board from "./var0_Components/Board";
import StatsBar from "./var0_Components/StatsBar";
import useChessMove from "../../mechanisms/useChessMove";
import useTime from "../../mechanisms/useTime";
import AdditionalInfo from "./var0_Components/AdditionalInfo";
import layout from "./boardLayouts/var0Layout";
import colors from "../../config/colors";

function Var0({ route, navigation }) {
  const options = route.params.options;
  const initialBoard = layout;
  const timeDetails = options.timeDetails;
  const [gameDetails, chessActions] = useChessMove(initialBoard);
  //Initialise time left
  const timeLeft = useTime(timeDetails, gameDetails, options);

  return (
    <>
      <View style={styles.statsBarTop}>
        <StatsBar
          gameDetails={gameDetails}
          timeLeft={timeLeft}
          position={"top"}
          options={options}
        />
      </View>
      <View style={styles.boardContainer}>
        <AdditionalInfo
          gameDetails={gameDetails}
          position={"top"}
          options={options}
          onAction={chessActions}
        />
        <Board
          gameDetails={gameDetails}
          options={options}
          onAction={chessActions}
        />
        <AdditionalInfo
          gameDetails={gameDetails}
          position={"bottom"}
          options={options}
          onAction={chessActions}
        />
      </View>
      <View style={styles.statsBarBottom}>
        <StatsBar
          timeLeft={timeLeft}
          gameDetails={gameDetails}
          position={"bottom"}
          options={options}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
  },

  statsBarBottom: {
    flexDirection: "row",
  },

  statsBarTop: {
    marginTop: 50,
  },
});

export default Var0;
