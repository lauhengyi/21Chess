import React from "react";
import { View, Text, StyleSheet, Switch, ScrollView } from "react-native";
import Clickable from "./components/Clickable";
import colorPalatte from "../config/colorPalatte";
import SegmentedControlTab from "react-native-segmented-control-tab";
import useOptions from "./functions/useOptions";
import VsComputerOptions from "./OptionsScreen_Components/VsComputerOptions";
import VsPlayerOptions from "./OptionsScreen_Components/vsPlayerOptions";
import TimeSelect from "./OptionsScreen_Components/TimeSelect";
import AdditionalTimeControls from "./OptionsScreen_Components/AdditionalTimeControls";
import varData from "./VarLoadScreen_Components/varData";

function OptionsScreen({ route, navigation }) {
  const {
    loaded,
    modeDetails,
    diffDetails,
    isAutoturnDetails,
    isFlippedDetails,
    startingSideDetails,
    isChessClockDetails,
    isAdditionalDetails,
    timeDetails,
  } = useOptions(route.params.varNum);

  //Get title, header, and caption of var
  const { title, header, caption } = varData[route.params.varNum];

  //Create options object
  const mode = modeDetails.selectedIndex;
  const diff = diffDetails.selectedIndex;
  const isAutoturn = mode ? isAutoturnDetails.value : false;
  const isFlipped = isAutoturn || !mode ? false : isFlippedDetails.value;
  const startingSide = startingSideDetails.selectedIndex === 0 ? true : false;
  const isChessClock = mode ? isChessClockDetails.value : false;
  const options = {
    mode,
    diff,
    isAutoturn,
    isFlipped,
    startingSide,
    timeDetails: {
      isChessClock,
      p1Time: timeDetails.p1Time,
      p2Time: timeDetails.p2Time,
      p1Increment: timeDetails.p1Increment,
      p2Increment: timeDetails.p2Increment,
      p1Delay: timeDetails.p1Delay,
      p2Delay: timeDetails.p2Delay,
    },
  };

  const settings = route.params.settings;
  const [styles, colors] = getStyles(settings, colorPalatte);
  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.introContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.header}>{header}</Text>
          <Text style={styles.caption}>{caption}</Text>
        </View>
        {loaded ? (
          <>
            <View style={styles.optionsContainer}>
              <Text style={styles.subHeader}>Gamemode</Text>
              <SegmentedControlTab
                tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle}
                tabTextStyle={styles.tabTextStyle}
                activeTabStyle={styles.activeTabStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
                values={modeDetails.values}
                selectedIndex={modeDetails.selectedIndex}
                onTabPress={(index) => modeDetails.onTabPress(index)}
              />
              {mode === 0 ? (
                <VsComputerOptions style={styles} diffDetails={diffDetails} />
              ) : (
                <VsPlayerOptions
                  style={styles}
                  colors={colors}
                  isAutoturnDetails={isAutoturnDetails}
                  isFlippedDetails={isFlippedDetails}
                />
              )}

              <Text style={styles.subHeader}>Starting side</Text>
              <SegmentedControlTab
                tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle}
                tabTextStyle={styles.tabTextStyle}
                activeTabStyle={styles.activeTabStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
                values={startingSideDetails.values}
                selectedIndex={startingSideDetails.selectedIndex}
                onTabPress={(index) => startingSideDetails.onTabPress(index)}
              />
              {mode === 1 ? (
                <>
                  <View style={styles.toggleOptionsContainer}>
                    <Text style={styles.subHeader}>Chess clock</Text>
                    <Switch
                      trackColor={{ false: colors.grey1, true: colors.black }}
                      thumbColor={colors.grey2}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={isChessClockDetails.onValueChange}
                      value={isChessClockDetails.value}
                    />
                  </View>
                  {isChessClock ? (
                    <>
                      <Text style={styles.subHeader}>Time controls:</Text>
                      <TimeSelect
                        timeDetails={timeDetails}
                        settings={settings}
                      />
                      <View style={styles.toggleOptionsContainer}>
                        <Text style={styles.subHeader}>
                          Additional time controls
                        </Text>
                        <Switch
                          trackColor={{
                            false: colors.grey1,
                            true: colors.black,
                          }}
                          thumbColor={colors.grey2}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={isAdditionalDetails.onValueChange}
                          value={isAdditionalDetails.value}
                        />
                      </View>
                      {isAdditionalDetails.value ? (
                        <AdditionalTimeControls
                          textStyle={styles.subHeader}
                          timeDetails={timeDetails}
                          settings={settings}
                        />
                      ) : null}
                    </>
                  ) : null}
                </>
              ) : null}
            </View>
            <View style={styles.beginContainer}>
              <Clickable
                onPress={() =>
                  navigation.navigate(String(route.params.varNum), {
                    options: options,
                    settings: settings,
                    saved: null,
                  })
                }
              >
                <Text style={styles.begin}>Begin</Text>
              </Clickable>
            </View>
          </>
        ) : (
          <Text style={styles.loading}>Loading</Text>
        )}
      </ScrollView>
    </View>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.white,
      flex: 1,
    },

    scrollContainer: {
      alignItems: "center",
      backgroundColor: colors.white,
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

    activeTabTextStyle: {
      color: colors.white,
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

    loading: {
      fontFamily: "ELM",
      fontSize: 30,
      color: colors.black,
    },
  });
  return [styles, colors];
}

export default OptionsScreen;
