import React from "react";
import { View, Text } from "react-native";
import { diff } from "react-native-reanimated";
import SegmentedControlTab from "react-native-segmented-control-tab";

function VsComputerOptions(props) {
  const styles = props.style;
  const diffDetails = props.diffDetails;
  return (
    <>
      <Text style={styles.subHeader}>Computer difficulty</Text>
      <SegmentedControlTab
        tabsContainerStyle={styles.tabsContainerStyle}
        tabStyle={styles.tabStyle}
        tabTextStyle={styles.tabTextStyle}
        activeTabStyle={styles.activeTabStyle}
        activeTabTextStyle={styles.activeTabTextStyle}
        values={diffDetails.values}
        selectedIndex={diffDetails.selectedIndex}
        onTabPress={diffDetails.onTabPress}
      />
    </>
  );
}

export default VsComputerOptions;
