import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
  ScrollView,
} from "react-native";
import colors from "../config/colors";
import SegmentedControlTab from "react-native-segmented-control-tab";
import VsComputerOptions from "./OptionsScreen_Components/VsComputerOptions";
import VsPlayerOptions from "./OptionsScreen_Components/vsPlayerOptions";
import TimeSelect from "./OptionsScreen_Components/TimeSelect";
import AdditionalTimeControls from "./OptionsScreen_Components/AdditionalTimeControls";

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
  const [isAdditional, setAdditional] = useState(false);
  const toggleAdditional = () =>
    setAdditional((previousState) => !previousState);
  const [p1Time, setP1Time] = useState("1000");
  const [p2Time, setP2Time] = useState("1000");
  const [p1Increment, setP1Increment] = useState("0");
  const [p2Increment, setP2Increment] = useState("0");
  const [p1Delay, setP1Delay] = useState("0");
  const [p2Delay, setP2Delay] = useState("0");

  const timeDetails = {
    isTimeLock: isTimeLock,
    toggleTimeLock: toggleTimeLock,
    p1Time: p1Time,
    setP1Time: setP1Time,
    p2Time: p2Time,
    setP2Time: setP2Time,
    p1Increment: p1Increment,
    setP1Increment: setP1Increment,
    p2Increment: p2Increment,
    setP2Increment: setP2Increment,
    p1Delay: p1Delay,
    setP1Delay: setP1Delay,
    p2Delay: p2Delay,
    setP2Delay: setP2Delay,
  };
  //Create options object
  const options = {
    mode: mode,
    diff: diff,
    isAutoturn: mode ? isAutoturn : false,
    isFlipped: isAutoturn || !mode ? false : isFlipped,
    startingSide: side === 0 ? true : false,
    timeDetails: {
      isChessClock: isChessClock,
      p1Time: p1Time,
      p2Time: p2Time,
      p1Increment: p1Increment,
      p2Increment: p2Increment,
      p1Delay: p1Delay,
      p2Delay: p2Delay,
    },
  };
  return (
    <ScrollView contentContainerStyle={styles.background}>
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
        {mode === 1 ? (
          <>
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
            {isChessClock ? (
              <>
                <Text style={styles.subHeader}>Time controls:</Text>
                <TimeSelect timeDetails={timeDetails} />
                <View style={styles.toggleOptionsContainer}>
                  <Text style={styles.subHeader}>Additional time controls</Text>
                  <Switch
                    trackColor={{ false: colors.grey1, true: colors.black }}
                    thumbColor={colors.grey2}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleAdditional}
                    value={isAdditional}
                  />
                </View>
                {isAdditional ? (
                  <AdditionalTimeControls
                    textStyle={styles.subHeader}
                    timeDetails={timeDetails}
                  />
                ) : null}
              </>
            ) : null}
          </>
        ) : null}
      </View>
      <View style={styles.beginContainer}>
        <Pressable
          onPress={() =>
            navigation.navigate(String(route.params.var), {
              options: options,
            })
          }
        >
          <Text style={styles.begin}>Begin</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
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
    height: "100%",
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
    marginTop: 10,
    width: "100%",
    flex: 1,
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
