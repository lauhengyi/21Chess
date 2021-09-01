import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ThemeButton from "./SettingsScreen_Components/ThemeButton";
import colorPalatte from "../config/colorPalatte";
import SettingsContext from "./functions/SettingsContext";
import Clickable from "./components/Clickable";
import CreditsPopUp from "./SettingsScreen_Components/CreditsPopUp";

function SettingsScreen({ navigation, route }) {
  const { settings, setters } = useContext(SettingsContext);

  const themesRow1 = [
    {
      id: 0,
      name: "Default",
    },
    {
      id: 1,
      name: "Dark",
    },
    {
      id: 2,
      name: "Classic",
    },
  ];

  const themesRow2 = [
    {
      id: 3,
      name: "Arctic",
    },
    {
      id: 4,
      name: "Material",
    },
    {
      id: 5,
      name: "Neon",
    },
  ];
  const [isCredits, setCredits] = useState(false);
  const [styles, colors] = getStyles(settings, colorPalatte);

  return (
    <View style={styles.background}>
      <CreditsPopUp
        isVisible={isCredits}
        setVisible={setCredits}
        settings={settings}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Settings</Text>
      </View>
      <View style={styles.settingsContainer}>
        <View style={styles.settings}>
          <Text>{settings.theme}</Text>
          <Text>{settings.masterVolume}</Text>
          <Text>{settings.musicVolume}</Text>
          <Text>{settings.sfxVolume}</Text>
        </View>
        <Clickable onPress={() => setCredits(true)}>
          <View style={styles.creditsButton}>
            <Text style={styles.creditsText}>Credits</Text>
          </View>
        </Clickable>
        <View style={styles.themes}>
          <Text style={styles.subHeader}>Themes</Text>
          <View style={styles.themeButtonContainer}>
            {themesRow1.map((theme) => (
              <ThemeButton
                key={theme.id}
                themeID={theme.id}
                themeName={theme.name}
                onPress={() => setters.setTheme(theme.id)}
                settings={settings}
              />
            ))}
          </View>
          <View style={styles.themeButtonContainer}>
            {themesRow2.map((theme) => (
              <ThemeButton
                key={theme.id}
                themeID={theme.id}
                themeName={theme.name}
                onPress={() => setters.setTheme(theme.id)}
                settings={settings}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.white,
    },

    headerContainer: {
      alignItems: "center",
      marginTop: 70,
    },

    header: {
      fontFamily: "FogtwoNo5",
      fontSize: 70,
      color: colors.black,
    },

    settingsContainer: {
      marginHorizontal: 20,
    },

    creditsButton: {
      width: "100%",
      height: 40,
      backgroundColor: colors.tertiary,
      borderWidth: 1,
      borderColor: colors.grey2,
      alignItems: "center",
      justifyContent: "center",
    },

    creditsText: {
      fontFamily: "ELM",
      fontSize: 23,
      color: colors.black,
    },

    subHeader: {
      fontFamily: "ELM",
      fontSize: 30,
      color: colors.black,
    },

    themeButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 8,
    },
  });
  return [styles, colors];
}

export default SettingsScreen;
