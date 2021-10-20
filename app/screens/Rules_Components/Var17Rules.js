import React from "react";
import RulesText from "./RulesText";

function Var17Rules(props) {
  const settings = props.settings;
  return (
    <>
      <RulesText settings={settings}>
        Its like playing minesweeper, except... in chess.
      </RulesText>
      <RulesText settings={settings}>
        When you start a game, the board is a minefield with 5 mines, and only
        the squares where the pieces are on at that moment are cleared and have
        no mines.
      </RulesText>
      <RulesText settings={settings}>
        The squares adajacent to the cleared squares will have a number
        indicating how many of the 8 adajacent squares have mines under them.
      </RulesText>
      <RulesText settings={settings}>
        Landing on a square will clear the square, regardless of whether that
        square has a mine or not, revealing the numbers for the adajacent
        squares. However, if a piece does land on a square with a mine, the
        piece will be forfeited, but the square will now no longer have a mine.
      </RulesText>
      <RulesText settings={settings}>
        After every ten moves, the minefield on the board will reset with 5
        mines at random positions on the board, leaving only the squares where
        the pieces are on at the moment cleared, just like at the start of the
        game.
      </RulesText>
      <RulesText settings={settings}>
        You checkmate when you checkmate, or if your opponent's king moves onto
        a square with a mine.
      </RulesText>
      <RulesText settings={settings}>
        TL;DR: Its like playing minesweeper, but instead of clicking your pieces
        to clear a square, you use your pieces instead.
      </RulesText>
    </>
  );
}

export default Var17Rules;
