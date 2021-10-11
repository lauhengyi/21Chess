import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

function PerkIcon(props) {
  const size = props.size;
  const color = props.color;
  switch (props.type) {
    case "s": {
      return (
        <MaterialCommunityIcons
          name="run-fast"
          size={size}
          color={color.black}
        />
      );
    }
    case "a": {
      return (
        <MaterialCommunityIcons name="knife" size={size} color={color.black} />
      );
    }
    case "p": {
      return (
        <MaterialCommunityIcons name="ghost" size={size} color={color.black} />
      );
    }
    case "d": {
      <MaterialCommunityIcons
        name="emoticon-devil"
        size={size}
        color={color.black}
      />;
    }
    case "c": {
      <AntDesign name="addusergroup" size={size} color={color.black} />;
    }
  }
}

export default PerkIcon;
