import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import V6StatsBar from "./V6StatsBar";
import V6AdditionalInfo from "./V6AdditionalInfo";
import Menu from "../../var0/components/Menu";
import V6EndPopUp from "./V6EndPopUp";
import handleGameExit from "../../../functions/handleGameExit";
import SavedContext from "../../../functions/SavedContext";
import overrideBackPress from "../../../functions/overrideBackPress";
import colorPalatte from "../../../../config/colorPalatte";

function V6GameUI(props) {
  const {
    varNum,
    boardLayout1,
    boardLayout2,
    navigation,
    gameDetails,
    timeLeft,
    restartTimer,
    chessActions,
    options,
    settings,
  } = props;
  const [isMenu, setMenu] = useState(false);
  const { setSaved } = useContext(SavedContext);

  //Override back press
  overrideBackPress(setMenu);

  const styles = getStyles(settings, colorPalatte);

  return (
    <View style={styles.background}>
      <V6EndPopUp
        gameDetails={gameDetails}
        options={options}
        timeLeft={timeLeft}
        navigation={navigation}
        setSaved={setSaved}
        handleRestart={() => handleRestart()}
        settings={settings}
      />
      <Menu
        isMenu={isMenu}
        setMenu={setMenu}
        handleExitPress={() => handleExitPress()}
        handleRestart={() => handleRestart()}
        varNum={varNum}
        settings={settings}
      />
      <View style={styles.statsBarTop}>
        <V6StatsBar
          gameDetails={gameDetails}
          timeLeft={timeLeft}
          position={"top"}
          options={options}
          settings={settings}
        />
      </View>
      <View style={styles.boardContainer}>
        <V6AdditionalInfo
          gameDetails={gameDetails}
          position={"top"}
          options={options}
          timeLeft={timeLeft}
          onAction={chessActions}
          onButtonPress={setMenu}
          settings={settings}
          varNum={varNum}
        />
        {props.children}
        <V6AdditionalInfo
          gameDetails={gameDetails}
          position={"bottom"}
          options={options}
          timeLeft={timeLeft}
          onAction={chessActions}
          settings={settings}
          varNum={varNum}
        />
      </View>
      <View style={styles.statsBarBottom}>
        <V6StatsBar
          timeLeft={timeLeft}
          gameDetails={gameDetails}
          position={"bottom"}
          options={options}
          settings={settings}
        />
      </View>
    </View>
  );

  function handleRestart() {
    chessActions({
      type: "restart",
      boardLayout1: boardLayout1,
      boardLayout2: boardLayout2,
    });
    restartTimer();
    setMenu(false);
  }

  function handleExitPress() {
    return handleGameExit(
      setMenu,
      setSaved,
      navigation,
      varNum,
      gameDetails,
      options,
      timeLeft
    );
  }
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
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
}
export default V6GameUI;
