import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../../config/colors";

function StatsBar(props) {
  const { currentSide, eatenPieces } = props.gameDetails;
  const options = props.options;
  //Create Player and Opponent
  let player;
  let opponent;
  if (props.position === "bottom") {
    player = [1, options.startingSide];
    opponent = [2, !options.startingSide];
  } else {
    player = [2, !options.startingSide];
    opponent = [1, options.startingSide];
  }

  //Form header statements
  const opponentsName = options.mode ? "Player " + opponent[0] : "Computer";
  const headerText =
    currentSide === player[1] ? "Your Turn" : opponentsName + "' s Turn";
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
    (eatenPiece) => eatenPiece[0] === player[1]
  );
  const eatenList = eatenFiltered.map((eatenPiece) => [
    eatenPiece[1].id,
    PieceKeyBoth[eatenPiece[1].side][eatenPiece[1].type],
  ]);

  //Find statsbar type (only for top statsBar, whether it is normal or supplementary)
  let statsBarType = "normal";
  if (props.position === "top" && (options.isAutoturn || options.mode === 0)) {
    statsBarType = "supplementary";
  }

  {
    if (statsBarType === "normal") {
      return (
        <View style={styles.container}>
          <View
            style={
              props.position === "top"
                ? styles.statsBarTop
                : styles.statsBarBottom
            }
          >
            <View style={styles.headerContainer}>
              <Text style={styles.header}>{headerText}</Text>
            </View>
            <Text style={styles.subHeader}>Captured Pieces:</Text>
            <View style={styles.eatenContainer}>
              {eatenList.map((eaten) => (
                <Text key={eaten[0]} style={styles.eatenPiece}>
                  {eaten[1]}
                </Text>
              ))}
            </View>
          </View>
        </View>
      );
    } else if (statsBarType === "supplementary") {
      return (
        <View style={styles.container}>
          <Text style={styles.subHeader}>Pieces Lost:</Text>
          <View style={styles.eatenContainer}>
            {eatenList.map((eaten) => (
              <Text key={eaten[0]} style={styles.eatenPiece}>
                {eaten[1]}
              </Text>
            ))}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: "100%",
    backgroundColor: colors.secondary,
    padding: 10,
  },

  statsBarTop: {
    flex: 1,
    transform: [{ rotate: "180deg" }],
  },

  statsBarBottom: {},

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
