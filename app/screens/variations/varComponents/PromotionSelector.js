import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import colors from "../../../config/colors";

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
  return (
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
  );
}

const styles = StyleSheet.create({
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
});

export default PromotionSelector;
