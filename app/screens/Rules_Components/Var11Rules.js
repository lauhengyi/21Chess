import React from "react";
import RulesText from "./RulesText";

function Var11Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        Every piece other than the king has an age that starts with 0 years.
        This age is indicated by a number next to the piece.
      </RulesText>
      <RulesText settings={settings}>
        Every time a piece moves on the board, that piece ages by 1 year.
      </RulesText>
      <RulesText settings={settings}>
        Once a piece has an age that is 5 years older than another piece, the
        younger piece will no longer be able to capture the older piece, while
        the older piece can still capture the younger piece.
      </RulesText>
      <RulesText>
        After a pawn promotes, the age of the new piece after promotion will not
        be reset and will continue from the age the pawn was before it was
        promoted.
      </RulesText>
    </>
  );
}

export default Var11Rules;
