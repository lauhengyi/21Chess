import React from "react";
import RulesText from "./RulesText";

function Var19Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        Its like regular chess but with health bars!
      </RulesText>
      <RulesText settings={settings}>
        Every piece has 3 health, and only after taking 3 damage will a piece
        die.
      </RulesText>
      <RulesText settings={settings}>
        If a piece attacks from the front of a piece, 1 damage is dealt and if a
        piece attacks from the back of a piece, 2 damage is dealt.
      </RulesText>
      <RulesText settings={settings}>
        When the piece attacks, it also it will remain in its position and only
        replace the attacked piece position if a killing blow is dealt.
      </RulesText>
      <RulesText settings={settings}>
        If a piece is adjacent to a bishop, it will heal 1 health per turn.
      </RulesText>
      <RulesText settings={settings}>
        The king does not have a health bar and can be checked and checkmated
        regularly.
      </RulesText>
    </>
  );
}

export default Var19Rules;
