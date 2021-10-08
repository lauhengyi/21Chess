import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import V15StatsBar from "./V15StatsBar";
import AdditionalInfo from "../../var0/components/AdditionalInfo";
import Menu from "../../var0/components/Menu";
import EndPopUp from "../../var0/components/EndPopUp";
import handleGameExit from "../../../functions/handleGameExit";
import SavedContext from "../../../functions/SavedContext";
import overrideBackPress from "../../../functions/overrideBackPress";
import colorPalatte from "../../../../config/colorPalatte";

function V15GameUI(props) {
  const {
    varNum,
    boardLayout,
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
      <EndPopUp
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
        <V15StatsBar
          gameDetails={gameDetails}
          timeLeft={timeLeft}
          position={"top"}
          options={options}
          settings={settings}
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
          settings={settings}
          varNum={varNum}
        />
        {props.children}
        <AdditionalInfo
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
        <V15StatsBar
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
    chessActions({ type: "restart", boardLayout: boardLayout });
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
export default V15GameUI;
