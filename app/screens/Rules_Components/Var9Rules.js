import React from "react";
import RulesText from "./RulesText";

function Var9Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        Imagine if the king wasn't that weak and the queen wasn't that strong...
      </RulesText>
      <RulesText settings={settings}>
        That is basically what Patriarchal Chess is. A variation of chess where
        the king has the queen's movements, while the queen has the king's
        movements. This makes the king practically impossible to checkmate.
      </RulesText>
      <RulesText settings={settings}>
        The twist is, after the queen is captured, the king will revert back to
        it's regular movements, only being able to move one square at a time.
      </RulesText>
      <RulesText settings={settings}>
        After the queen is captured, the king can still regain it's initial
        movements if a pawn is promoted to a queen.
      </RulesText>
      <RulesText settings={settings}>
        In other words, as long as there is a queen on the board that is on the
        same side as the king, the king will be able to move like a queen in
        regular chess.
      </RulesText>
    </>
  );
}

export default Var9Rules;
