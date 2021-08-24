import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import colorPalatte from "../../../../config/colorPalatte";

function PromotionSelector(props) {
  let pieceKey;
  if (props.side) {
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
  const styles = getStyles(props.settings, colorPalatte);

  return (
    <View style={props.flipped ? styles.isFlipped : styles.notFlipped}>
      <View style={styles.container}>
        {pieceKey.map((piece) => (
          <Pressable
            key={piece[1]}
            onPress={() =>
              props.onAction({
                type: "promotion",
                move: [props.promotion, piece[0]],
              })
            }
          >
            <Text style={styles.piece}>{piece[1]}</Text>
          </Pressable>
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
