import React from "react";
import RulesText from "./RulesText";

function Var16Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        Its like normal chess, but you get to level up!
      </RulesText>
      <RulesText settings={settings}>
        Every piece starts at level 0, but everytime the piece captures, the
        piece levels up. At level 3, the piece can then gain a perk, either
        permanently or temporarily depending on the perk.
      </RulesText>
      <RulesText settings={settings}>
        These perks can be chosen by the player when it's piece reaches level 3
      </RulesText>
      <RulesText settings={settings}>These perks are:</RulesText>
      <RulesText settings={settings}>
        Speedster - Permanently be able to move twice each turn, provided the
        second move is not a capture. (Available to every piece)
      </RulesText>
      <RulesText settings={settings}>
        Assassin - Permanently be able to move twice each turn, provided the
        second move is a capture and the first move isn't. Each turn by the
        assassin can only capture a maximum of one piece. (Available to every
        piece)
      </RulesText>
      <RulesText settings={settings}>
        Phaser - Permanently be able to move through pieces, like a knight.
        (Available to Rooks, Bishops, and Queens)
      </RulesText>
      <RulesText settings={settings}>
        Decapitator(One-time) - On it's next move, it will be able to move
        through, and capture any of the opponent’s pieces in its line of motion.
        This perk will be removed after a capture move is made. (Available to
        Rooks, Bishops and Queens)
      </RulesText>
      <RulesText settings={settings}>
        Cloner(One-time) - On it's next move, it will cause a copy of the piece
        to be where the original piece would have been, thus having two of the
        same pieces. This perk will be removed afterwards. (Available to Pawns,
        Rooks, Bishops, Knights and Queens);
      </RulesText>
      <RulesText settings={settings}>
        For permanent perks, the pieces will reach level max, and will not be
        able to gain other perks.
      </RulesText>
      <RulesText settings={settings}>
        For one-time perks, after the special move has been executed, the piece
        will revert back to level 0 and the piece can gain more perks after
        reaching level 3 again.
      </RulesText>
    </>
  );
}

export default Var16Rules;
