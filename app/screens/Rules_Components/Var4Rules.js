import React from "react";
import RulesText from "./RulesText";

function Var4Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        Its like regular chess, except each piece can either capture or move,
        not both.
      </RulesText>
      <RulesText settings={settings}>
        This means that when a piece captures another piece, it does not also
        move to the square that once occupied the piece it captured. Instead, it
        would remain stationary when capturing.
      </RulesText>
      <RulesText settings={settings}>
        The only way a piece move is if it is not capturing.
      </RulesText>
    </>
  );
}

export default Var4Rules;
