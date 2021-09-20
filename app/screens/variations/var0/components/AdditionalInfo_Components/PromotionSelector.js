import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Clickable from "../../../../components/Clickable";
import colorPalatte from "../../../../../config/colorPalatte";
import checkDarkTheme from "../../../../functions/checkDarkTheme";

function PromotionSelector(props) {
  const styles = getStyles(props.settings, colorPalatte);

  //Swich pieceKey around if darkMode
  const isDark = checkDarkTheme(props.settings.theme);
  const pieceColor = (function () {
    if (isDark) {
      return props.side ? "black" : "white";
    } else {
      return props.side ? "white" : "black";
    }
  })();
  let pieceKey;
  if (pieceColor === "white") {
    pieceKey = [
      ["q", "q"],
      ["n", "n"],
      ["r", "r"],
      ["b", "b"],
    ];
  } else {
    pieceKey = [
      ["q", "w"],
      ["n", "m"],
      ["r", "t"],
      ["b", "v"],
    ];
  }

  return (
    <View style={props.flipped ? styles.isFlipped : styles.notFlipped}>
      <View style={styles.container}>
        {pieceKey.map((piece) => (
          <Clickable
            key={piece[1]}
            onPress={() =>
              props.onAction({
                type: "promotion",
                move: [props.promotion, piece[0]],
              })
            }
          >
            <Text style={styles.piece}>{piece[1]}</Text>
          </Clickable>
        ))}
      </View>
    </View>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return (styles = StyleSheet.create({
    isFlipped: {
      flex: 1,
      transform: [{ rotate: "180deg" }],
    },

    notFlipped: {
      flex: 1,
    },

    piece: {
      fontFamily: "Meri",
      fontSize: 50,
      color: colors.black,
    },
    container: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  }));
}

export default PromotionSelector;
