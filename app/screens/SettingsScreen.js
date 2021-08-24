import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import colors from "../config/colors";

function SettingsScreen({ navigation, route }) {
  const settings = route.params.settings;
  const setters = route.params.setters;
  console.log({ settings, setters });
  const toggleDarkMode = () => setters.setDarkMode((p) => !p);
  return (
    <View style={styles.background}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Settings</Text>
      </View>
      <View style={styles.settings}>
        <Switch
          trackColor={{ false: colors.grey1, true: colors.black }}
          thumbColor={colors.grey2}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={settings.isDarkMode}
        />
      </View>
    </View>
  );
}

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
  },
});

export default SettingsScreen;
