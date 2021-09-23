import React from "react";
import { View, StyleSheet } from "react-native";
import V2Square from "./V2Square";
import SquareLayout from "../../../var0/components/Board_Components/SquareLayout";

function V2SquaresRow(props) {
  // Passing down constants
  return (
    <View style={styles.row}>
      {SquareLayout[props.index].map((squares) => (
        <V2Square
          key={squares.position}
          position={squares.position}
          colorId={squares.color}
          type={props.type}
          choosingDetails={props.choosingDetails}
          choosingActions={props.choosingActions}
          boardOrientation={props.boardOrientation}
          settings={props.settings}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});

export default V2SquaresRow;
