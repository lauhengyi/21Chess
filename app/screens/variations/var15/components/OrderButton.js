import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colorPalatte from "../../../../config/colorPalatte";
import getPieceText from "../../../functions/getPieceText";
import Clickable from "../../../components/Clickable";

function OrderButton(props) {
  const { type, side, cost } = props;
  const { whiteMoney, blackMoney, currentSide, clickedOrder } =
    props.gameDetails;
  const clicked = type === clickedOrder && side === currentSide;
  const styles = getStyles(props.settings, colorPalatte);
  const pieceText = getPieceText(
    { type: type, side: side },
    props.settings.theme
  );
  const isAffordable = side ? whiteMoney >= cost : blackMoney >= cost;
  const isClickable = isAffordable && side === currentSide;
  const buttonStyle = getButtonStyle(styles, clicked, isAffordable);
  if (isClickable) {
    return (
      <Clickable
        onPress={() => props.onPress({ type: "order", pieceType: type })}
      >
        <View style={styles.container}>
          <View style={buttonStyle}>
            <Text style={styles.pieceText}>{pieceText}</Text>
          </View>
          <Text style={isAffordable ? styles.price : styles.unAffordablePrice}>
            {"$" + cost}
          </Text>
        </View>
      </Clickable>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={buttonStyle}>
          <Text style={styles.pieceText}>{pieceText}</Text>
        </View>
        <Text style={isAffordable ? styles.price : styles.unAffordablePrice}>
          {"$" + cost}
        </Text>
      </View>
    );
  }
}

function getButtonStyle(styles, clicked, isAffordable) {
  let buttonStyle = clicked ? styles.clicked : styles.unClicked;
  return isAffordable ? buttonStyle : styles.unAffordable;
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
      backgroundColor: colors.grey1,
    },

    unAffordable: {
      alignItems: "center",
      backgroundColor: colors.grey3,
    },

    pieceText: {
      fontFamily: "Meri",
      fontSize: 37,
      color: colors.piece,
    },

    price: {
      fontFamily: "ELM",
      fontSize: 15,
      color: colors.black,
    },

    unAffordablePrice: {
      fontFamily: "ELM",
      fontSize: 15,
      color: colors.grey1,
    },
  });
}

export default OrderButton;
