import React from "react";
import RulesText from "./RulesText";

function Var10Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        It's like regular chess, except when a piece captures an enemy piece,
        the capturing piece will become the piece it captured permanently. This
        applies to all pieces except for the king.
      </RulesText>
      <RulesText settings={settings}>
        For example, if a white knight captures a black rook, the white knight
        will become a white rook instead. Pretty simple right?
      </RulesText>
      <RulesText settings={settings}>
        On the other hand, if a black king eats a white bishop, the black king
        will still stay a black king. (obviously)
      </RulesText>
    </>
  );
}

export default Var10Rules;
