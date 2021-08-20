import React, { useEffect, useState } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import Board from "./var0_Components/Board";
import StatsBar from "./var0_Components/StatsBar";
import AdditionalInfo from "./var0_Components/AdditionalInfo";
import Menu from "./var0_Components/Menu";
import EndPopUp from "./var0_Components/EndPopUp";
import { useChessMove } from "../../mechanisms/var0/useChessMove";
import useComputer from "../../mechanisms/var0/useComputer";
import useTime from "../../mechanisms/var0/useTime";
import layout from "./boardLayouts/var0Layout";
import colors from "../../config/colors";

function Var0({ route, navigation }) {
  const options = route.params.options;
  const initialBoard = layout;
  const [gameDetails, chessActions] = useChessMove(initialBoard);
  const [isMenu, setMenu] = useState(false);
  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options);
  //Activate computer
  if (options.mode === 0) {
    useComputer(gameDetails, chessActions, options);
  }
  //Override device back button to open menu instead
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  return (
    <View style={styles.background}>
      <EndPopUp
        gameDetails={gameDetails}
        options={options}
        timeLeft={timeLeft}
        navigation={navigation}
        onRestart={() => onRestart()}
      />
      <Menu
        isMenu={isMenu}
        onExitPress={setMenu}
        navigation={navigation}
        onRestart={() => onRestart()}
      />
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
          timeLeft={timeLeft}
          onAction={chessActions}
          onButtonPress={setMenu}
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
          timeLeft={timeLeft}
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

  function onRestart() {
    chessActions({ type: "restart", boardLayout: initialBoard });
    restartTimer();
    setMenu(false);
  }

  function handleBackButtonClick() {
    setMenu(true);
    return true;
  }
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
