import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, Pressable } from "react-native";
import colors from "../config/colors";
import SegmentedControlTab from "react-native-segmented-control-tab";
import VsComputerOptions from "./components/VsComputerOptions";
import VsPlayerOptions from "./components/vsPlayerOptions";
import TimeSelect from "./components/TimeSelect";

function OptionsScreen({ route, navigation }) {
  //Create states for the options
  //Gamemodes
  const modeTypes = ["vs Computer", "vs Player (local)"];
  const [mode, setMode] = useState(0);

  //Computer ai difficulty
  const comDiff = ["easy", "medium", "hard", "vs Heng Yi"];
  const [diff, setDiff] = useState(0);
  const diffDetails = {
    values: comDiff,
    selectedIndex: diff,
    onTabPress: setDiff,
  };

  //Autoturn
  const [isAutoturn, setAutoturn] = useState(true);
  const toggleAutoturn = () => setAutoturn((previousState) => !previousState);
  const autoturnDetails = {
    value: isAutoturn,
    onValueChange: toggleAutoturn,
  };

  const [isFlipped, setFlipped] = useState(true);
  const toggleFlipped = () => setFlipped((previousState) => !previousState);
  const flippedDetails = {
    value: isFlipped,
    onValueChange: toggleFlipped,
  };

  //Starting side
  const startingSide = ["white", "black"];
  const [side, setSide] = useState(0);

  //Timer
  const [isChessClock, setChessClock] = useState(false);
  const toggleChessClock = () =>
    setChessClock((previousState) => !previousState);

  const [isTimeLock, setTimeLock] = useState(true);
  const toggleTimeLock = () => setTimeLock((previousState) => !previousState);
  const [p1Time, setP1Time] = useState("1000");
  const [p2Time, setP2Time] = useState("1000");
  const timeDetails = {
    isTimeLock: isTimeLock,
    toggleTimeLock: toggleTimeLock,
    p1: p1Time,
    p2: p2Time,
    setP1: setP1Time,
    setP2: setP2Time,
  };
  //Create options object
  const options = {
    mode: mode,
    diff: diff,
    isAutoturn: isAutoturn,
    isFlipped: isFlipped,
    startingSide: side === 0 ? true : false,
    isChessClock: isChessClock,
    p1Time: p1Time,
    p2Time: p2Time,
  };

  return (
    <View style={styles.background}>
      <View style={styles.introContainer}>
        <Text style={styles.title}>{route.params.title}</Text>
        <Text style={styles.header}>{route.params.header}</Text>
        <Text style={styles.caption}>{route.params.caption}</Text>
      </View>
      <View style={styles.optionsContainer}>
        <Text style={styles.subHeader}>Gamemode</Text>
        <SegmentedControlTab
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
          values={modeTypes}
          selectedIndex={mode}
          onTabPress={(index) => setMode(index)}
        />
        {mode === 0 ? (
          <VsComputerOptions style={styles} diffDetails={diffDetails} />
        ) : (
          <VsPlayerOptions
            style={styles}
            autoturnDetails={autoturnDetails}
            flippedDetails={flippedDetails}
          />
        )}

        <Text style={styles.subHeader}>Starting side</Text>
        <SegmentedControlTab
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
          values={startingSide}
          selectedIndex={side}
          onTabPress={(index) => setSide(index)}
        />
        <View style={styles.toggleOptionsContainer}>
          <Text style={styles.subHeader}>Chess clock</Text>
          <Switch
            trackColor={{ false: colors.grey1, true: colors.black }}
            thumbColor={colors.grey2}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleChessClock}
            value={isChessClock}
          />
        </View>
        <TimeSelect timeDetails={timeDetails} />
        <View style={styles.beginContainer}>
          <Pressable
            onPress={() =>
              navigation.navigate(String(route.params.var), {
                options: { options },
              })
            }
          >
            <Text style={styles.begin}>Begin</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    flex: 1,
    color: colors.white,
  },
  introContainer: {
    marginTop: 80,
    alignItems: "center",
  },

  title: {
    fontFamily: "FogtwoNo5",
    fontSize: 70,
    color: colors.black,
  },

  header: {
    fontFamily: "ELM",
    fontSize: 25,
    color: colors.black,
  },

  caption: {
    fontFamily: "ELM",
    fontSize: 15,
    color: colors.grey3,
  },

  subHeader: {
    fontFamily: "ELM",
    fontSize: 20,
    color: colors.black,
  },

  subHeaderGreyed: {
    fontFamily: "ELM",
    fontSize: 20,
    color: colors.grey1,
  },

  optionsContainer: {
    width: "90%",
    marginTop: 10,
    flex: 1,
  },

  tabsContainerStyle: {
    paddingBottom: 15,
  },

  tabStyle: {
    borderColor: colors.black,
    backgroundColor: colors.white,
    shadowColor: colors.black,
  },

  tabTextStyle: {
    color: colors.black,
  },

  activeTabStyle: {
    backgroundColor: colors.black,
    shadowColor: colors.black,
  },

  toggleOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  beginContainer: {
    justifyContent: "flex-end",
    flex: 0.9,
  },

  begin: {
    alignSelf: "center",
    fontFamily: "FogtwoNo5",
    fontSize: 50,
    color: colors.black,
    textAlignVertical: "bottom",
  },
});
export default OptionsScreen;
