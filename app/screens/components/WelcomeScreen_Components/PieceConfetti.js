import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colorPalatte from "../../../config/colorPalatte";

export default function PieceConfetti(props) {
  const pieceList = [
    "p",
    "r",
    "n",
    "b",
    "q",
    "k",
    "o",
    "t",
    "m",
    "v",
    "w",
    "l",
  ];
  const randomIndex = Math.floor(Math.random() * 12);
  const pieceText = pieceList[randomIndex];
  const styles = getStyles(props.settings, colorPalatte);
  return <Text style={styles.pieceText}>{pieceText}</Text>;
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  const dimension = 80;
  return StyleSheet.create({
    pieceText: {
      fontFamily: "Meri",
      fontSize: dimension,
      color: colors.tertiary,
    },
  });
}
