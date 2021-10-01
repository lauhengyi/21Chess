import React from "react";
import RulesText from "./RulesText";

function Var8Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        Who says that chess and checkers can't mix?
      </RulesText>
      <RulesText settings={settings}>
        Checker Chess is like regular chess, but every time a capturing move is
        made, another move can be made by the player of the same side, but the
        pieces that moved in that turn can no longer be moved.
      </RulesText>
      <RulesText settings={settings}>
        This means that if a player uses a pawn to capture an enemy pawn, the
        player can make another move, provided that the piece moved is not the
        same pawn that did the capture. If the next move is another capture,
        like a knight capturing an enemy bishop, then the player can make yet
        another move, provided that the piece moved is neither that pawn nor
        that bishop that did the capture.
      </RulesText>
      <RulesText settings={settings}>
        In simplier terms, a player can keep making moves back-to-back as long
        as each move is a capturing move. The turns will switch once the player
        makes a non capturing move.
      </RulesText>
      <RulesText settings={settings}>
        In this variation of chess, it is possible to checkmate the opponent by
        capturing their queen.
      </RulesText>
    </>
  );
}

export default Var8Rules;
