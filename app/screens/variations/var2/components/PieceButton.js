import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colorPalatte from "../../../../config/colorPalatte";
import getPieceText from "../../../functions/getPieceText";
import Clickable from "../../../components/Clickable";

function PieceButton(props) {
  const clicked = props.type === props.clicked;
  const { side, whiteLeft, blackLeft } = props.choosingDetails;
  const styles = getStyles(props.settings, colorPalatte);
  const pieceText = getPieceText(
    { type: props.type, side: side },
    props.settings.theme
  );
  const type = props.type;
  const numberLeft = side ? whiteLeft[type] : blackLeft[type];
  return (
    <Clickable onPress={() => props.onPress(type)}>
      <View style={styles.container}>
        <View style={clicked ? styles.clicked : styles.unClicked}>
          <Text style={styles.pieceText}>{pieceText}</Text>
        </View>
        <Text style={styles.numberLeft}>{numberLeft}</Text>
      </View>
    </Clickable>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    container: {
      alignItems: "center",
    },

    clicked: {
      alignItems: "center",
      backgroundColor: colors.grey2,
    },

    unClicked: {
      alignItems: "center",
      backgroundColor: colors.tertiary,
    },

    pieceText: {
      fontFamily: "Meri",
      fontSize: 45,
      color: colors.black,
    },

    numberLeft: {
      fontFamily: "ELM",
      fontSize: 20,
      color: colors.black,
    },
  });
}

export default PieceButton;
