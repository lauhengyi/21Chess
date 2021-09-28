import React from "react";
import RulesText from "./RulesText";

function Var6Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        You play 2 games of chess, one in the Overworld, and one in the
        Underworld. Where the sides each player will played in the Overworld
        will be swapped in the Underworld, allowing both players to play as both
        white and black.
      </RulesText>
      <RulesText settings={settings}>
        However, every piece in the Overworld is linked by a piece in the
        Underworld. This is denoted by a number next to the piece. Pieces with
        the same number in the Overworld and Underworld will be linked.
      </RulesText>
      <RulesText settings={settings}>
        Linked pieces can move independently of each other, but if one is
        captured in either of the games, the piece linked to it will also be
        captured. Linked pawns will also both be promoted to the same piece if
        either pawns are promoted.
      </RulesText>
      <RulesText settings={settings}>
        For example, if a black pawn labeled 4 is linked to a white pawn labeled
        4, and that black pawn is captured, then that white pawn labeled 4 will
        also be captured. If that black pawn is promoted to a black queen, the
        linked white pawn will similarly be promoted to a white queen.
      </RulesText>
      <RulesText settings={settings}>
        The first player that checkmates in either games wins.
      </RulesText>
    </>
  );
}

export default Var6Rules;
