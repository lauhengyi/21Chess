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
    <View>
      {pieceKey.map((piece) => {
        <Pressable
          onPress={() =>
            props.onAction({ type: "promotion", move: [promotion, piece[0]] })
          }
        >
          <View>
            <Text style={styles.piece}>{piece[1]}</Text>
          </View>
        </Pressable>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  piece: {
    fontFamily: "Meri",
    fontSize: 10,
    color: colors.black,
  },
});

export default PromotionSelector;
