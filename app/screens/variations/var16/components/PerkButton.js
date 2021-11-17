import React from "react";
import { StyleSheet, View } from "react-native";
import colorPalatte from "../../../../config/colorPalatte";
import Clickable from "../../../components/Clickable";
import PerkIcon from "./PerkIcon";

export default function PerkButton(props) {
  const [styles, colors] = getStyles(props.settings, colorPalatte);
  const type = props.type;
  const isClicked = props.clickedPerk === type;
  return (
    <Clickable onPress={() => props.onPress(type)}>
      <View style={isClicked ? styles.clicked : styles.unClicked}>
        <PerkIcon color={colors.black} type={type} size={80} />
      </View>
    </Clickable>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  const styles = StyleSheet.create({
    clicked: {
      height: 85,
      width: 85,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: colors.grey2,
    },
    unClicked: {
      height: 85,
      width: 85,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: colors.grey1,
    },
  });
  return [styles, colors];
}
