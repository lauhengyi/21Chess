import React, { useContext } from "react";
import colorPalatte from "../config/colorPalatte";
import { View, StyleSheet, Text } from "react-native";
import SettingsContext from "./functions/SettingsContext";
import Clickable from "./components/Clickable";
import SavedContext from "./functions/SavedContext";
import loadSaved from "./functions/loadSaved";
import MakeItRain from "react-native-make-it-rain";
import PieceConfetti from "./components/WelcomeScreen_Components/PieceConfetti";
import onRandomPress from "./functions/onRandomPress";

function WelcomeScreen({ navigation, route }) {
  const { settings } = useContext(SettingsContext);
  const { saved } = useContext(SavedContext);

  const styles = getStyles(settings, colorPalatte);
  return (
    <>
      <View style={styles.background}>
        {
          <MakeItRain
            numItems={20}
            itemDimensions={{ width: 90, height: 90 }}
            itemComponent={<PieceConfetti settings={settings} />}
            itemTintStrength={0.0}
            fallSpeed={30}
            flipSpeed={1}
            horizSpeed={5}
            flavor={"arrive"}
          />
        }
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title1}>21</Text>
            <Text style={styles.title2}>CHESS</Text>
          </View>
          <Text style={styles.caption}>Chess variations</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Clickable onPress={() => navigation.navigate("Select")}>
            <Text style={styles.button}>Play</Text>
          </Clickable>
          {saved ? (
            <Clickable onPress={() => loadSaved(navigation, saved, settings)}>
              <Text style={styles.button}>Continue</Text>
            </Clickable>
          ) : (
            <Text style={styles.disabledButton}>Continue</Text>
          )}
          <Clickable onPress={() => onRandomPress(navigation, settings)}>
            <Text style={styles.button}>Random</Text>
          </Clickable>
          <Clickable onPress={() => navigation.navigate("Settings")}>
            <Text style={styles.button}>Settings</Text>
          </Clickable>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Lau Heng Yi</Text>
        </View>
      </View>
    </>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.white,
    },

    headerContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: "25%",
    },

    titleContainer: {
      flexDirection: "row",
    },

    title1: {
      fontFamily: "FogtwoNo5",
      fontSize: 110,
      color: colors.grey3,
    },

    title2: {
      fontFamily: "FogtwoNo5",
      fontSize: 110,
      color: colors.black,
    },

    caption: {
      fontFamily: "FogtwoNo5",
      fontSize: 30,
      color: colors.black,
    },

    buttonsContainer: {
      marginTop: "20%",
      alignItems: "center",
    },

    button: {
      fontFamily: "FogtwoNo5",
      fontSize: 65,
      marginBottom: "5%",
      color: colors.black,
    },

    disabledButton: {
      fontFamily: "FogtwoNo5",
      fontSize: 65,
      marginBottom: "5%",
      color: colors.grey1,
    },

    nameContainer: {
      flex: 1,
      justifyContent: "flex-end",
    },

    name: {
      fontFamily: "ELM",
      fontSize: 15,
      margin: 5,
      color: colors.black,
    },
  });
}

export default WelcomeScreen;
