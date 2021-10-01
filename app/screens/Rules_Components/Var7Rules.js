import React from "react";
import RulesText from "./RulesText";

function Var7Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        Its like regular chess but instead of each side taking turns, making one
        move each, there is a 50% chance that the sides will change after each
        move is made.
      </RulesText>
      <RulesText settings={settings}>
        This means that it is possible for a player to make 2, 3 or even 4 moves
        simultaneously.
      </RulesText>
      <RulesText settings={settings}>
        There is a indicator that shows 10 turns in advance how the sides will
        change. This is so that players can preempt what moves the opponent will
        make in the future.
      </RulesText>
      <RulesText settings={settings}>
        Lastly, it is also possible, in this variation, to checkmate the
        opponent by capturing their king.
      </RulesText>
    </>
  );
}

export default Var7Rules;
