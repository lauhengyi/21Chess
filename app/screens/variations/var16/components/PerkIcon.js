import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

function PerkIcon(props) {
  const size = props.size;
  const color = props.color;
  switch (props.type) {
    case "s": {
      return (
        <MaterialCommunityIcons name="run-fast" size={size} color={color} />
      );
    }
    case "a": {
      return <MaterialCommunityIcons name="knife" size={size} color={color} />;
    }
    case "p": {
      return <MaterialCommunityIcons name="ghost" size={size} color={color} />;
    }
    case "d": {
      return (
        <MaterialCommunityIcons
          name="emoticon-devil"
          size={size}
          color={color}
        />
      );
    }
    case "c": {
      return <AntDesign name="addusergroup" size={size} color={color} />;
    }

    default: {
      return null;
    }
  }
}

export default PerkIcon;
