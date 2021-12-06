import React, { useContext, useState } from "react";
import colorPalatte from "../config/colorPalatte";
import VarTypeContainer from "./VarLoadScreen_Components/VarTypeContainer";
import { View, StyleSheet, Text, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import SettingsContext from "./functions/SettingsContext";

const LENTO_VAR = [0, 1, 2, 3, 4];
const ANDANTE_VAR = [5, 6, 7, 8, 9];
const ALLEGRO_VAR = [10, 11, 12, 13, 14, 15];
const PRESTO_VAR = [16, 17, 18, 19, 20, 21];
const Lento = (settings) => (
  <VarTypeContainer varList={LENTO_VAR} settings={settings} />
);

const Andante = (settings) => (
  <VarTypeContainer varList={ANDANTE_VAR} settings={settings} />
);

const Allegro = (settings) => (
  <VarTypeContainer varList={ALLEGRO_VAR} settings={settings} />
);

const Presto = (settings) => (
  <VarTypeContainer varList={PRESTO_VAR} settings={settings} />
);

const renderTabBar = (styles, colors) => {
  return (props) => (
    <TabBar
      {...props}
      getLabelText={({ route }) => route.title}
      activeColor={colors.black}
      inactiveColor={colors.grey1}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      contentContainerStyle={styles.tabItem}
    />
  );
};

function SelectScreen({ navigation, route }) {
  const layout = useWindowDimensions();
  const { settings } = useContext(SettingsContext);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "lento", title: "Lento" },
    { key: "andante", title: "Andante" },
    { key: "allegro", title: "Allegro" },
    { key: "presto", title: "Presto" },
  ]);

  const [styles, colors] = getStyles(settings, colorPalatte);

  const renderScene = SceneMap({
    lento: () => Lento(settings),
    andante: () => Andante(settings),
    allegro: () => Allegro(settings),
    presto: () => Presto(settings),
  });

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Select Variation</Text>
      </View>

      <View style={styles.line} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar(styles, colors)}
      />
    </>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  const styles = StyleSheet.create({
    headerContainer: {
      backgroundColor: colors.white,
      height: "10%",
      alignItems: "center",
      justifyContent: "flex-end",
    },

    header: {
      fontFamily: "FogtwoNo5",
      fontSize: 40,
      color: colors.black,
      marginTop: 15,
    },

    line: {
      height: 2,
      backgroundColor: colors.black,
    },

    tab: {
      fontFamily: "FogtwoNo5",
      backgroundColor: colors.white,
    },

    tabBar: {
      backgroundColor: colors.primary,
    },

    tabLabel: {
      fontFamily: "FogtwoNo5",
      fontSize: 18,
      color: colors.black,
      textTransform: "none",
    },

    indicator: {
      backgroundColor: colors.black,
    },
  });
  return [styles, colors];
}

export default SelectScreen;
