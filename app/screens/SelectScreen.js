import React, { useState } from "react";
import colors from "../config/colors";
import VarContainer from "./VarLoadScreen_Components/VarContainer";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

// Different variation data
const LENTO_VAR = [
  {
    id: 0,
    title: "Var. 0",
    header: "Vanilla Chess",
    caption: "As normal as it gets!",
  },

  {
    id: 1,
    title: "Var. 1",
    header: "Confused Chess",
    caption: "Don't get tricked!",
  },

  {
    id: 2,
    title: "Var. 2",
    header: "Unordered Chess",
    caption: "Wait, who's turn is it?",
  },

  {
    id: 3,
    title: "Var. 3",
    header: "Scrambled Chess",
    caption: "Mix it up!",
  },

  {
    id: 4,
    title: "Var. 4",
    header: "Sacrifice Chess",
    caption: "For the greater good.",
  },
];

const ANDANTE_VAR = [
  {
    id: 5,
    title: "Var. 5",
    header: "Broken Tiles Chess",
    caption: "Watch your step!",
  },

  {
    id: 6,
    title: "Var. 6",
    header: "Archer Chess",
    caption: "Nock, Draw, LOOSE!",
  },

  {
    id: 7,
    title: "Var. 7",
    header: "Mirror Chess",
    caption: "From different worlds but all the same.",
  },

  {
    id: 8,
    title: "Var. 8",
    header: "Checker Chess",
    caption: "Jump your way to checkmate!",
  },

  {
    id: 9,
    title: "Var. 9",
    header: "King-in-Power Chess",
    caption: "God Save the Queen!",
  },
];

const ALLEGRO_VAR = [
  {
    id: 10,
    title: "Var. 10",
    header: "Devourer Chess",
    caption: "You are what you eat.",
  },

  {
    id: 11,
    title: "Var. 11",
    header: "Elder Chess",
    caption: "Respect you elders.",
  },

  {
    id: 12,
    title: "Var. 12",
    header: "Propaganda Chess",
    caption: "Assimilate or Die.",
  },

  {
    id: 13,
    title: "Var. 13",
    header: "Ethical Chess",
    caption: "Pieces have feelings too",
  },

  {
    id: 14,
    title: "Var. 14",
    header: "Stacked Chess",
    caption: "Mix and match!",
  },

  {
    id: 15,
    title: "Var. 15",
    header: "Golden Chess",
    caption: "Money is everything.",
  },
];

const PRESTO_VAR = [
  {
    id: 16,
    title: "Var. 16",
    header: "RPG Chess",
    caption: "Level Up!",
  },

  {
    id: 17,
    title: "Var. 17",
    header: "Gladiator Chess",
    caption: "May the last man standing win!",
  },

  {
    id: 18,
    title: "Var. 18",
    header: "Kill Zone Chess",
    caption: "Please evacuate the area immediately.",
  },

  {
    id: 19,
    title: "Var. 19",
    header: "Portal Chess",
    caption: "Close the gap between space and time.",
  },

  {
    id: 20,
    title: "Var. 20",
    header: "Chess",
    caption: "???????????",
  },

  {
    id: 21,
    title: "Var. 21",
    header: "Chess Drums",
    caption: "Ba Dum Tss!",
  },
];

const Lento = () => (
  <ScrollView contentContainerStyle={styles.variationSelectContainer}>
    {LENTO_VAR.map((variation) => (
      <VarContainer
        key={variation.id}
        var={variation.id}
        title={variation.title}
        header={variation.header}
        caption={variation.caption}
      />
    ))}
  </ScrollView>
);

const Andante = () => (
  <ScrollView contentContainerStyle={styles.variationSelectContainer}>
    {ANDANTE_VAR.map((variation) => (
      <VarContainer
        key={variation.id}
        var={variation.id}
        title={variation.title}
        header={variation.header}
        caption={variation.caption}
      />
    ))}
  </ScrollView>
);

const Allegro = () => (
  <ScrollView contentContainerStyle={styles.variationSelectContainer}>
    {ALLEGRO_VAR.map((variation) => (
      <VarContainer
        key={variation.id}
        var={variation.id}
        title={variation.title}
        header={variation.header}
        caption={variation.caption}
      />
    ))}
  </ScrollView>
);

const Presto = () => (
  <ScrollView contentContainerStyle={styles.variationSelectContainer}>
    {PRESTO_VAR.map((variation) => (
      <VarContainer
        key={variation.id}
        var={variation.id}
        title={variation.title}
        header={variation.header}
        caption={variation.caption}
      />
    ))}
  </ScrollView>
);

const renderTabBar = (props) => (
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

function SelectScreen({ navigation, route }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "lento", title: "Lento" },
    { key: "andante", title: "Andante" },
    { key: "allegro", title: "Allegro" },
    { key: "presto", title: "Presto" },
  ]);

  const renderScene = SceneMap({
    lento: Lento,
    andante: Andante,
    allegro: Allegro,
    presto: Presto,
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
        renderTabBar={renderTabBar}
      />
    </>
  );
}

const styles = StyleSheet.create({
  variationSelectContainer: {
    alignItems: "center",
  },

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
    fontSize: 19,
    color: colors.black,
  },

  indicator: {
    backgroundColor: colors.black,
  },
});

export default SelectScreen;
