import React from "react";
import RulesText from "./RulesText";

function Var5Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        You know that classic platformer troupe? The platform which crumbles and
        disappears after being jumped off of?
      </RulesText>
      <RulesText settings={settings}>
        Basically, every square in the chess board acts like that.
      </RulesText>
      <RulesText settings={settings}>
        Every time a piece moves, the square in which it moved from will
        disappear and will act like an obstacle. The square will then return
        back after 2 turns.
      </RulesText>
      <RulesText settings={settings}>
        When the square is gone, that square can no longer be moved to, nor can
        it be moved across, with the exception of the knight which can still
        jump across the blank square.
      </RulesText>
    </>
  );
}

export default Var5Rules;
