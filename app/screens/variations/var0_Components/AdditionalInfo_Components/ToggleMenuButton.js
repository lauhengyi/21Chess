import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import colorPalatte from "../../../../config/colorPalatte";

function ToggleMenuButton(props) {
  const buttonText = "b";
  const styles = getStyles(props.settings, colorPalatte);
  return (
    <Pressable onPress={() => props.onButtonPress(true)}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </View>
    </Pressable>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return (styles = StyleSheet.create({
    buttonContainer: {
      alignSelf: "flex-end",
      marginTop: 10,
    },
    buttonText: {
      fontFamily: "ElegantIcons",
      fontSize: 30,
      color: colors.black,
    },
  }));
}

export default ToggleMenuButton;
