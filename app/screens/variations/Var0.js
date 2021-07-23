import React from "react";
import { View, StyleSheet } from "react-native";
import Board from "./varComponents/Board";
import StatsBar from "./varComponents/StatsBar";
import useChessMove from "../../mechanisms/useChessMove";
import AdditionalInfo from "./varComponents/AdditionalInfo";
import layout from "./boardLayouts/var0Layout";
import colors from "../../config/colors";

function Var0({ navigation, route }) {
  const initialBoard = layout;
  const initialSide = true;

  const [gameDetails, chessActions] = useChessMove(initialBoard, initialSide);
  return (
    <>
      <View style={styles.statsBarTop}>
        <StatsBar gameDetails={gameDetails} player={[2, !initialSide]} />
      </View>
      <View style={styles.boardContainer}>
        <AdditionalInfo
          gameDetails={gameDetails}
          player={[2, !initialSide]}
          onAction={chessActions}
        />
        <Board gameDetails={gameDetails} onAction={chessActions} />
        <AdditionalInfo
          gameDetails={gameDetails}
          player={[1, initialSide]}
          onAction={chessActions}
        />
      </View>
      <View style={styles.statsBarBottom}>
        <StatsBar gameDetails={gameDetails} player={[1, initialSide]} />
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
    transform: [{ rotate: "180deg" }],
  },
});

export default Var0;
