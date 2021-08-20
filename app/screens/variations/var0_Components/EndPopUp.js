import React, { useEffect, useRef, useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import colors from "../../../config/colors";
import checkStatus from "../../functions/checkStatus";

function EndPopUp(props) {
  const ending = checkEnd(props.gameDetails, props.options, props.timeLeft);
  const navigation = props.navigation;
  //Give a pause before screen appears
  const [isVisible, setVisible] = useState(false);
  const timer = useRef();
  useEffect(() => {
    if (ending[0]) {
      timer.current = setTimeout(() => {
        setVisible(true);
      }, 1500);
    }
    return () => clearTimeout(timer.current);
  });
  const [statement1, statement2] = getStatement(ending, props.options);
  return (
    <Modal animationType="fade" visible={ending[0]} transparent={true}>
      <Modal animationType="fade" visible={isVisible} transparent={true}>
        <View style={styles.background}>
          <View style={styles.popUpContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.statement1}>{statement1}</Text>
              <Text style={styles.statement2}>{statement2}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Pressable
                onPress={() => {
                  setVisible(false);
                  props.onRestart();
                  console.log("in");
                }}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Play again</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  setVisible(false);
                  navigation.navigate("Select");
                }}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Choose var</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  setVisible(false);
                  navigation.navigate("Welcome");
                }}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Exit game</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </Modal>
  );

  //Returns a list of [whether end screen should appear, type of end, winning Player]
  //type of end: 1 === checkmated, 2 === stalemated, 3 === timeOut
  function checkEnd(gameDetails, options, timeLeft) {
    let ending = [false, 0, 0];
    //Check Checkmate
    if (gameDetails.checkmated) {
      ending[0] = true;
      ending[1] = 1;
      //Check player
      if (checkStatus(options.startingSide, gameDetails.checkmated)) {
        ending[2] = 2;
      } else {
        ending[2] = 1;
      }
    }

    //Check stalemate
    if (gameDetails.stalemated) {
      ending[0] = true;
      ending[1] = 2;
      if (checkStatus(options.startingSide, gameDetails.stalemated)) {
        ending[2] = 2;
      } else {
        ending[2] = 1;
      }
    }

    //Check timeOut
    if (timeLeft.timeout) {
      ending[0] = true;
      ending[1] = 3;
      if (checkStatus(options.startingSide, timeLeft.timeout)) {
        ending[2] = 2;
      } else {
        ending[2] = 1;
      }
    }

    return ending;
  }

  function getStatement(ending, options) {
    //Get winnerName
    let winnerName = "Player " + String(ending[2]);

    //Get loserName
    const loserNum = ending[2] === 1 ? 2 : 1;
    let loserName = "Player " + String(loserNum);

    //Check for game mode
    if (options.mode === 0) {
      if (ending[2] === 2) {
        winnerName = "Computer";
        loserName = "You";
      } else {
        loserName = "Computer";
        winnerName = "You";
      }
    }

    let statement1 = "";
    let statement2 = "";
    if (ending[1] === 1) {
      //Get checkmate statement
      statement1 = loserName + " checkmated";
      if (loserName === "You") {
        statement1 = "You are checkmated";
      }
      statement2 = winnerName + " wins";
      if (winnerName === "You") {
        statement2 = "You win";
      }
    } else if (ending[1] === 2) {
      //Get stalemate statement
      statement1 = loserName + " stalemated";
      if (loserName === "You") {
        statement1 = "You are stalemated";
      }
      statement2 = "Draw";
    } else if (ending[1] === 3) {
      //Get timeout statment
      statement1 = loserName + " loses by timeout";
      if (loserName === "You") {
        statement1 = "You lose by timeout";
      }
      statement2 = winnerName + " wins";
      if (winnerName === "You") {
        statement2 = "You win";
      }
    }

    return [statement1, statement2];
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  popUpContainer: {
    alignItems: "center",
    backgroundColor: colors.tertiary,
    borderWidth: 1,
    borderColor: colors.grey2,
    width: "90%",
    padding: 10,
  },

  headerContainer: {
    alignItems: "center",
  },

  statement1: {
    fontFamily: "ELM",
    fontSize: 20,
    color: colors.black,
  },

  statement2: {
    fontFamily: "ELMB",
    fontSize: 20,
    color: colors.black,
  },

  buttonsContainer: {
    flexDirection: "row",
  },

  button: {
    backgroundColor: colors.primary,
    margin: 5,
    borderWidth: 1,
    borderColor: colors.grey2,
    alignItems: "center",
  },

  buttonText: {
    padding: 5,
    fontFamily: "ELM",
    fontSize: 20,
    color: colors.black,
  },
});
export default EndPopUp;
