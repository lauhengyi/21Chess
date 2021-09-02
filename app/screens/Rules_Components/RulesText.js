import React from "react";
import { Text, StyleSheet } from "react-native";
import colorPalatte from "../../config/colorPalatte";

function RulesText(props) {
  const styles = getSettings(props.settings, colorPalatte);
  return (
    <Text style={styles.text} ellipsizeMode="tail">
      {props.children}
    </Text>
  );
}

function getSettings(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    text: {
      fontFamily: "ELM",
      fontSize: 15,
      color: colors.black,
      marginTop: 5,
    },
  });
}

export default RulesText;
