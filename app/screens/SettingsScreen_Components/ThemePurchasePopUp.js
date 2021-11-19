import React from "react";
import { View, Text, Image, Modal, StyleSheet } from "react-native";
import colorPalatte from "../../config/colorPalatte";
import Clickable from "../components/Clickable";
import themePreviewSources from "./themePreviewSources";

function ThemePurchasePopUp(props) {
  const { isVisible, setVisible, themeName, themeID, settings } = props;
  const styles = getStyles(settings, colorPalatte);
  const exitText = "M";
  return (
    <Modal visible={isVisible} transparent={true} animationType={"fade"}>
      <View style={styles.background}>
        <View style={styles.creditsContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Purchase {themeName}</Text>
            <View style={styles.exitContainer}>
              <Clickable onPress={() => setVisible(false)}>
                <Text style={styles.exitButton}>{exitText}</Text>
              </Clickable>
            </View>
          </View>
          <Image
            style={styles.themePreview}
            source={themePreviewSources[themeID]}
          />
          <Text style={styles.purchaseButtonText}></Text>
        </View>
      </View>
    </Modal>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    creditsContainer: {
      alignSelf: "center",
      backgroundColor: colors.tertiary,
      width: "80%",
      borderColor: colors.grey1,
      borderWidth: 1,
      alignItems: "center",
      padding: 10,
      borderRadius: 10,
    },

    headerContainer: {
      margin: 5,
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
    },

    header: {
      margin: 3,
      marginBottom: 10,
      fontFamily: "FogtwoNo5",
      fontSize: 30,
      color: colors.black,
    },

    exitContainer: {
      position: "absolute",
      right: 7,
      alignSelf: "baseline",
      alignItems: "flex-end",
      alignSelf: "baseline",
    },

    exitButton: {
      fontFamily: "ElegantIcons",
      fontSize: 35,
      color: colors.black,
    },

    themePreview: {
      height: 456,
      width: 216,
      borderColor: colors.grey1,
      borderWidth: 1,
      borderRadius: 10,
    },

    purchaseButtonText: {
      fontFamily: "ELM",
      fontSize: 35,
      color: colors.black,
    },
  });
}

export default ThemePurchasePopUp;
