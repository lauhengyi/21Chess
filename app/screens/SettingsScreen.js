import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import ThemeButton from "./SettingsScreen_Components/ThemeButton";
import colorPalatte from "../config/colorPalatte";
import SettingsContext from "./functions/SettingsContext";

function SettingsScreen({ navigation, route }) {
  const { settings, setters } = useContext(SettingsContext);

  console.log({ settings, setters });
  const themes = [
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
      name: "Arctic",
    },
  ];
  const [styles, colors] = getStyles(settings, colorPalatte);

  return (
    <View style={styles.background}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Settings</Text>
      </View>
      <View style={styles.settings}>
        <Text>{settings.theme}</Text>
        <Text>{settings.masterVolume}</Text>
        <Text>{settings.musicVolume}</Text>
        <Text>{settings.sfxVolume}</Text>
      </View>
      <View style={styles.themes}>
        <Text style={styles.subHeader}>Themes</Text>
        <View style={styles.themeButtonContainer}>
          {themes.map((theme) => (
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

    subHeader: {
      fontFamily: "ELM",
      fontSize: 30,
      color: colors.black,
    },

    themeButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  });
  return [styles, colors];
}

export default SettingsScreen;
