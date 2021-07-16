import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../../config/colors";
import PromotionSelector from "./PromotionSelector";

function AdditionalInfo(props) {
  const { checked, checkmated, promotion } = props.gameDetails;
  const player = props.player;
  let opponent;
  if (player[0] === 1) {
    opponent = [2, !player[1]];
  } else {
    opponent = [1, !player[1]];
  }
  let sc = "You are Checked";
  let scm = "You are Checkmated";
  let pc = "Player " + opponent[0] + " Checked";
  let pcm = "Player" + opponent[0] + " Checkmated";
  let statement = null;
  //Check opponent
  if ((opponent[1] && checked === 1) || (!opponent[1] && checked === 2)) {
    statement = pc;
    if (checkmated) {
      statement = pcm;
    }
  }
  //Check self
  if ((player[1] && checked === 1) || (!player[1] && checked === 2)) {
    statement = sc;
    if (checkmated) {
      statement = scm;
    }
  }

  return (
    <View>
      {statement ? (
        <Text
          style={{ fontFamily: "FogtwoNo5", fontSize: 20, color: colors.black }}
        >
          {statement}
        </Text>
      ) : null}
      {promotion ? (
        <PromotionSelector
          side={props.side}
          onAction={() => props.onAction}
          promotion={promotion}
        />
      ) : null}
    </View>
  );
}

export default AdditionalInfo;
