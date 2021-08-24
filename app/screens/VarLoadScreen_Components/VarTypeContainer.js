import render from "dom-serializer";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import VarContainer from "./VarContainer";

function VarTypeContainer(props) {
  const varData = props.varData;
  const settings = props.settings;
  return (
    <ScrollView contentContainerStyle={styles.variationSelectContainer}>
      {varData.map((variation) => (
        <VarContainer
          key={variation.id}
          var={variation.id}
          title={variation.title}
          header={variation.header}
          caption={variation.caption}
          settings={settings}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  variationSelectContainer: {
    alignItems: "center",
  },
});

export default VarTypeContainer;
