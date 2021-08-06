import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../../config/colors";
import PromotionSelector from "./AdditionalInfo_Components/PromotionSelector";
import { getPiece } from "../../../mechanisms/normalChess";
import ToggleMenuButton from "./ToggleMenuButton";

function AdditionalInfo(props) {
  const { checked, checkmated, stalemated, boardLayout, promotion } =
    props.gameDetails;
  const options = props.options;
  const position = props.position;
  //Create Player and Opponent
  let player;
  let opponent;
  if (position === "bottom") {
    player = [1, options.startingSide];
    opponent = [2, !options.startingSide];
  } else {
    player = [2, !options.startingSide];
    opponent = [1, options.startingSide];
  }
  const flipped = options.isFlipped && position === "top" ? true : false;
  const statement = getStatement();

  //Get promoting, where promoting = [whether additional Info will include promoting, side of piece promoting]
  const promoting = checkPromoting();

  //Get whether the button is present
  const isButton = promoting[0] || position === "bottom" ? false : true;

  return (
    //Include statement
    <View style={styles.container}>
      <View style={flipped ? styles.isFlipped : styles.notFlipped}>
        <View style={styles.statementContainer}>
          {statement && <Text style={styles.statement}>{statement}</Text>}
          {promoting[0] && (
            <PromotionSelector
              flipped={options.isFlipped}
              side={promoting[1]}
              onAction={(action) => props.onAction(action)}
              promotion={promotion}
            />
          )}
        </View>
      </View>
      {isButton && (
        <View style={styles.buttonContainer}>
          <ToggleMenuButton />
        </View>
      )}
    </View>
  );

  function getStatement() {
    let statement = null;
    const opponentsName = options.mode ? "Player " + opponent[0] : "Computer";

    const sc = "You are Checked";
    const scm = "You are Checkmated";
    const ss = "You are Stalemated";
    const pc = opponentsName + " Checked";
    const pcm = opponentsName + " Checkmated";
    const ps = opponentsName + " Stalemated";

    //Check opponent for check and checkmate
    if ((opponent[1] && checked === 1) || (!opponent[1] && checked === 2)) {
      statement = pc;
      if (checkmated) {
        statement = pcm;
      }
    }

    //Check opponent for stalemate
    if (
      (opponent[1] && stalemated === 1) ||
      (!opponent[1] && stalemated === 2)
    ) {
      statement = ps;
    }

    //Check self
    if ((player[1] && checked === 1) || (!player[1] && checked === 2)) {
      statement = sc;
      if (checkmated) {
        statement = scm;
      }
    }

    if ((player[1] && stalemated === 1) || (!player[1] && stalemated === 2)) {
      statement = ss;
    }

    //Remove statement if statement is from the top and autoTurn is not turned off
    if (position === "top" && (options.isAutoturn || options.mode === 0)) {
      statement = null;
    }
    return statement;
  }

  function checkPromoting() {
    let promoting = [false, null];
    if (promotion) {
      const promotingPiece = getPiece(promotion, boardLayout);
      if (promotingPiece.side === opponent[1]) {
        promoting = [true, promotingPiece.side];
      }
    }
    return promoting;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },

  isFlipped: {
    transform: [{ rotate: "180deg" }],
    flex: 1,
  },

  notFlipped: {
    flex: 1,
  },

  statementContainer: {
    flex: 1,
    justifyContent: "center",
  },

  statement: {
    fontFamily: "ELM",
    fontSize: 30,
    color: colors.black,
    alignSelf: "flex-end",
    marginRight: 25,
  },
});
export default AdditionalInfo;
