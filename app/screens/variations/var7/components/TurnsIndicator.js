import React from "react";
import { View, StyleSheet } from "react-native";
import colorPalatte from "../../../../config/colorPalatte";
import clone from "just-clone";
import checkDarkTheme from "../../../functions/checkDarkTheme";

function TurnsIndicator(props) {
  const { gameDetails, settings } = props;
  const styles = getStyles(settings, colorPalatte);
  const currentTurn = gameDetails.currentSide;

  return (
    <View style={styles.container}>
      <View style={styles.currentTurn}>
        <View style={currentTurn ? styles.white : styles.black} />
      </View>
      {gameDetails.turnsOrder.map((turn, index) => (
        <View key={index} style={turn ? styles.white : styles.black} />
      ))}
    </View>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  const isDarkTheme = checkDarkTheme(settings.theme);
  return StyleSheet.create({
    container: {
      height: 20,
      backgroundColor: colors.grey1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },

    currentTurn: {
      borderWidth: 3,
      borderRadius: 10,
      borderColor: colors.grey2,
    },

    black: {
      backgroundColor: isDarkTheme ? colors.white : colors.black,
      height: 10,
      width: 10,
      borderRadius: 10,
    },

    white: {
      backgroundColor: isDarkTheme ? colors.black : colors.white,
      height: 10,
      width: 10,
      borderRadius: 10,
    },
  });
}

export default TurnsIndicator;
