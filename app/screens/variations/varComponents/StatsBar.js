import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../../config/colors";

function StatsBar(props) {
  const { currentSide, eatenPieces } = props.gameDetails;
  let opponent;
  if (props.player[0] === 1) {
    opponent = [2, !props.player[1]];
  } else {
    opponent = [1, !props.player[1]];
  }
  const headerText =
    currentSide === props.player[1]
      ? "Your Turn"
      : "Player " + opponent[0] + "' s Turn";
  //Linking each piece's type to their corresponding chess font
  const PieceKeyBoth = {
    true: {
      p: "p",
      r: "r",
      n: "n",
      b: "b",
      q: "q",
      k: "k",
    },

    false: {
      p: "o",
      r: "t",
      n: "m",
      b: "v",
      q: "w",
      k: "l",
    },
  };
  const eatenFiltered = eatenPieces.filter(
    (eatenPiece) => eatenPiece[0] === props.player[1]
  );
  const eatenStringList = eatenFiltered.map(
    (eatenPiece) => PieceKeyBoth[eatenPiece[1].side][eatenPiece[1].type]
  );
  //Add key to eaten
  let eatenPlusKey = [];
  for (let i = 0; i < eatenStringList.length; i++) {
    eatenPlusKey.push([i, eatenStringList[i]]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{headerText}</Text>
      </View>
      <Text style={styles.subHeader}>Eaten Pieces:</Text>
      <View style={styles.eatenContainer}>
        {eatenPlusKey.map((eaten) => (
          <Text key={eaten[0]} style={styles.eatenPiece}>
            {eaten[1]}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: "100%",
    backgroundColor: colors.secondary,
    padding: 10,
  },

  headerContainer: {},

  header: {
    fontFamily: "FogtwoNo5",
    fontSize: 40,
    color: colors.black,
  },

  subHeader: {
    fontFamily: "ELM",
    fontSize: 20,
    color: colors.black,
  },

  eatenContainer: {
    flexDirection: "row",
  },

  eatenPiece: {
    fontFamily: "Meri",
    fontSize: 25,
    color: colors.black,
  },
});
export default StatsBar;
