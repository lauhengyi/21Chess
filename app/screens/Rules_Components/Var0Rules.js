import React from "react";
import RulesText from "./RulesText";

function Var0Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        Its just normal chess... I don't know what else to say.
      </RulesText>
      <RulesText settings={settings}>
        You can probably find better resources on how to play normal chess, but
        here's brief overview on the basics of chess:
      </RulesText>
      <RulesText settings={settings}>
        Pawns can move one square forward, capture on square diagonally, and can
        be promoted to any other piece when it reaches the end of the board.
      </RulesText>
      <RulesText settings={settings}>
        Knights can travel one square in one axis and two squares in another.
      </RulesText>
      <RulesText settings={settings}>
        Bishops can travel diagonally infinitely.
      </RulesText>
      <RulesText settings={settings}>
        Rooks can travel vertically and horizontally infinitely.
      </RulesText>
      <RulesText settings={settings}>
        Queens can travel vertically, horizontally and diagonally infinitely.
      </RulesText>
      <RulesText settings={settings}>
        Kings can travel on square vertically, horizontally and diagonally.
        Protect him to keep playing.
      </RulesText>
      <RulesText settings={settings}>
        Figure out castling and en passant yourself.
      </RulesText>
    </>
  );
}

export default Var0Rules;
