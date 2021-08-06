import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Board from "./var0_Components/Board";
import StatsBar from "./var0_Components/StatsBar";
import AdditionalInfo from "./var0_Components/AdditionalInfo";
import Menu from "./var0_Components/Menu";
import useChessMove from "../../mechanisms/useChessMove";
import useTime from "../../mechanisms/useTime";
import layout from "./boardLayouts/var0Layout";
import colors from "../../config/colors";

function Var0({ route, navigation }) {
  const options = route.params.options;
  const initialBoard = layout;
  const timeDetails = options.timeDetails;
  const [gameDetails, chessActions] = useChessMove(initialBoard);
  const [isMenu, setMenu] = useState(false);
  //Initialise time left
  const timeLeft = useTime(timeDetails, gameDetails, options);

  return (
    <View style={styles.background}>
      <Menu isMenu={isMenu} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.white,
    flex: 1,
  },

  boardContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },

  statsBarBottom: {
    flexDirection: "row",
  },

  statsBarTop: {
    marginTop: 50,
  },
});

export default Var0;
