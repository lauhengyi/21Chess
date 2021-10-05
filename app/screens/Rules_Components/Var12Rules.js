import React from "react";
import RulesText from "./RulesText";

function Var12Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        When you are surrounded by people for similar ideologies, you tend to
        become more like them yourself.
      </RulesText>
      <RulesText settings={settings}>
        This variation of chess is just like regular chess but when 3 of the 8
        adjacent squares of a piece is occupied by enemy pieces, that chess
        piece will change sides to become part of the enemy pieces.
      </RulesText>
      <RulesText settings={settings}>
        Also, this can potentially lead to a chain effect, where multiple pieces
        can change sides in one move. This is because one piece changing sides
        could lead to other pieces that the changed piece is surrounding to also
        change sides as there are now more pieces of the same side surrounding
        the other pieces.
      </RulesText>
      <RulesText settings={settings}>
        In the event that a piece is surrounded by more than 2 pieces from both
        sides, then deciding factor on whether a piece would switch sides or not
        would depend on the number of pieces on each side that is surrounding
        that piece.
      </RulesText>
      <RulesText settings={settings}>
        If a piece is surrounded by equal or more allied pieces as it is
        surrounded by enemy pieces, then the piece will not change. Only if a
        piece is surrounded by more enemy pieces than allied pieces will a piece
        change.
      </RulesText>
    </>
  );
}

export default Var12Rules;
