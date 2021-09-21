import React from "react";
import RulesText from "./RulesText";

function Var2Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        Its regular chess, but the pieces of the board can be placed anywhere in
        the first three rows of your side of the board.
      </RulesText>
      <RulesText settings={settings}>
        The number of pieces will remain exactly the same, with 8 pawns, 2
        rooks, 2 knights, 2 bishops, 1 queen and 1 king.
      </RulesText>
      <RulesText settings={settings}>
        Each player will make their own custom piece configuration, and will not
        be allowed to see their opponent's piece configuration until both have
        completed their own.
      </RulesText>
      <RulesText settings={settings}>
        To prevent an accidental illegal board, there is a rule that must be
        followed when choosing the position of the pieces.
      </RulesText>
      <RulesText settings={settings}>
        When the king is placed on the board, the square on its immediate front,
        left diagonal and right diagonal must be filled by another piece. These
        spots will be highlighted.
      </RulesText>
      <RulesText settings={settings}>
        Also, take note that castling functionailty will only still exist if
        both the king and the rook is in the exact position it would have been
        in a normal chess board.
      </RulesText>
    </>
  );
}

export default Var2Rules;
