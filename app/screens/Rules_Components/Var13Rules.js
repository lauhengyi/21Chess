import React from "react";
import RulesText from "./RulesText";

function Var13Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        If a troup's own king doesn't even fight in a war he started, then the
        troup's morale is bound to drop.
      </RulesText>
      <RulesText settings={settings}>
        In this variation of chess, if a allied piece is captured in the 8
        adjacent squares next to another allied piece, then that piece would
        have lost 'morale', and be unable to move for the next move. The only
        way to prevent this, is if the king is on the same row or above as the
        troups.
      </RulesText>
      <RulesText settings={settings}>
        In other words, a piece will only lose morale and be immobalised for the
        next turn in the event that the king is behind that piece and it just
        'witnessed' its allies captured next to it.
      </RulesText>
      <RulesText settings={settings}>
        Lastly, and obviously, the king is immune to this effect.
      </RulesText>
    </>
  );
}

export default Var13Rules;
