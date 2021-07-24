import React from "react";
import { View, StyleSheet } from "react-native";
import Board from "./varComponents/Board";
import StatsBar from "./varComponents/StatsBar";
import useChessMove from "../../mechanisms/useChessMove";
import AdditionalInfo from "./varComponents/AdditionalInfo";
import layout from "./boardLayouts/var0Layout";
import colors from "../../config/colors";

function Var0({ route, navigation }) {
  const options = route.params.options;
  const initialBoard = layout;
  const initialSide = true;
  const [gameDetails, chessActions] = useChessMove(initialBoard, initialSide);

  return (
    <>
      <View style={styles.statsBarTop}>
        <StatsBar
          gameDetails={gameDetails}
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
