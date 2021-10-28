import React from "react";
import RulesText from "./RulesText";

function Var21Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        So that's it huh, the last variation.
      </RulesText>
      <RulesText settings={settings}>
        Its simple really, every now and then, a pair of portals will appear and
        it works exactly as how you would expect portals to work.
      </RulesText>
      <RulesText settings={settings}>
        Each portal has 2 sides, denoted with different colors. The side that a
        piece enters one portal from, will be the same side that the piece will
        leave the portal from.
      </RulesText>
      <RulesText settings={settings}>
        Other than at the beginning of the game, there will always be a pair of
        portals on the board, that means that as one pair of portals leave the
        board, a different pair of portals will appear.
      </RulesText>
      <RulesText settings={settings}>
        The next pair of portals that will appear after the current pair
        dissapears will be indicated on the board (in a faint color). There is
        also an indicator that shows the number of turns before the current
        portals dissapear.
      </RulesText>
      <RulesText settings={settings}>Hope you enjoy my game!</RulesText>
    </>
  );
}

export default Var21Rules;
