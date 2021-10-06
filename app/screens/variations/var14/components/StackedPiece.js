import React from "react";
import { StyleSheet, View, Text } from "react-native";
import getPieceText from "../../../functions/getPieceText";
import colorPalatte from "../../../../config/colorPalatte";

export default function StackedPiece(props) {
  const piece = props.piece;
  const primaryText = getPieceText(piece, props.settings.theme);
  const secondaryText = getPieceText(
    { ...piece, type: piece.stacked },
    props.settings.theme
  );
  const styles = getStyles(props.settings, colorPalatte);
  return (
    <View style={styles.container}>
      <Text style={styles.primaryPiece}>{primaryText}</Text>
      <View style={styles.divider} />
      <Text style={styles.secondaryPiece}>{secondaryText}</Text>
    </View>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    container: {
      alignContent: "center",
      alignItems: "center",
      flex: 1,
    },
    primaryPiece: {
      fontFamily: "Meri",
      fontSize: 20,
      color: colors.piece,
      position: "absolute",
      left: 0,
      bottom: 2,
    },

    secondaryPiece: {
      fontFamily: "Meri",
      fontSize: 20,
      color: colors.piece,
      position: "absolute",
      right: 0,
      top: 2,
    },

    divider: {
      backgroundColor: colors.piece,
      width: 1,
      height: 35,
      position: "absolute",
      left: 0,
      right: 0,
      top: 5,
      bottom: 0,
      transform: [{ rotate: "45deg" }],
    },
  });
}
