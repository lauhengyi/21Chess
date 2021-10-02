import React from "react";
import RulesText from "./RulesText";

function Var10Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        It's like regular chess, except when a piece captures an enemy piece,
        the capturing piece will become the piece it captured permanently.
      </RulesText>
      <RulesText settings={settings}>
        For example, if a white knight captures a black rook, the white knight
        will become a white rook instead. Pretty simple right?
      </RulesText>
    </>
  );
}

export default Var10Rules;
