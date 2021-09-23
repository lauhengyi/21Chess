import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colorPalatte from "../../../../config/colorPalatte";
import DeleteButton from "./DeleteButton";
import PieceButton from "./PieceButton";

function PieceSelector(props) {
  const pieces = ["p", "r", "b", "q", "k"];
  const headerText = getHeaderText(props.clicked);
  const styles = getStyles(props.settings, colorPalatte);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{headerText}</Text>
      <View style={styles.buttonsContainer}>
        <View style={styles.pieceContainer}>
          {pieces.map((type, index) => (
            <PieceButton
              key={index}
              choosingDetails={props.choosingDetails}
              type={type}
              clicked={props.clicked}
              settings={props.settings}
              onPress={(type) => props.onPress(type)}
            />
          ))}
        </View>
        <DeleteButton
          clicked={props.clicked}
          settings={props.settings}
          onPress={(type) => props.onPress(type)}
        />
      </View>
    </View>
  );
}

function getHeaderText(clicked) {
  switch (clicked) {
    case "p":
      return "Pawn Selected";
    case "r":
      return "Rook Selected";
    case "n":
      return "Knight Selected";
    case "b":
      return "Bishop Selected";
    case "q":
      return "Queen Selected";
    case "k":
      return "King Selected";
    case "x":
      return "Delete Selected";
    default:
      return "Select";
  }
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    container: {
      height: "20%",
      backgroundColor: colors.secondary,
      paddingHorizontal: 10,
    },

    headerText: {
      fontFamily: "ELM",
      fontSize: 30,
      color: colors.black,
    },

    buttonsContainer: {
      flexDirection: "row",
      width: "100%",
    },

    pieceContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "70%",
    },
  });
}

export default PieceSelector;
