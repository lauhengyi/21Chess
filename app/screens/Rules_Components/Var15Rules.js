import React from "react";
import RulesText from "./RulesText";

function Var15Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        Money rules, at least in this variation it does.
      </RulesText>
      <RulesText settings={settings}>
        In this variation, you start off with much less pieces, 1 king, 1
        knight, 1 bishop, 1 rook and 6 pawns only. However, the number of pieces
        on the board can quickly increase after each turn.
      </RulesText>
      <RulesText settings={settings}>
        Essentially, each player starts off with $50, and after each turn, they
        will gain a certain revenue based on the pieces on the board. A pawn,
        knight, bishop, rook and queen makes $1/T, $3/T, $3/T, $5/T, $10/T
        respectively. The king does not make any money.
      </RulesText>
      <RulesText settings={settings}>
        Before making a move when its the player's turn, the player can buy
        pieces and place them on the 8 squares adjacent to the king, provided
        they have enough money to do so.
      </RulesText>
      <RulesText settings={settings}>
        Other than that, the standard rules of chess still applies.
      </RulesText>
    </>
  );
}

export default Var15Rules;
