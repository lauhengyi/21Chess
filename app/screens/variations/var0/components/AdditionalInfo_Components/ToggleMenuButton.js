import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Clickable from "../../../../components/Clickable";
import colorPalatte from "../../../../../config/colorPalatte";

function ToggleMenuButton(props) {
  const styles = getStyles(props.settings, colorPalatte);
  return (
    <Clickable onPress={() => props.onButtonPress(true)}>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.varNum}</Text>
        </View>
      </View>
    </Clickable>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return (styles = StyleSheet.create({
    buttonContainer: {
      alignSelf: "flex-end",
      marginTop: 10,
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3,
      borderRadius: 4,
      height: 40,
      width: 40,
      paddingTop: 2,

      borderColor: colors.black,
    },
    buttonText: {
      fontFamily: "ELM",
      fontSize: 25,
      color: colors.black,
    },
  }));
}

export default ToggleMenuButton;
