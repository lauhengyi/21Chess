import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Clickable from "../components/Clickable";
import colorPalatte from "../../config/colorPalatte";

function ThemeButton(props) {
  const themeID = props.themeID;
  const settings = props.settings;
  const styles = getStyles(settings, colorPalatte, themeID);
  const selectedText = "W";
  const unselectedText = "V";
  const buttonText = settings.theme === themeID ? selectedText : unselectedText;
  return (
    <Clickable onPress={() => props.onPress()}>
      <View style={styles.container}>
        <View style={styles.outerButton}>
          <View style={styles.innerButton}>
            <Text style={styles.themeText}>{props.themeName}</Text>
          </View>
        </View>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </View>
    </Clickable>
  );
}

function getStyles(settings, colorPalatte, themeID) {
  const colors = colorPalatte[settings.theme];
  const themeColors = colorPalatte[themeID];
  return StyleSheet.create({
    container: {
      alignItems: "center",
    },
    outerButton: {
      borderWidth: 6,
      borderColor: themeColors.grey1,
      borderRadius: 10,
    },
    innerButton: {
      backgroundColor: themeColors.white,
      borderWidth: 6,
      borderColor: themeColors.secondary,
      alignItems: "center",
      width: 100,
      borderRadius: 0,
    },
    themeText: {
      fontFamily: "ELM",
      fontSize: 20,
      color: themeColors.black,
    },
    buttonText: {
      fontFamily: "ElegantIcons",
      fontSize: 30,
      color: colors.black,
      marginTop: 8,
    },
  });
}

export default ThemeButton;
