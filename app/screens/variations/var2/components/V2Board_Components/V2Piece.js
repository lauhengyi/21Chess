import React from "react";
import { Text, StyleSheet } from "react-native";
import Clickable from "../../../../components/Clickable";
import getPiece from "../../../../../mechanisms/primaryFunctions/getPiece";
import colorPalatte from "../../../../../config/colorPalatte";
import getPieceText from "../../../../functions/getPieceText";

function V2Piece(props) {
  // Passing down constants
  const settings = props.settings;
  const { side, boardLayout } = props.choosingDetails;
  const piece = getPiece(props.pieceId, boardLayout);

  //Get styles
  const pieceStyle = getStyle();

  const pieceText = getPieceText(piece, settings.theme);

  return <Text style={pieceStyle}>{pieceText}</Text>;

  function getStyle() {
    //Check piece orientation
    let rotateAmount = "0deg";
    if (!side) {
      rotateAmount = "180deg";
    }

    return createStyles(rotateAmount, settings, colorPalatte);
  }
}

function createStyles(rotateAmount, settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  const styles = StyleSheet.create({
    piece: {
      fontFamily: "Meri",
      fontSize: 38,
      transform: [{ rotate: rotateAmount }],
      color: colors.piece,
    },
  });
  return styles.piece;
}

export default V2Piece;
