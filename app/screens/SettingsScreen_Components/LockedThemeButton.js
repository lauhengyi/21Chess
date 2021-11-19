import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Clickable from "../components/Clickable";
import colorPalatte from "../../config/colorPalatte";
import ThemePurchasePopUp from "./ThemePurchasePopUp";

function LockedThemeButton(props) {
  const themeID = props.themeID;
  const settings = props.settings;
  const [isPopUp, setPopUp] = useState(false);
  const styles = getStyles(settings, colorPalatte, themeID);
  const lockedText = "~";
  console.log({ isPopUp });
  return (
    <>
      <ThemePurchasePopUp
        themeID={themeID}
        themeName={props.themeName}
        settings={settings}
        isVisible={isPopUp}
        setVisible={setPopUp}
      />
      <Clickable onPress={() => setPopUp(true)}>
        <View style={styles.container}>
          <View style={styles.outerButton}>
            <View style={styles.innerButton}>
              <Text style={styles.themeText}>{props.themeName}</Text>
            </View>
          </View>
          <Text style={styles.buttonText}>{lockedText}</Text>
        </View>
      </Clickable>
    </>
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

export default LockedThemeButton;
