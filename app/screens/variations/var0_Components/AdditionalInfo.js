import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../../config/colors";
import PromotionSelector from "./AdditionalInfo_Components/PromotionSelector";
import { getPiece } from "../../../mechanisms/normalChess";

function AdditionalInfo(props) {
  const { checked, checkmated, stalemated, boardLayout, promotion } =
    props.gameDetails;
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
  const flipped = options.isFlipped && props.position === "top" ? true : false;

  const statement = getStatement();

  //get promoting, where promoting = [whether additional Info will include promoting, side of piece promoting]
  const promoting = checkPromoting();

  if (props.position === "top" && (options.isAutoturn || options.mode === 0)) {
    return (
      //Exclude statement
      <View style={styles.container}>
        {promoting[0] ? (
          <PromotionSelector
            side={promoting[1]}
            onAction={(action) => props.onAction(action)}
            promotion={promotion}
          />
        ) : null}
      </View>
    );
  } else {
    return (
      //Include statement
      <View style={flipped ? styles.isFlipped : styles.notFlipped}>
        <View style={styles.container}>
          {statement ? <Text style={styles.statement}>{statement}</Text> : null}
          {promoting[0] ? (
            <PromotionSelector
              flipped={options.isFlipped}
              side={promoting[1]}
              onAction={(action) => props.onAction(action)}
              promotion={promotion}
            />
          ) : null}
        </View>
      </View>
    );
  }

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
  isFlipped: {
    transform: [{ rotate: "180deg" }],
    flex: 1,
  },

  notFlipped: {
    flex: 1,
  },

  container: {
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
