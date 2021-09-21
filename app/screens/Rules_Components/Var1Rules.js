import React from "react";
import RulesText from "./RulesText";

function Var1Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        Its like regular chess with regular chess rules, except that the symbols
        that show the pieces are scrambled within each side.
      </RulesText>
      <RulesText settings={settings}>
        This means that any piece can look like any other piece on the board.
        For example, a white rook could actually be a white pawn, or a black
        king could actually be a black bishop.
      </RulesText>
      <RulesText settings={settings}>
        However, each symbol can only represent one type of piece. For example,
        if a white rook is represented by a white queen, a white bishop cannot
        also be represented by a white queen.
      </RulesText>
      <RulesText settings={settings}>
        Also, the symbols of the pieces are only scrambled on each side and not
        on both sides, so a white knight cannot be represented by a black queen,
        and a black king cannot be represented by a white pawn.
      </RulesText>
      <RulesText settings={settings}>
        Finally, how each piece is scrambled on each side is independent of each
        other, meaning if a black pawn is represented by a black bishop, a white
        pawn may not necessarily by represented by a white bishop
      </RulesText>
    </>
  );
}

export default Var1Rules;
